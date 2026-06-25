<template>
  <div class="admin admin-shell">
    <!-- BARRE LATÉRALE (ASIDE) -->
    <aside class="aside">
      <div class="lg">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <b>Espace Gestion</b>
      </div>
      <a v-for="tab in sidebarTabs" :key="tab.id" :class="{ on: activeTab === tab.id }" @click="activeTab = tab.id">
        <component :is="tab.icon" width="16" height="16" />
        <span>{{ tab.label }}</span>
      </a>
    </aside>

    <!-- ZONE PRINCIPALE (MAIN CONTENT) -->
    <main class="amain">
      <!-- En-tête de page -->
      <div class="atitle">
        <div class="ic">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3"/>
          </svg>
        </div>
        <div>
          <h3>Gestion de la Navigation</h3>
          <p>Configurez l'arborescence des menus et liens du portail (FR / EN / AR).</p>
        </div>
      </div>

      <!-- Barre de prévisualisation rapide -->
      <div class="preview">
        <div class="pl">Aperçu du menu principal (Actifs)</div>
        <div class="pbar">
          <span v-for="item in menuItems" :key="item.id" class="pitem" :class="{ off: !item.visible }">
            {{ item.title.fr }}
          </span>
        </div>
      </div>

      <!-- Actions de structure -->
      <div class="addbar">
        <button class="addbtn" @click="openModal(null)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Ajouter un menu principal
        </button>
      </div>

      <!-- Liste des cartes de navigation (Arborescence) -->
      <div class="nav-list">
        <div v-for="item in menuItems" :key="item.id" class="navcard" :class="{ off: !item.visible, drop: item.children && item.children.length > 0 }">
          <div class="nh">
            <!-- Drag Handle Icon -->
            <svg class="drag" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/>
              <circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
            </svg>

            <div class="info">
              <b>{{ item.title.fr }}</b>
              <span>Route : <code>{{ item.link }}</code></span>
            </div>

            <div class="nactions">
              <!-- Switch Visibilité -->
              <div class="tg" :class="{ on: item.visible }" @click="toggleVisibility(item)"></div>
              <!-- Bouton Modifier -->
              <button class="ico" @click="openModal(item)" title="Modifier">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <!-- Bouton Supprimer -->
              <button class="ico del" @click="deleteItem(item.id)" title="Supprimer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Liens Enfants (Sous-menus) -->
          <div v-if="item.children && item.children.length" class="children">
            <div v-for="child in item.children" :key="child.id" class="child">
              <span class="k">Sous-menu</span>
              <b>{{ child.title.fr }}</b>
              <code>{{ child.link }}</code>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- FENÊTRE MODALE D'ÉDITION / AJOUT -->
    <div v-if="modal.isOpen" class="overlay">
      <div class="modal">
        <div class="mh">
          <h4>{{ modal.isEdit ? 'Modifier le menu' : 'Ajouter un menu' }}</h4>
          <div class="x" @click="closeModal">✕</div>
        </div>

        <div class="mb">
          <!-- Onglets de Langues -->
          <div class="langtabs">
            <button v-for="lang in ['fr', 'en', 'ar']" :key="lang" :class="{ on: modal.currentLang === lang }" @click="modal.currentLang = lang">
              {{ lang.toUpperCase() }}
            </button>
          </div>

          <!-- Champ Titre Traduit -->
          <div class="fld">
            <label>Intitulé du menu ({{ modal.currentLang.toUpperCase() }})</label>
            <input type="text" class="inp" v-model="modal.form.title[modal.currentLang]" placeholder="Ex: Accueil / Home / الرئيسية" />
          </div>

          <!-- Champ Lien / Route -->
          <div class="fld">
            <label>Lien ou Route système</label>
            <input type="text" class="inp" v-model="modal.form.link" placeholder="Ex: /aip ou /regulations" />
          </div>
        </div>

        <div class="mf">
          <button class="mbtn cancel" @click="closeModal">Annuler</button>
          <button class="mbtn save" @click="saveModal">Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminNavigation",
  data() {
    return {
      activeTab: "nav",
      sidebarTabs: [
        { id: "nav", label: "Menu de Navigation", icon: "svg" },
        { id: "news", label: "Actualités / Publications", icon: "svg" },
        { id: "docs", label: "Documents & Lois", icon: "svg" },
        { id: "settings", label: "Configuration", icon: "svg" }
      ],
      // Structure de données dynamique calquée sur votre modèle d'aviation
      menuItems: [
        {
          id: 1,
          title: { fr: "Accueil", en: "Home", ar: "الرئيسية" },
          link: "/",
          visible: true,
          children: []
        },
        {
          id: 2,
          title: { fr: "Réglementation", en: "Regulations", ar: "التنظيم" },
          link: "/regulations",
          visible: true,
          children: [
            { id: 21, title: { fr: "Lois & décrets", en: "Laws & Decrees", ar: "القوانين والمراسيم" }, link: "/regulations/laws" },
            { id: 22, title: { fr: "Directives DAC", en: "CAD Directives", ar: "توجيهات الطيران" }, link: "/regulations/directives" }
          ]
        },
        {
          id: 3,
          title: { fr: "e-Services", en: "e-Services", ar: "الخدمات الإلكترونية" },
          link: "/eservices",
          visible: true,
          children: [
            { id: 31, title: { fr: "Autorisation de vol", en: "Flight Permit", ar: "تصريح طيران" }, link: "/eservice/flight-permit" }
          ]
        }
      ],
      // État interne de la fenêtre modale
      modal: {
        isOpen: false,
        isEdit: false,
        currentLang: "fr",
        editId: null,
        form: {
          title: { fr: "", en: "", ar: "" },
          link: ""
        }
      }
    };
  },
  methods: {
    toggleVisibility(item) {
      item.visible = !item.visible;
    },
    deleteItem(id) {
      if (confirm("Voulez-vous vraiment supprimer ce menu et ses sous-liens ?")) {
        this.menuItems = this.menuItems.filter(item => item.id !== id);
      }
    },
    openModal(item = null) {
      if (item) {
        this.modal.isEdit = true;
        this.modal.editId = item.id;
        this.modal.form = JSON.parse(JSON.stringify(item)); // Deep copy
      } else {
        this.modal.isEdit = false;
        this.modal.editId = null;
        this.modal.form = { title: { fr: "", en: "", ar: "" }, link: "", visible: true, children: [] };
      }
      this.modal.currentLang = "fr";
      this.modal.isOpen = true;
    },
    closeModal() {
      this.modal.isOpen = false;
    },
    saveModal() {
      if (!this.modal.form.title.fr || !this.modal.form.link) {
        alert("Veuillez renseigner au moins le titre en Français et le lien.");
        return;
      }

      if (this.modal.isEdit) {
        const index = this.menuItems.findIndex(item => item.id === this.modal.editId);
        if (index !== -1) {
          this.menuItems.splice(index, 1, this.modal.form);
        }
      } else {
        this.modal.form.id = Date.now();
        this.menuItems.push(this.modal.form);
      }
      this.closeModal();
    }
  }
};
</script>

