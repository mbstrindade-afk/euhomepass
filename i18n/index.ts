import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptCommon from './locales/pt/common.json';
import ptHome from './locales/pt/home.json';
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';

const resources = {
  pt: {
    common: ptCommon,
    home: ptHome,
  },
  en: {
    common: enCommon,
    home: enHome,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'pt',
      fallbackLng: 'pt',
      ns: ['common', 'home'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
