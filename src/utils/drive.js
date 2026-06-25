/**
 * utils/drive.js
 *
 * Centralise tout ce qui touche à Google Drive : on ne stocke QUE l'ID du fichier
 * en base, et on dérive les URLs d'affichage ici. Si un jour on change d'hébergeur
 * d'images, seul ce fichier bouge.
 *
 * Pré-requis : le fichier Drive doit être partagé en « Tout utilisateur disposant
 * du lien », sinon les URLs ne fonctionnent pas pour les visiteurs.
 */

/**
 * Accepte un lien Drive complet OU un ID brut et renvoie l'ID.
 * Gère les formats /file/d/{ID}/view, ?id={ID}, /d/{ID}, open?id={ID}.
 */
export function extractDriveId(input) {
  if (!input) return "";
  const value = String(input).trim();
  // déjà un ID brut (pas d'URL)
  if (!value.includes("/") && !value.includes("?")) return value;
  const patterns = [/\/file\/d\/([^/?]+)/, /\/d\/([^/?]+)/, /[?&]id=([^&]+)/];
  for (const re of patterns) {
    const m = value.match(re);
    if (m && m[1]) return m[1];
  }
  return value;
}

/**
 * URL d'affichage d'une image (CDN googleusercontent, bonne qualité).
 * `width` ajuste la taille servie.
 */
export function driveImageUrl(idOrUrl, width = 1600) {
  const id = extractDriveId(idOrUrl);
  return id ? `https://lh3.googleusercontent.com/d/${id}=w${width}` : "";
}

/**
 * URL d'affichage d'image de repli (endpoint thumbnail) — à utiliser en @error
 * sur la balise <img> si la première ne charge pas.
 */
export function driveThumbUrl(idOrUrl, width = 1600) {
  const id = extractDriveId(idOrUrl);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w${width}` : "";
}

/** Lien « Consulter » d'un document (ouvre la visionneuse Drive). */
export function driveFileUrl(idOrUrl) {
  const id = extractDriveId(idOrUrl);
  return id ? `https://drive.google.com/file/d/${id}/view` : "";
}

/** URL d'aperçu intégrable dans une iframe. */
export function drivePreviewUrl(idOrUrl) {
  const id = extractDriveId(idOrUrl);
  return id ? `https://drive.google.com/file/d/${id}/preview` : "";
}

/** Transforme un libellé en slug d'URL (sans accents, en minuscules). */
export function slugify(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
