export function localizedName(item, locale = "fr") {
  if (!item) return "";
  const n = item.name;

  // forme objet : { fr, en, ar }
  if (n && typeof n === "object") {
    return n[locale] || n.fr || Object.values(n).find(Boolean) || "";
  }

  // forme chaîne (fr) + traductions optionnelles
  if (locale === "en" && item.nameEn) return item.nameEn;
  if (locale === "ar" && item.nameAr) return item.nameAr;
  return n || item.nameEn || item.nameAr || "";
}
