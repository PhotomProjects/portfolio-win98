const desktopArea = document.getElementById("window-frame"); // the coordinate system in which left/top should be expressed
const windowElements = document.querySelectorAll(".window");

windowElements.forEach((windowElement) => {
    makeWindowDraggable(windowElement, desktopArea);
});
/* this means:
    we iterate through all the .window elements
    each .window element becomes a windowElement in turn
    we pass this window to makeWindowDraggable
    we also pass desktopArea (#window-frame) to calculate the relative positions
*/

export function makeWindowDraggable(windowElement, desktopArea) {
    const dragHandle = windowElement.querySelector(".titlebar");
    if (!dragHandle) return;

    let activePointerId = null // identifier of the captured pointer (useful for setPointerCapture / releasePointerCapture)
    let grabOffsetX = 0;
    let grabOffsetY = 0; 
    // grabOffset = the distance between the pointer and the top-left corner of the window at the moment we grab it (otherwise the window "snap")

    dragHandle.addEventListener("pointerdown", onDragStart);

    function onDragStart(event) { // onDragStart(event) — start the drag (pointerdown)
        if (!event.isPrimary) return;
        // indicates the “primary” pointer (useful for ignoring secondary pointers in multi-touch), so if the event is not the primary pointer, we return to prevent the start of the drag

        if (event.pointerType === "mouse" && event.button !== 0) return;
        // if the event originates from a mouse (pointerType === "mouse") and if the pressed button is not the left button (button !== 0) then the event is ignored (return)

        const windowRect = windowElement.getBoundingClientRect();
        /* snapshot of the window (win-home, win-projects ect) in the viewport coordinate system
        this creates a rectangle with: left/top: position of the top-left corner in the viewport and width/height: displayed size
        getBoundingClientRect() speaks the same reference frame as event.clientX/clientY: the viewport
        */
        
        grabOffsetX = event.clientX - windowRect.left;
        grabOffsetY = event.clientY - windowRect.top;
        /* event.clientX/Y = coordinates of the pointer at the time of the event in the viewport
            clientX = distance (px) from the left edge of the viewport to the pointer
            clientY = distance (px) from the top edge of the viewport to the pointer
        windowRect = position of the window (not the title bar) in the viewport
        the subtraction gives an internal offset to the window
            clientX/Y - windowRect.left/top is used to determine where we captured the window, in pixels, relative to its top-left corner
            for example:
                the window has windowRect.left = 200 (it starts at x=200 in the viewport).
                we click at event.clientX = 260.
                then: grabOffsetX = 260 - 200 = 60
                we clicked 60px inside the window (from its left edge)
                same for Y
            what this allows:
                when we move the mouse, you will reposition the window to: "pointer position (in the desktop) minus the offset"
                so that the point you have selected remains under the pointer (no "snap" on the corner)
        grabOffsetX/Y = how many pixels from the top-left corner of the window the pointer is at the moment of pointerdown
        this offset is then used to prevent the cursor from snapping:
            without the offset: the corner of the window would snap to the cursor
            with the offset: the cursor remains on the same point in the window during dragging
        */
        
        activePointerId = event.pointerId; // pointerId is a unique identifier assigned by the browser to a “pointer” during an interaction
        dragHandle.setPointerCapture(activePointerId);
        /* setPointerCapture(event.pointerId) ensures that the drag continues even if the pointer leaves the .titlebar (or the window)
        the browser "routes" the next pointermove / pointerup to dragHandle until the release with: dragHandle.releasePointerCapture(event.pointerId);
        without a capture, if we move outside the .titlebar area, the risk are: no longer receiving pointermove (jerky/interrupted drag) and not receiving pointerup → "blocked" state
        */
        
        dragHandle.addEventListener("pointermove", onDragMove);
        dragHandle.addEventListener("pointerup", onDragEnd);
        dragHandle.addEventListener("pointercancel", onDragEnd);
        /*
        pointermove: moving the pointer
        pointerup: when released
        pointercancel: interaction canceled → perform the same cleanup as pointerup
        pointercancel is triggered when the browser cancels the pointer interaction, it is used in case we can't guarantee if the event will receive a pointerup
        -> typical cases:    
                system gestures: scrolling/zooming/panning are supported by the browser (often on mobile if touch actions are not properly configured).
                loss of focus/interruption: alt-tab, switching tabs, opening a system menu, etc.
        dragHandle.addEventListener("pointermove", onDragMove); tells the browser:
            "On every pointermove event on dragHandle (captured or not), call onDragMove."
            when the browser calls onDragMove, it automatically passes the event object as an argument.
        */
        
        event.preventDefault();
    }

    function onDragMove(event) { // onDragMove(event) — move during drag (pointermove)

        if (activePointerId === null) return;
        if (event.pointerId !== activePointerId) return;
        
        /* Conversion viewport -> offsetParent (container coordinates)

        why?
            event.clientX / clientY are coordinates in the VIEWPORT (browser visible area).
            windowElement.style.left/top must be expressed in the coordinate system of the window's offsetParent
        (the closest positioned ancestor: relative/absolute/fixed/sticky). In your layout it's usually #window-frame.
        how?
            desktopRect = desktopArea.getBoundingClientRect() gives the container position in the VIEWPORT.
        desktopRect.left/top = where the container starts on screen (viewport coordinates).
            pointerXInDesktop = clientX - desktopRect.left converts the pointer position from VIEWPORT to CONTAINER coordinates.
        Same for Y.
        then:
            newLeft/newTop = pointerInContainer - grabOffset keeps the exact grabbed point under the pointer (no snapping).
        */
        
        const desktopRect = desktopArea.getBoundingClientRect();

        const pointerXInDesktop = event.clientX - desktopRect.left;
        const pointerYInDesktop = event.clientY - desktopRect.top;

        const newLeft = pointerXInDesktop - grabOffsetX;
        const newTop = pointerYInDesktop - grabOffsetY;

        windowElement.style.left = `${newLeft}px`;
        windowElement.style.top = `${newTop}px`;
        /* ${} is a JavaScript template string (interpolated string)
        it allows to insert the value of a variable/expression into a string
        newLeft and newTop are calculated numbers (target position, in pixels, within the `offsetParent` coordinate system) - float numbers
        element.style.left and element.style.top expect a CSS value in the form of a string, with a unit:
            "120px", "2rem", "50%", etc.
        so we need to transform: 120 → "120px"
        ${newLeft}px creates a string like "248px" (required for CSS properties like style.left/top)
        */
    }

    function onDragEnd(event) { // onDragEnd(event) — terminer proprement (pointerup / pointercancel)
        if (event.pointerId !== activePointerId) return;
            
        dragHandle.removeEventListener("pointermove", onDragMove);
        dragHandle.removeEventListener("pointerup", onDragEnd);
        dragHandle.removeEventListener("pointercancel", onDragEnd);
        // removing the listeners added on the function onDragStart

        if (activePointerId !== null && dragHandle.hasPointerCapture(activePointerId)) {
            dragHandle.releasePointerCapture(activePointerId);
        }
        // release the capture (if still active)

        activePointerId = null;
        // reset state
    }
}