<style lang="scss" scoped>
// Synchronisation complète avec la feuille de style globale fournie
$navy: #0A2B4E;
$navy-700: #103a66;
$sky: #1B9DD9;
$sky-soft: #e8f5fc;
$red: #E0322B;
$green: #4A9E3F;
$ink: #16242f;
$muted: #5b6b78;
$line: #dde6ec;
$paper: #ffffff;
$bg: #f4f7f9;
$serif: 'Spectral', Georgia, serif;

.admin {
  background: $bg;
  min-height: 100vh;
  color: $ink;
  font-family: 'Inter', system-ui, sans-serif;
}

.admin-shell {
  display: grid;
  grid-template-columns: 240px 1fr;
}

/* SIDEBAR LEFTSIDE */
.aside {
  background: $navy;
  color: #cfe0ee;
  padding: 24px 16px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);

  .lg {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 8px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 16px;

    b {
      color: #fff;
      font-size: 14px;
      font-family: $serif;
      font-weight: 700;
    }
  }

  a {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 11px 12px;
    border-radius: 8px;
    font-size: 13.5px;
    font-weight: 500;
    color: #cfe0ee;
    margin-bottom: 4px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: $navy-700;
      color: #fff;
    }

    &.on {
      background: $sky;
      color: #fff;
      font-weight: 600;
    }
  }
}

/* ZONE CONTENU (RIGHTSIDE) */
.amain {
  padding: 36px 40px;
}

.atitle {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;

  .ic {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: $navy;
    color: #fff;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  h3 {
    font-family: $serif;
    font-size: 24px;
    color: $navy;
    font-weight: 700;
    margin: 0;
  }

  p {
    font-size: 13px;
    color: $muted;
    margin: 2px 0 0;
  }
}

/* BANDEAU COMPOSANT DE PRÉVISUALISATION */
.preview {
  background: $paper;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(10, 43, 78, 0.03);

  .pl {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: $muted;
    margin-bottom: 12px;
  }

  .pbar {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .pitem {
    background: $sky-soft;
    color: $navy;
    font-size: 13px;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 7px;
    display: inline-flex;
    align-items: center;

    &.off {
      opacity: .4;
      text-decoration: line-through;
      background: #eef2f5;
      color: $muted;
    }
  }
}

/* ACTION BAR */
.addbar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.addbtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 18px;
  border: 1px dashed #b9cde0;
  border-radius: 9px;
  background: $paper;
  color: $navy;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: $sky;
    background: $sky-soft;
  }
}

