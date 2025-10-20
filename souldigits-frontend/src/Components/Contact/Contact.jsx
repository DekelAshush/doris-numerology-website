import React, { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext/LanguageContext.jsx';
import './Contact.css';

function Contact() {
  const { lang } = useContext(LanguageContext);

  const t = {
    en: {
      title: 'Contact Us',
      body:
        'Have questions or ready to get started? Use the WhatsApp form to reach out directly, or send us an email at info@example.com.',
    },
    he: {
      title: 'צור קשר',
      body:
        'יש שאלות או רוצים להתחיל? השתמשו בטופס הווטסאפ ליצירת קשר ישיר, או שלחו לנו מייל לכתובת info@example.com.',
    },
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">{t[lang].title}</h1>
      <p className="contact-body">{t[lang].body}</p>
    </div>
  );
}

export default Contact;