/**
 * Données d'amorçage (seed) de la collection Firestore `navigation`,
 * converties depuis l'ancien menu statique (NewHeader.vue).
 *
 * Chaque entrée de premier niveau devient un document `navigation`.
 * Les sous-éléments sont stockés dans `children`.
 *
 * Les liens pointent vers les routes existantes (slug = chemin sans le « / »
 * initial, query comprise) → ils fonctionnent immédiatement. Tu pourras ensuite,
 * dans l'admin Navigation, re-cibler ceux que tu veux vers le nouveau système de
 * documents (catégorie → sous-catégorie) à ton rythme.
 *
 * Pour l'import, voir le bas du fichier.
 */

// libellé trilingue ; en/ar reprennent le fr par défaut (à traduire ensuite)
function L(fr, en, ar) {
  return { fr, en: en || fr, ar: ar || fr };
}

let _cid = 0;
const cid = () => `seed_${Date.now().toString(36)}_${_cid++}`;

// raccourci pour un sous-lien interne
function link(label, slug, order) {
  return {
    _id: cid(),
    label,
    slug,
    type: "link",
    kind: "link", // lien interne (router-link) — non "external"
    enabled: true,
    order,
  };
}

export const navigationSeed = [
  {
    label: L("Accueil", "Home", "الرئيسية"),
    slug: "",
    type: "link",
    kind: "link",
    enabled: true,
    order: 0,
  },
  {
    label: L("À propos de nous", "About us", "من نحن"),
    slug: "a-propos",
    type: "dropdown",
    enabled: true,
    order: 1,
    children: [
      link(L("Présentation"), "Presentation", 0),
      link(L("Mot du directeur"), "Mot-du-directeur", 1),
      link(L("Organisation"), "Organisation", 2),
      link(L("Politique de supervision"), "Politique-de-Supervision", 3),
      link(L("Politique de formation"), "Politique-de-Formation", 4),
    ],
  },
  {
    label: L("Publications", "Publications", "المنشورات"),
    slug: "publications",
    type: "dropdown",
    enabled: true,
    order: 2,
    children: [
      link(
        L("Législations"),
        "Categorie/Legislations?id=5f53706c838ed6002be47d36",
        0,
      ),
      link(
        L("Textes réglementaires"),
        "Categorie/Textes reglementaires?id=5f53707658ac040039a1a6c0",
        1,
      ),
      link(L("Directives"), "Directives", 2),
      link(L("Circulaires"), "Circulaires", 3),
      link(L("Décisions"), "Decisions", 4),
    ],
  },
  {
    label: L("Sécurité", "Safety", "السلامة"),
    slug: "securite",
    type: "dropdown",
    enabled: true,
    order: 3,
    children: [
      link(
        L("Navigabilité"),
        "Categorie/Navigabilité?id=5f3aa3413c2c433e946dcca6",
        0,
      ),
      link(
        L("Exploitation technique des aéronefs"),
        "Categorie/Exploitation technique des aéronefs?id=5f3aa7e234512340cc2b8253",
        1,
      ),
      link(
        L("Licence du personnel"),
        "Categorie/License du personel?id=5f3aa7f034512340cc2b8254",
        2,
      ),
      link(
        L("Aérodrome et infrastructures aéroportuaires"),
        "Categorie/Aérodrome et infrastructures aéroportuaires?id=5f3aa7fe34512340cc2b8255",
        3,
      ),
      link(
        L("Service de l'information aéronautique et de la cartographie"),
        "Categorie/Service de l'information aéronautique et de la cartographie?id=5f3aa80a34512340cc2b8256",
        4,
      ),
      link(
        L("Communication, navigation et surveillance"),
        "Categorie/Communication, navigation et surveillance?id=5f535bbc1dc9dc44eceead5c",
        5,
      ),
      link(
        L("Gestion de l'espace aérien"),
        "Categorie/Gestion de l'espace aérien?id=5f535bcd1dc9dc44eceead5d",
        6,
      ),
      link(
        L("Service météorologique"),
        "Categorie/Service metéorologique?id=5f535bd91dc9dc44eceead5e",
        7,
      ),
      link(
        L("Recherches et sauvetages"),
        "Categorie/Recherches et sauvetages?id=5f57966756cc341290c683d2",
        8,
      ),
    ],
  },
  {
    label: L("Sûreté", "Security", "الأمن"),
    slug: "surete",
    type: "dropdown",
    enabled: true,
    order: 4,
    children: [
      link(L("Sûreté"), "Categorie/Sureté?id=5f535d6433d82b0034f95ee8", 0),
      link(
        L("Facilitation"),
        "Categorie/Facilitation?id=5f535d69c0161b0045e05444",
        1,
      ),
    ],
  },
  {
    label: L("e-Services", "e-Services", "الخدمات الإلكترونية"),
    slug: "eservices",
    type: "dropdown",
    enabled: true,
    order: 5,
    children: [
      link(
        L("Formulaire de compte rendu"),
        "eservice/Formulaire de compte rendu",
        0,
      ),
      link(
        L("Demande d'autorisation de vol"),
        "eservice/Demande d'autorisation de vol",
        1,
      ),
    ],
  },
  {
    label: L(
      "Administration et affaires juridiques",
      "Administration & Legal Affairs",
      "الإدارة والشؤون القانونية",
    ),
    slug: "administration",
    type: "dropdown",
    enabled: true,
    order: 6,
    children: [
      link(L("Lois"), "Juridiques/Lois?id=6035f30ea713263cf8a98c51", 0),
      link(L("Décrets"), "Juridiques/Décrets?id=6035f317a713263cf8a98c52", 1),
      link(L("Arrêtés"), "Juridiques/Arrêtés?id=6035f32ca713263cf8a98c53", 2),
      link(
        L("Règlements"),
        "Juridiques/Règlements?id=6035f337a713263cf8a98c54",
        3,
      ),
      link(
        L("Procédures"),
        "Juridiques/Procédures?id=6035f350a713263cf8a98c57",
        4,
      ),
      link(
        L("Directives"),
        "Juridiques/Directives?id=6035f35da713263cf8a98c59",
        5,
      ),
      link(
        L("Circulaires"),
        "Juridiques/Circulaires?id=6035f362a713263cf8a98c5a",
        6,
      ),
      link(
        L("Politiques"),
        "Juridiques/Politiques?id=6035f347a713263cf8a98c56",
        7,
      ),
    ],
  },
  {
    label: L("A.I.P.", "A.I.P.", "A.I.P."),
    slug: "aip",
    type: "dropdown",
    enabled: true,
    order: 7,
    children: [
      link(
        L("Publications d'Information Aéronautique"),
        "aip?id=61a3bf992a5e4d2a901c8f40",
        0,
      ),
    ],
  },
];

/**
 * IMPORT (à exécuter UNE seule fois, en étant connecté en admin).
 *
 * Le plus simple : ajoute temporairement un bouton dans GestionNavigation.vue.
 *
 *   import { navigationSeed } from "@/utils/navigationSeed";
 *
 *   methods: {
 *     async seedNav() {
 *       for (const item of navigationSeed) {
 *         await this.$store.dispatch("createNavItem", item);
 *       }
 *       alert("Navigation importée ✔");
 *     }
 *   }
 *
 *   <button class="addbtn" @click="seedNav">Importer l'ancienne navigation</button>
 *
 * Clique une fois, vérifie le résultat, puis retire le bouton et cet appel.
 * (Les règles Firestore autorisent l'écriture uniquement aux admins, d'où la
 *  nécessité d'être connecté.)
 */
