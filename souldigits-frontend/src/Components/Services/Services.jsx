import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext/LanguageContext.jsx';
import './Services.css';

function Services() {
  const { lang } = useContext(LanguageContext);

  const t = {
    en: {
      title: 'Our Services',
      subtitle: 'Discover Your Path Through Numerology',
      description: 'I believe that every person is born with unique potential and a purpose in life. Numerology is a powerful tool that can help us understand our personal map, where our strengths lie, what our challenges are, and how we can live more fulfilling and meaningful lives.',
      servicesTitle: 'What I Offer',
      services: [
        {
          title: 'Personal Numerology Consultation',
          description: 'In-depth analysis of your personal numbers and revealing the potential, challenges, and opportunities in your life.'
        },
        {
          title: 'Important Life Decisions',
          description: 'Guidance in making important decisions about location, relationships, and career paths.'
        }
      ]
    },
    he: {
      title: 'שירותים',
      subtitle: 'גלו את הדרך שלכם דרך הנומרולוגיה',
      description: 'אני מאמינה שכל אדם נולד עם פוטנציאל ייחודי ומטרה בחיים. הנומרולוגיה היא כלי רב עוצמה שיכול לעזור לנו להבין את המפה האישית שלנו, איפה הכוחות שלנו, מהם האתגרים שלנו, ואיך אנחנו יכולים לחיות חיים מספקים ומשמעותיים יותר.',
      servicesTitle: 'מה אני מציעה',
      services: [
        {
          title: 'יעוץ נומרולוגי אישי',
          description: 'ניתוח מעמיק של המספרים האישיים שלך וחשיפת הפוטנציאל, האתגרים וההזדמנויות בחייך.'
        },
        {
          title: 'ליווי בקבלת החלטות חשובות',
          description: 'ליווי בקבלת החלטות חשובות במיקום, בזיווג, ובעיסוק.'
        }
      ]
    },
  };

  return (
    <div className="services-container">
      <div className="services-hero">
        <h1 className="services-title">{t[lang].title}</h1>
        <h2 className="services-subtitle">{t[lang].subtitle}</h2>
      </div>

      <div className="services-content">
        <div className="services-description">
          <p>{t[lang].description}</p>
        </div>

        <div className="services-list-section">
          <h3 className="services-list-title">{t[lang].servicesTitle}</h3>
          <div className="services-grid">
            {t[lang].services.map((service, index) => (
              <div key={index} className="service-card">
                <h4 className="service-card-title">{service.title}</h4>
                <p className="service-card-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;