import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../LanguageContext/LanguageContext.jsx";
import DorisImage from "../../assets/Doris.JPG";
import "./Home.css";

function Home() {
    const { lang } = useContext(LanguageContext);
    const navigate = useNavigate();

    const t = {
        en: {
            title: "Welcome to the Mystical World of Numerology",
            subtitle: "Discover Your Life's Hidden Patterns",
            description: "I am Doris, a professional numerologist dedicated to helping you unlock the secrets of numbers and their profound influence on your life journey. Through ancient wisdom and modern insight, I guide you toward understanding your true purpose and potential.",
            services: "Explore My Services",
            about: "Learn About Me",
            cta: "Begin Your Journey"
        },
        he: {
            title: "ברוכים הבאים לעולם המיסטי של הנומרולוגיה",
            subtitle: "גלו את הדפוסים הנסתרים של חייכם",
            description: "אני דוריס, נומרולוגית מקצועית המוקדשת לעזור לכם לפתוח את סודות המספרים והשפעתם העמוקה על מסע החיים שלכם. דרך חוכמה עתיקה ותובנות מודרניות, אני מנחה אתכם להבנת הייעוד והפוטנציאל האמיתי שלכם.",
            services: "גלו את השירותים שלי",
            about: "למדו עליי",
            cta: "התחילו את המסע שלכם"
        },
    };

    return (
        <div className="home-container">
            <div className="home-hero">
                <div className="home-content">
                    <div className="home-text">
                        <h1 className="home-title">{t[lang].title}</h1>
                        <h2 className="home-subtitle">{t[lang].subtitle}</h2>
                        <p className="home-description">{t[lang].description}</p>
                        <div className="home-buttons">
                            <button className="btn-primary" onClick={() => navigate('/services')}>{t[lang].services}</button>
                            <button className="btn-secondary" onClick={() => navigate('/about')}>{t[lang].about}</button>
                        </div>
                    </div>
                    <div className="home-image">
                        <div className="image-container">
                            <img src={DorisImage} alt="Doris - Professional Numerologist" className="doris-image" />
                            <div className="image-glow"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="home-features">
                <div className="feature-card">
                    <div className="feature-icon">🔢</div>
                    <h3>{lang === 'en' ? 'Life Path Numbers' : 'מספרי נתיב החיים'}</h3>
                    <p>{lang === 'en' ? 'Discover your core life purpose and destiny through your birth date.' : 'גלו את ייעוד החיים והגורל שלכם דרך תאריך הלידה.'}</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">⭐</div>
                    <h3>{lang === 'en' ? 'Personal Readings' : 'קריאות אישיות'}</h3>
                    <p>{lang === 'en' ? 'Get personalized insights into your relationships, career, and life decisions.' : 'קבלו תובנות אישיות על מערכות יחסים, קריירה והחלטות חיים.'}</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🌟</div>
                    <h3>{lang === 'en' ? 'Spiritual Guidance' : 'הדרכה רוחנית'}</h3>
                    <p>{lang === 'en' ? 'Connect with your higher self and find clarity in life\'s challenges.' : 'התחברו לעצמי הגבוה שלכם ומצאו בהירות באתגרי החיים.'}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
