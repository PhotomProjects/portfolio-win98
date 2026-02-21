/* i18n */

/* Set language */

export function setLanguage() {
    /* Getting language (localStorage -> browser -> <html lang> -> "en" fallback) */
    let languageCode = localStorage.getItem("lang");
    if (!languageCode) languageCode = navigator.language;
    if (!languageCode) languageCode = document.documentElement.lang;
    if (!languageCode) languageCode = "en";

    /* Setting language "fr" / "en" / "ja" */
    languageCode = String(languageCode).toLowerCase();

    if (languageCode.startsWith("fr")) languageCode = "fr";
    else if (languageCode.startsWith("ja")) languageCode = "ja";
    else languageCode = "en";

    /* Applying language to HTML (useful for accessibility and getLocale) */
    document.documentElement.lang = languageCode;
    return languageCode;
}

/* Matching URL for resume */

export function resumeURL(languageCode) {
    const cvBase = "https://cv.authelinflorian.dev";
    const cvUrl =
        languageCode === "fr" ? `${cvBase}/lang/fr/` :
        languageCode === "ja" ? `${cvBase}/lang/jp/` :
        `${cvBase}/`;

    document.querySelectorAll("a.open-cv").forEach((link) => {
        link.href = cvUrl;
    });
}

/* Loading matching JSON file */

export function translationJSON(languageCode) {
    const translationFileUrl = `/i18n/${languageCode}.json`;

    fetch(translationFileUrl)
        .then((httpResponse) => {
            if (!httpResponse.ok) {
                throw new Error(`Missing translation file: ${translationFileUrl}`);
            }
            return httpResponse.json(); // transforme JSON into JS object
        })

        .then((translationDictionary) => {
            // translationDictionary =  translation object (key -> value)

            /* Translate all of elements that contains data-i18n */
            document.querySelectorAll("[data-i18n]").forEach((element) => {
                const translationKey = element.getAttribute("data-i18n");
                if (!translationKey) return;

                const translatedValue = translationDictionary[translationKey];
                if (translatedValue == null) return;

                const attributeName = element.getAttribute("data-i18n-attr");

                if (attributeName) {
                    element.setAttribute(attributeName, translatedValue);
                } else {
                    element.textContent = translatedValue;
                }
            });

            /* Title + meta description */
            if (translationDictionary["meta.title"]) {
                document.title = translationDictionary["meta.title"];
            };

            const metaDescriptionElement = document.querySelector('meta[name="description"]');
            if (metaDescriptionElement && translationDictionary["meta.description"]) {
                metaDescriptionElement.setAttribute("content", translationDictionary["meta.description"]);
            };
        })
        .catch((error) => console.warn(error));
}

/* Language buttons : save + reload */

export function languageBtn() {
    document.querySelectorAll("#win-language-switcher [data-lang]").forEach((languageButton) => {
        languageButton.addEventListener("click", () => {
            const nextLanguageCode = languageButton.getAttribute("data-lang");
            if (!nextLanguageCode) return;

            localStorage.setItem("lang", nextLanguageCode);
            location.reload();
        });
    });
}