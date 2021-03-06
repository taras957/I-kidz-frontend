import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import languageUA from './locate/ua/translate.json';
import languageRUS from './locate/rus/translate.json';
import languageENG from './locate/eng/translate.json';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ua: languageUA,
      rus: languageRUS,
      eng: languageENG,
    },
    /* default language when load the website in browser */
    lng: 'ua',
    /* When react i18next not finding any language to as default in borwser */
    fallbackLng: 'rus',
    /* debugger For Development environment */
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
      useSuspense: false,
    },
  });

export default i18n;
