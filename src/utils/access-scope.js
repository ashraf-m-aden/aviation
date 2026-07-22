// Résout un accessScope "plat" (mélange d'_id de tous niveaux) en listes
// exploitables pour filtrer catégories / sous-catégories 1 / sous-catégories 2.
//
// Logique :
//  - un ID de catégorie dans le scope autorise toutes ses sous-catégories 1 et 2
//  - un ID de sous-catégorie 1 autorise toutes ses sous-catégories 2
//  - un ID de sous-catégorie 2 n'autorise qu'elle-même
//  - les parents d'un élément autorisé restent VISIBLES (pour naviguer),
//    même s'ils ne sont pas eux-mêmes "autorisés" au sens documents.
export function resolveAccessScope(accessScope, categories, subOnes, subTwos) {
  const scope = new Set(accessScope || []);

  const catAllowed = new Set(
    (categories || []).filter((c) => scope.has(c._id)).map((c) => c._id),
  );
  const subOneAllowed = new Set(
    (subOnes || []).filter((s) => scope.has(s._id)).map((s) => s._id),
  );
  const subTwoAllowed = new Set(
    (subTwos || []).filter((s) => scope.has(s._id)).map((s) => s._id),
  );

  // Cascade descendante : catégorie autorisée -> ses sous-cat 1 ; sous-cat 1 -> ses sous-cat 2
  (subOnes || []).forEach((s1) => {
    if (catAllowed.has(s1.idParent)) subOneAllowed.add(s1._id);
  });
  (subTwos || []).forEach((s2) => {
    if (subOneAllowed.has(s2.idParent)) subTwoAllowed.add(s2._id);
  });

  // Visibilité ascendante : un parent doit rester visible si un enfant est autorisé,
  // sinon impossible de naviguer jusqu'à l'élément autorisé.
  const subOneVisible = new Set(subOneAllowed);
  (subOnes || []).forEach((s1) => {
    const hasAllowedChild = (subTwos || []).some(
      (s2) => s2.idParent === s1._id && subTwoAllowed.has(s2._id),
    );
    if (hasAllowedChild) subOneVisible.add(s1._id);
  });

  const catVisible = new Set(catAllowed);
  (subOnes || []).forEach((s1) => {
    if (subOneVisible.has(s1._id)) catVisible.add(s1.idParent);
  });

  return { catVisible, subOneVisible, subOneAllowed, subTwoAllowed };
}
