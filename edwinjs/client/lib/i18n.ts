import i18n from "i18next";
import {
  initReactI18next,
  useTranslation as defaultUseTranslation,
} from "react-i18next";

const defaultTranslation = {
  "400": "Mauvaise requête",
  "401": "Vous n'êtes pas autorisé",
  "403": "Vous n'êtes pas connecté",
  "404": "L'élément est introuvable",
  "500": "Une erreur est survenue sur notre serveur",
  invalidUser: "Cet utilisateur n'existe pas",
  invalidPassword: "Mot de passe incorrect",
  formSuccess: "Formulaire validé",
  loading: "Chargement...",
  error: "Erreur",
};

i18n?.use(initReactI18next).init({
  resources: {
    default: {
      translation: defaultTranslation,
    },
  },
  lng: "default",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

export function useTranslation() {
  const { t } = defaultUseTranslation();
  return (key: string | number | undefined) => t(String(key));
}
