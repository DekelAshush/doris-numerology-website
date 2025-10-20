import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../LanguageContext/LanguageContext.jsx';
import './About.css';

function About() {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const t = {
    en: {
      title: 'About Doris',
      subtitle: 'Your Guide to the Mystical World of Numbers',
      introduction: 'Welcome to my world of numerology, where ancient wisdom meets modern insight to illuminate your life\'s path.',
      story: {
        title: 'My Journey',
        content: 'For over 15 years, I have dedicated my life to studying the profound connections between numbers and human destiny. My journey began when I discovered how the numbers in my own birth date revealed patterns that explained my life experiences and guided me toward my true calling.'
      },
      approach: {
        title: 'My Approach',
        content: 'Each reading is a sacred journey of discovery. I combine traditional numerological methods with intuitive insights to provide you with practical guidance that you can apply to your daily life. My goal is to empower you with knowledge and clarity.'
      },
      credentials: {
        title: 'My Credentials',
        content: 'I am a certified numerologist with extensive training in both Western and Eastern numerological traditions. I have helped thousands of individuals discover their life path numbers, understand their personal year cycles, and make informed decisions about their future.'
      },
    },
    he: {
      title: 'שלום לכולם',
      subtitle: 'המדריכה שלכם לעולם הנומרולוגיה',
      introduction: 'שלום, אני דוריס צדוק נומרולוגית מקצועית, עם רקע ייחודי בחינוך ובהתפתחות אישית. במשך למעלה מעל 40 שנה אני מלווה אנשים במסע של גילוי עצמי והבנת הפוטנציאל הטמון בהם.',
      story: {
        title: 'המסע המקצועי שלי',
        content:
          '35 שנות מנהיגות חינוכית.\n' +
          'במשך 35 שנים עבדתי כגננת ומנהלת, והקדשתי את חיי המקצועיים להבאת ילדים למימוש מלא של הפוטנציאל הטמון בהם.\n' +
          'בתפקיד זה למדתי להכיר את הייחודיות של כל ילד ולמצוא את הדרך המתאימה לפתח את כישוריו וכישרונותיו. \n \n'
           +'הבחירה בחינוך המיוחד: \n' +
           '5 שנים נוספות עבדתי כגננת שילוב בחינוך המיוחד. שם פיתחתי הבנה עמוקה של הדרכים המיוחדים של כל אדם ודרכי הגישה הייחודיות הנדרשת לכל אחד.'
      },
      approach: {
        title: 'הכשרה בתכנות עצבי לשוני - NLP ',
        content: 'השלמתי הכשרה מקצועית פרקטישינר ומאסטר במכללת תוצאות תל אביב. שמספקת לי כלים מתקדמים להבנת דוסי תקשורת חשובה, ויכולת לליווי אנשים בתהליכי שינויו והתפתחות אנושית.'
      },
      credentials: {
        title: 'הכשרה ומקצועיות בנומרולוגיה',
        content:
          'השלמתי קורס מתחילים ומתקדמים בנומרולוגיה במכללת פרסונה בהרצליה.\n' +
          'שם רכשתי את הבסיס התאורטי והמעשי לעבודה מדוקדקת ואמינה בתחום הנומרולוגיה.\n\n' +
          'הגישה הייחודית שלי לנומרולוגיה:\n' +
          'השילוב הייחודי של הרקע החינוכי, ההכשרה ב-NLP, והניסיון האישי שלי יוצר גישה מיוחדת לנומרולוגיה.\n' +
          'ההבנה העמוקה שלי בהתפתחות אישית והניסיון הרב בחינוך מאפשרים לי להבין את תהליכי הצמיחה והפיתוח האישי של כל אדם.\n' +
          'אני מביאה עמי רגישות לצרכים מיוחדים ויכולת להתאים את הגישה לכל אדם בהתאם לאישיותו ולצרכיו.\n\n' +
          'השילוב של הידע המקצועי עם החמלה והאמפתיה שפיתחתי במהלך שנות העבודה עם ילדים ומשפחות, מאפשר לי להציע ליווי אישי עדין ומעצים.'
       }
    },
  };

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">{t[lang].title}</h1>
        <h2 className="about-subtitle">{t[lang].subtitle}</h2>
        <p className="about-introduction">{t[lang].introduction}</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h3 className="section-title">{t[lang].story.title}</h3>
          <p className="section-content" style={{ whiteSpace: 'pre-line' }}>
            {t[lang].story.content}
          </p>
        </div>

        <div className="about-section">
          <h3 className="section-title">{t[lang].approach.title}</h3>
          <p className="section-content">{t[lang].approach.content}</p>
        </div>

        <div className="about-section">
          <h3 className="section-title">{t[lang].credentials.title}</h3>
          <p className="section-content" style={{ whiteSpace: 'pre-line' }}>
            {t[lang].credentials.content}
            </p>
        </div>

      </div>

      <div className="about-cta">
        <h3>{lang === 'en' ? 'Ready to Discover Your Numbers?' : 'מוכנים לגלות את המספרים שלכם?'}</h3>
        <p>{lang === 'en' ? 'Let\'s begin your journey of self-discovery and spiritual growth.' : 'בואו נתחיל את מסע הגילוי העצמי והצמיחה הרוחנית שלכם.'}</p>
        <button className="btn-primary" onClick={() => navigate('/contact')}>{lang === 'en' ? 'Book a Reading' : 'הזמינו קריאה'}</button>
      </div>
    </div>
  );
}

export default About;