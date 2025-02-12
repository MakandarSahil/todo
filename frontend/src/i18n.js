import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

// Initialize i18next only once
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(Backend)
    .init({
      debug: true,
      lng: "en",
      returnObjects: true,
      fallbackLng: "en", // Fallback language
    });
}

export default i18n;
