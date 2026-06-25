/**
 * router/componentRegistry.js
 *
 * Registre des pages que TU codes à la main (kind: "component").
 *
 * Pour ajouter une page custom :
 *   1. crée le composant, ex. src/views/custom/RapportAnnuel.vue
 *   2. enregistre-le ici sous une clé courte
 *   3. dans l'admin Navigation, cette clé devient sélectionnable ;
 *      l'URL (le slug) est gérée par la navigation, pas par le composant.
 *
 * Les imports sont en lazy-loading : la page n'est chargée que si on la visite.
 */
export const customComponents = {
  // RapportAnnuel: () => import("@/views/custom/RapportAnnuel.vue"),
  // Statistiques:  () => import("@/views/custom/Statistiques.vue"),
};

/** Renvoie le loader d'un composant custom, ou null si la clé est inconnue. */
export function getCustomComponent(key) {
  return customComponents[key] || null;
}

/** Liste des clés disponibles — alimente le menu déroulant de l'admin. */
export function customComponentKeys() {
  return Object.keys(customComponents);
}
