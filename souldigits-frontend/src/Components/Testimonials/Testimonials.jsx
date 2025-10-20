import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext/LanguageContext.jsx';
import './Testimonials.css';

function Testimonials() {
  const { lang } = useContext(LanguageContext);

  const t = {
    en: {
      title: 'Testimonials',
      body:
        'Hear what our clients have to say about working with us. Your success is our priority.',
    },
    he: {
      title: 'המלצות',
      body:
        'שמעו מה הלקוחות שלנו מספרים על העבודה איתנו. ההצלחה שלכם היא בראש סדר העדיפויות שלנו.',
    },
  };

  return (
    <div className="testimonials-container">
      <h1 className="testimonials-title">{t[lang].title}</h1>
      <p className="testimonials-body">{t[lang].body}</p>
    </div>
  );
}

export default Testimonials;