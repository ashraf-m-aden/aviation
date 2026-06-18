import { createI18n } from "vue-i18n";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

/**
 * Langues prises en charge.
 * `dir` sert à basculer la page en RTL pour l'arabe.
 */
export const SUPPORTED_LOCALES = [
  { code: "fr", label: "Français", short: "FR", dir: "ltr" },
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "ar", label: "العربية", short: "عربي", dir: "rtl" },
];

const STORAGE_KEY = "aac_locale";

function detectInitialLocale() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LOCALES.some((l) => l.code === saved)) return saved;
  const browser = (navigator.language || "fr").slice(0, 2);
  if (SUPPORTED_LOCALES.some((l) => l.code === browser)) return browser;
  return "fr";
}

const i18n = createI18n({
  legacy: false, // API Composition…
  globalInjection: true, // …mais $t / $i18n restent dispo dans les templates Options API (migration progressive)
  locale: detectInitialLocale(),
  fallbackLocale: "fr",
  messages: { fr, en, ar },
});

/**
 * Applique la direction du document (html[dir]) en fonction de la langue.
 * À appeler au démarrage et à chaque changement de langue.
 */
export function applyDirection(locale = i18n.global.locale.value) {
  const def = SUPPORTED_LOCALES.find((l) => l.code === locale);
  const dir = def ? def.dir : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", locale);
}

/**
 * Change la langue de toute l'application.
 * - met à jour vue-i18n
 * - persiste le choix
 * - applique le RTL si besoin
 * - garde le store Vuex `lang` synchronisé (compatibilité avec l'ancien code
 *   qui lit encore getLang : "french" / "english" / "arabic")
 */
const LEGACY_NAMES = { fr: "french", en: "english", ar: "arabic" };

export function setLocale(locale, store = null) {
  if (!SUPPORTED_LOCALES.some((l) => l.code === locale)) return;
  i18n.global.locale.value = locale;
  localStorage.setItem(STORAGE_KEY, locale);
  applyDirection(locale);
  if (store) store.commit("SET_LANG", LEGACY_NAMES[locale]);
}

export default i18n;
