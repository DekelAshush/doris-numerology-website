import React, { useContext, useMemo, useState } from 'react';
import './WhatsAppContactForm.css';
import { LanguageContext } from '../../LanguageContext/LanguageContext.jsx';

function WhatsAppContactForm() {
  const { lang } = useContext(LanguageContext);


  const t = useMemo(() => ({
    en: {
      heading: 'Contact via WhatsApp',
      firstName: 'First name',
      lastName: 'Last name',
      phone: 'Phone number',
      service: 'Desired service',
      servicePlaceholder: 'e.g. Numerology reading, Coaching, Consultancy',
      submit: 'Send on WhatsApp',
      required: 'This field is required',
      invalidPhone: 'Enter a valid phone number',
    },
    he: {
      heading: 'צור קשר בווטסאפ',
      firstName: 'שם פרטי',
      lastName: 'שם משפחה',
      phone: 'מספר טלפון',
      service: 'איזה שירות תרצו',
      servicePlaceholder: 'לדוגמה: נומרולוגיה, אימון, ייעוץ',
      submit: 'שליחה בווטסאפ',
      required: 'שדה חובה',
      invalidPhone: 'הזן מספר טלפון תקין',
    },
  }), []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = t[lang].required;
    if (!lastName.trim()) newErrors.lastName = t[lang].required;
    if (!phone.trim()) newErrors.phone = t[lang].required;
    else if (!/^\+?\d[\d\s-]{6,}$/.test(phone.trim())) newErrors.phone = t[lang].invalidPhone;
    if (!service.trim()) newErrors.service = t[lang].required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = `Hello, my name is ${firstName} ${lastName}.\nPhone: ${phone}.\nI'm interested in: ${service}.`;
    const hebText = `שלום, שמי ${firstName} ${lastName}.\nטלפון: ${phone}.\nמעוניין/ת ב: ${service}.`;
    const message = encodeURIComponent(lang === 'he' ? hebText : text);
    
    // Always send to backend: it will send to business WhatsApp number
    try {
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          service,
          lang,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error('Failed sending WhatsApp message');
      }
      alert(lang === 'he' ? 'ההודעה נשלחה' : 'Message sent');
      setFirstName('');
      setLastName('');
      setPhone('');
      setService('');
      setErrors({});
    } catch (err) {
      console.error('Backend send error:', err);
      alert(lang === 'he' ? 'שגיאה בשליחת הודעה' : 'Error sending message');
    }
  };

  return (
    <form className="wa-form" onSubmit={onSubmit} noValidate>
      <h2 className="wa-form__title">{t[lang].heading}</h2>

      <div className="wa-form__row">
        <label className="wa-form__label" htmlFor="wa-first-name">{t[lang].firstName}</label>
        <input
          id="wa-first-name"
          className={`wa-form__input${errors.firstName ? ' has-error' : ''}`}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName ? <span className="wa-form__error">{errors.firstName}</span> : null}
      </div>

      <div className="wa-form__row">
        <label className="wa-form__label" htmlFor="wa-last-name">{t[lang].lastName}</label>
        <input
          id="wa-last-name"
          className={`wa-form__input${errors.lastName ? ' has-error' : ''}`}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName ? <span className="wa-form__error">{errors.lastName}</span> : null}
      </div>

      <div className="wa-form__row">
        <label className="wa-form__label" htmlFor="wa-phone">{t[lang].phone}</label>
        <input
          id="wa-phone"
          className={`wa-form__input${errors.phone ? ' has-error' : ''}`}
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {errors.phone ? <span className="wa-form__error">{errors.phone}</span> : null}
      </div>

      <div className="wa-form__row">
        <label className="wa-form__label" htmlFor="wa-service">{t[lang].service}</label>
        <input
          id="wa-service"
          className={`wa-form__input${errors.service ? ' has-error' : ''}`}
          type="text"
          placeholder={t[lang].servicePlaceholder}
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        {errors.service ? <span className="wa-form__error">{errors.service}</span> : null}
      </div>

      <div className="wa-form__actions">
        <button type="submit" className="wa-form__submit">{t[lang].submit}</button>
      </div>
    </form>
  );
}

export default WhatsAppContactForm;