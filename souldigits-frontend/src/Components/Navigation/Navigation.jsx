import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../LanguageContext/LanguageContext.jsx";
import Logo from "../Logo/Logo.jsx";
import "./Navigation.css";

function Navbar() {
    const { lang, toggleLang } = useContext(LanguageContext);

    const t = {
        en: {
            home: "Home",
            about: "About",
            services: "Services",
            testimonials: "Testimonials",
            contact: "Contact",
            switch: "עברית",
        },
        he: {
            home: "בית",
            about: "אודות",
            services: "שירותים",
            testimonials: "המלצות",
            contact: "צור קשר",
            switch: "English",
        },
    };

    return (
        // Rely on global `.lang-he/.lang-en` applied to <html> for direction & alignment
        <nav className="navbar">
            <Logo />
            
            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                    {t[lang].home}
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                    {t[lang].about}
                </NavLink>
                <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
                    {t[lang].services}
                </NavLink>
                <NavLink to="/testimonials" className={({ isActive }) => (isActive ? "active" : "")}>
                    {t[lang].testimonials}
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                    {t[lang].contact}
                </NavLink>
            </div>

            <button onClick={toggleLang} className="lang-toggle" aria-label="Toggle language">
                {t[lang].switch}
            </button>
        </nav>
    );
}

export default Navbar;
