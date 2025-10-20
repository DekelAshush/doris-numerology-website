import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

    const toggleLang = () => {
        const newLang = lang === "en" ? "he" : "en";
        setLang(newLang);
        localStorage.setItem("lang", newLang);
        document.dir = newLang === "he" ? "rtl" : "ltr";
    };

    useEffect(() => {
        // Keep the document direction in sync (used by browser rendering).
        document.dir = lang === "he" ? "rtl" : "ltr";

        // Set the HTML `lang` attribute so assistive tech / search engines know the language.
        // e.g. <html lang="he"> or <html lang="en">.
        document.documentElement.lang = lang;

        // Apply a global class on the root element so styles can target language direction
        // without each component checking `lang` manually. This enables site-wide CSS
        // like `.lang-he .navbar { ... }` using logical properties.
        document.documentElement.classList.remove("lang-he", "lang-en");
        document.documentElement.classList.add(lang === "he" ? "lang-he" : "lang-en");

        // NOTE: This centralizes DOM-side effects for language. Components can read `lang`
        // from context for text but rely on the global html class for layout/styling.
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
};