/* CARTES D'ARBORESCENCE (NAVCARD) */
.navcard {
  background: $paper;
  border: 1px solid $line;
  border-radius: 11px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(10, 43, 78, 0.02);
  transition: opacity 0.15s;

  &.drop {
    border-left: 3px solid $sky;
  }

  &.off {
    opacity: .6;
  }

  .nh {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
  }

  .drag {
    color: #b6c6d3;
    cursor: grab;
    flex-shrink: 0;
  }

  .info {
    b {
      font-size: 15px;
      font-weight: 700;
      color: $navy;
      display: block;
    }
    span {
      font-size: 12px;
      color: $muted;
    }
    code {
      background: $bg;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11.5px;
      color: #334e68;
    }
  }
}

.nactions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* INTERRUPTEUR SWITCH (TOGGLE) */
.tg {
  width: 38px;
  height: 21px;
  border-radius: 11px;
  background: #cfdae3;
  position: relative;
  cursor: pointer;
  transition: background .2s;
  flex-shrink: 0;

  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    top: 2.5px;
    left: 2.5px;
    transition: left .2s;
    box-shadow: 0 1px 3px rgba(0,0,0,.15);
  }

  &.on {
    background: $green;
    &::after {
      left: 19.5px;
    }
  }
}

/* PETITS BOUTONS ICONES */
.ico {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: $muted;
  transition: all .12s;

  &:hover {
    color: $navy;
    border-color: #b9cde0;
    background: $bg;
  }

  &.del:hover {
    color: #fff;
    background: $red;
    border-color: $red;
  }
}

/* FILLES / SOUS-MENUS */
.children {
  padding: 0 18px 14px 44px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.child {
  display: flex;
  align-items: center;
  gap: 12px;
  background: $bg;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;

  .k {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 4px;
    background: $sky-soft;
    color: $sky;
  }

  b {
    color: $navy;
    font-weight: 600;
  }

  code {
    margin-left: auto;
    font-size: 11.5px;
    color: $muted;
    background: #fff;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid $line;
  }
}

/* INTERFACE MODALE / CONTEXTUELLE */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 20, 35, 0.55);
  display: grid;
  place-items: center;
  z-index: 300;
  padding: 20px;
}

.modal {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 540px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  .mh {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-bottom: 1px solid $line;

    h4 {
      font-family: $serif;
      font-size: 19px;
      color: $navy;
      margin: 0;
      font-weight: 700;
    }

    .x {
      cursor: pointer;
      color: $muted;
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      border-radius: 7px;
      transition: background 0.15s;

      &:hover {
        background: $bg;
        color: $red;
      }
    }
  }

  .mb {
    padding: 22px;
  }
}

/* ONGLETS LANGUES MODALE */
.langtabs {
  display: flex;
  gap: 5px;
  margin-bottom: 16px;

  button {
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid $line;
    background: #fff;
    color: $muted;
    cursor: pointer;
    transition: all 0.12s;

    &.on {
      background: $navy;
      color: #fff;
      border-color: $navy;
    }
  }
}

.fld {
  margin-bottom: 18px;

  label {
    display: block;
    font-size: 12.5px;
    font-weight: 700;
    color: $navy;
    margin-bottom: 8px;
  }
}

.inp {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid $line;
  border-radius: 8px;
  font-family: inherit;
  font-size: 13.5px;
  color: $ink;
  outline: none;
  background: #fbfcfd;
  transition: border-color 0.15s;

  &:focus {
    border-color: $sky;
    background: #fff;
  }
}

.mf {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 22px;
  border-top: 1px solid $line;
  background: #fafcfd;
}

.mbtn {
  padding: 10px 22px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.12s;

  &.cancel {
    background: #fff;
    border-color: $line;
    color: $ink;
    &:hover {
      background: $bg;
    }
  }

  &.save {
    background: $navy;
    color: #fff;
    &:hover {
      background: $navy-700;
    }
  }
}

/* RESPONSIVE FLUIDITÉ */
@media (max-width: 920px) {
  .admin-shell {
    grid-template-columns: 1fr;
  }
  .aside {
    display: none; /* Cache la barre latérale sur mobile comme sur votre maquette */
  }
  .amain {
    padding: 24px 20px;
  }
}

/* COMPATIBILITÉ ARABE DIRECTION (RTL) */
:global(html[dir="rtl"]) {
  .admin-shell {
    grid-template-columns: 1fr 240px;
  }
  .aside {
    border-right: none;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
  }
  .navcard.drop {
    border-left: 1px solid $line;
    border-right: 3px solid $sky;
  }
  .nactions {
    margin-left: 0;
    margin-right: auto;
  }
  .tg::after {
    left: auto;
    right: 2.5px;
  }
  .tg.on::after {
    left: auto;
    right: 19.5px;
  }
  .children {
    padding: 0 44px 14px 18px;
  }
  .child code {
    margin-left: 0;
    margin-right: auto;
  }
  .mf {
    justify-content: flex-start;
  }
}
</style>
