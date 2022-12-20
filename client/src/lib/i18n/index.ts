import i18n from "i18next";
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).use(HttpApi).init({
    supportedLngs: ['en', 'pl', 'ua'],
    fallbackLng: 'en',
    debug: false,
    interpolation: {
        escapeValue: false
    },
    backend: {
        loadPath: '/locales/{{lng}}/translation.json'
    }
});

export default i18n;