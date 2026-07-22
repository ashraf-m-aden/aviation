<template>
  <div class="docs-manager">
    <h2 class="dm-title">{{ intern ? "Documents internes" : "Documents publics" }}</h2>

    <!-- Catégories -->
    <div class="dm-block">
      <span class="dm-label">Catégorie</span>
      <div class="pills">
        <button
          v-for="(cat, index) in categories"
          :key="index"
          class="pill"
          :class="{ 'is-active': category && category._id === cat._id }"
          @click="getSubCategoryOne(cat)"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Niveau 1 : sous-catégories + documents -->
    <div class="dm-grid" v-if="subCategoryOne.length > 0 && !loading">
      <!-- Sous-catégories niveau 1 -->
      <aside class="panel">
        <div class="panel__head">
          <span class="dm-label">Sous-catégories — niveau 1</span>
          <button class="iconbtn" v-if="isAdmin">
            <font-awesome-icon v-if="!addSubOne" :icon="['fas', 'plus']" @click="addSubOne = true" />
            <font-awesome-icon v-else :icon="['fas', 'minus']" @click="addSubOne = false; newSubOne.name = ''" />
          </button>
        </div>

        <div class="sublist">
          <template v-for="(item, index) in subCategoryOne" :key="index">
            <div
              v-if="item.enabled"
              class="subrow"
              :class="{ 'is-active': isCurrentSubOne(item) }"
              @click="getSubCategoryTwo(item)"
            >
              <span class="subrow__name">{{ item.name }}</span>
              <div class="subrow__actions" v-if="isCurrentSubOne(item) && isAdmin">
                <button class="tgic" :class="{ off: !item.isPublic }" title="Public" @click.stop="togglePublicItem(!item.isPublic, item._id)">
                  <font-awesome-icon :icon="['fas', 'globe']" />
                </button>
                <button class="tgic" :class="{ off: !item.isIntern }" title="Interne" @click.stop="toggleInternItem(!item.isIntern, item._id)">
                  <font-awesome-icon :icon="['fas', 'house']" />
                </button>
                <button
                  v-if="subOneDoc.length == 0 && subCategoryTwo.length == 0"
                  class="tgic del"
                  title="Supprimer"
                  @click.stop="removeSubOne(item._id)"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
              </div>
            </div>
            <div v-else-if="isAdmin" class="subrow subrow--off">
              <span class="subrow__name">{{ item.name }}</span>
              <div class="subrow__actions">
                <button class="tgic restore" title="Restaurer" @click="retrieveSubOne(item._id)">
                  <font-awesome-icon :icon="['fas', 'trash-restore']" />
                </button>
                <button class="tgic del" title="Supprimer définitivement" @click="eraseSubOne(item._id)">
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
              </div>
            </div>
          </template>

          <div class="addrow" v-if="addSubOne && isAdmin">
            <input type="text" v-model="newSubOne.name" class="inp" placeholder="Nom de la sous-catégorie" />
            <button class="btn-add" @click="addNewSubOne(subCategoryOne[0].idParent)">Ajouter</button>
          </div>
        </div>
      </aside>

      <!-- Documents niveau 1 -->
      <section class="panel" v-if="isSubOne && uploadGate(subOne)">
        <div class="panel__head">
          <span class="dm-label">Documents</span>
          <button v-if="subOneDoc.length == 0 && isAdmin" class="btn-ghost" @click="addSubCategory2(subOne._id)">
            Créer des sous-catégories
          </button>
        </div>

        <DriveUpload
          class="dm-upload"
          :isPublicDocumentS1="!intern"
          :isPrivateDocument1="intern"
          :category="category"
          :subOne="subOne"
          @uploaded="uploaded"
        />

        <div class="dm-actions">
          <button v-if="!actual && !loading" class="btn-refresh" @click="actualiser(subOne, 1)">Actualiser</button>
          <span v-else-if="actual" class="spin"><v-progress-circular indeterminate size="20" color="primary" /></span>
        </div>

        <div class="doctable" v-if="!actual && !loading && subOneDoc.length">
          <div class="docrow" v-for="(doc, index) in subOneDoc" :key="index" :class="{ 'is-off': !doc.enabled }">
            <a class="docrow__file" :href="fileLink(doc)" target="_blank" rel="noopener">
              <img src="@/assets/pdf.png" width="26" alt="" />
            </a>
            <span class="docrow__name">{{ doc.name }}</span>
            <div class="docrow__actions" v-if="isAdmin">
              <button class="ico" :disabled="!doc.enabled" title="Suspendre" @click="disableDocument(subOne, 1, doc._id)">
                <v-icon size="small">mdi-eye-off-outline</v-icon>
              </button>
              <button class="ico" :disabled="doc.enabled" title="Re-publier" @click="enableDocument(subOne, 1, doc._id)">
                <v-icon size="small">mdi-eye-outline</v-icon>
              </button>
              <button class="ico del" title="Supprimer" @click="deleteDocument(subOne, 1, doc)">
                <v-icon size="small">mdi-delete</v-icon>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="dm-loading" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- Niveau 2 -->
    <div class="dm-block" v-show="subCategoryTwo.length > 0">
      <span class="dm-label">Sous-catégories — niveau 2</span>
      <div class="tabs2">
        <button
          v-for="(st, index) in subCategoryTwo"
          :key="index"
          class="tab2"
          :class="{ 'is-active': isCurrentSubTwo(st) }"
          @click="getSubTwoName(st)"
        >
          {{ st.name }}
        </button>
        <button class="tab2 tab2--add" v-if="isAdmin">
          <font-awesome-icon v-if="!addSubTwo" :icon="['fas', 'plus']" @click="addSubTwo = true" />
          <font-awesome-icon v-else :icon="['fas', 'minus']" @click="addSubTwo = false; newSubTwo.name = ''" />
        </button>
      </div>

      <div class="subtwo" v-if="subTwo !== ''">
        <div class="subtwo__toolbar" v-if="!loading && !addSubTwo && isAdmin">
          <div class="subtwo__left">
            <button v-if="subTwo.enabled" class="tgic del" title="Supprimer" @click="removeSubTwo(subTwo._id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
            <button v-if="!subTwo.enabled" class="tgic restore" title="Restaurer" @click="retrieveSubTwo(subTwo._id)">
              <font-awesome-icon :icon="['fas', 'trash-restore']" />
            </button>
            <button v-if="!subTwo.enabled" class="tgic del" title="Supprimer définitivement" @click="eraseSubTwo(subTwo._id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
          <div class="subtwo__right">
            <button class="tgic" :class="{ off: !subTwo.isPublic }" title="Public" @click="togglePublicItem(!subTwo.isPublic, subTwo._id)">
              <font-awesome-icon :icon="['fas', 'globe']" />
            </button>
            <button class="tgic" :class="{ off: !subTwo.isIntern }" title="Interne" @click="toggleInternItem(!subTwo.isIntern, subTwo._id)">
              <font-awesome-icon :icon="['fas', 'house']" />
            </button>
          </div>
        </div>

        <div v-if="subTwo.enabled && !loading && !addSubTwo">
          <DriveUpload
            class="dm-upload"
            :isPublicDocumentS2="!intern"
            :isPrivateDocument2="intern"
            :category="category"
            :subOne="subOne"
            :subTwo="subTwo"
            @uploaded="uploaded"
          />

          <div class="dm-actions">
            <button v-if="!actual2 && !loading2" class="btn-refresh" @click="actualiser(subTwo, 2)">Actualiser</button>
            <span v-else-if="actual2 && !loading2" class="spin"><v-progress-circular indeterminate size="20" color="primary" /></span>
          </div>

          <div class="doctable" v-if="!actual2 && !loading2 && subTwoDoc.length">
            <div class="docrow" v-for="(doc, index) in subTwoDoc" :key="index" :class="{ 'is-off': !doc.enabled }">
              <a class="docrow__file" :href="fileLink(doc)" target="_blank" rel="noopener">
                <img src="@/assets/pdf.png" width="26" alt="" />
              </a>
              <span class="docrow__name">{{ doc.name }}</span>
              <div class="docrow__actions" v-if="isAdmin">
                <button class="ico" :disabled="!doc.enabled" title="Suspendre" @click="disableDocument(subTwo, 2, doc._id)">
                  <v-icon size="small">mdi-eye-off-outline</v-icon>
                </button>
                <button class="ico" :disabled="doc.enabled" title="Re-publier" @click="enableDocument(subTwo, 2, doc._id)">
                  <v-icon size="small">mdi-eye-outline</v-icon>
                </button>
                <button class="ico del" title="Supprimer" @click="deleteDocument(subTwo, 2, doc)">
                  <v-icon size="small">mdi-delete</v-icon>
                </button>
              </div>
            </div>
          </div>

          <div class="dm-loading" v-if="loading2">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </div>
      </div>

      <div class="addrow addrow--block" v-if="addSubTwo && isAdmin">
        <input v-model="newSubTwo.name" type="text" class="inp" placeholder="Nom de la sous-catégorie" />
        <button class="btn-add" @click="addNewSubCategory2Field(subOne._id)">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script>
import DriveUpload from "../components/DriveUpload.vue";
import categoryService from "../services/category.service";
import { driveFileUrl } from "../utils/drive";
import { resolveAccessScope } from "@/utils/access-scope";

export default {
  name: "DocumentsManager",
  components: { DriveUpload },
  props: {
    intern: { type: Boolean, default: false },
  },
  metaInfo() {
    return { meta: [{ name: "robots", content: "noindex" }, { name: "googlebot", content: "noindex" }] };
  },
  data() {
    return {
      subCategoryOne: [],
      subCategoryTwo: [],
      subOneDoc: [],
      subTwoDoc: [],
      category: "",
      subOne: "",
      subTwo: "",
      isSubOne: false,
      loading: false,
      loading2: false,
      actual: false,
      actual2: false,
      addSubOne: false,
      addSubTwo: false,
      newSubOne: { idParent: "", enabled: true, isIntern: this.intern, isPublic: !this.intern, _id: "", name: "" },
      newSubTwo: { idParent: "", enabled: true, isIntern: this.intern, isPublic: !this.intern, _id: "", name: "" },
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.getUser || {};
    },
    isAdmin() {
      return this.currentUser.isAdmin === true;
    },
    scoped() {
      return resolveAccessScope(
        this.currentUser.accessScope,
        this.$store.state.category.category,
        this.allsubCategoryOne,
        this.allsubCategoryTwo,
      );
    },
    allDocuments() {
      return this.$store.state.documents.documents.filter((d) => Boolean(d.isIntern) === this.intern);
    },
    categories() {
      const excluded = ["A propos de nous", "e-Services"];
      if (this.intern) excluded.push("Publications");
      let cats = this.$store.state.category.category.filter((cat) => !excluded.includes(cat.name));
      if (!this.isAdmin) {
        cats = cats.filter((c) => this.scoped.catVisible.has(c._id));
      }
      return cats;
    },
    allsubCategoryOne() {
      return this.$store.state.category.subCategoryOne;
    },
    allsubCategoryTwo() {
      return this.$store.state.category.subCategoryTwo;
    },
  },
  methods: {
    fileLink(doc) {
      return doc.driveId ? driveFileUrl(doc.driveId) : doc.src || doc.url || "#";
    },
    uploadGate(sub) {
      return this.intern ? sub.isIntern : sub.isPublic;
    },
    isCurrentSubOne(item) {
      return this.subOne && this.subOne._id === item._id;
    },
    isCurrentSubTwo(item) {
      return this.subTwo && this.subTwo._id === item._id;
    },

    getSubCategoryOne(item) {
      this.subCategoryOne = [];
      this.subCategoryTwo = [];
      this.subOneDoc = [];
      this.isSubOne = false;
      this.category = item;
      this.subOne = "";
      this.subTwo = "";
      this.allsubCategoryOne.forEach((el) => {
        if (el.idParent !== item._id) return;
        if (!this.isAdmin && !this.scoped.subOneVisible.has(el._id)) return;
        this.subCategoryOne.push(el);
      });
    },
    getSubCategoryTwo(item) {
      this.getSubOneDoc(item);
      this.subOne = item;
      this.subTwo = "";
      this.subCategoryTwo = [];
      this.allsubCategoryTwo.forEach((el) => {
        if (el.idParent !== item._id) return;
        if (!this.isAdmin && !this.scoped.subTwoAllowed.has(el._id)) return;
        this.subCategoryTwo.push(el);
      });
      this.isSubOne = this.subCategoryTwo.length === 0;
      this.actual = false;
    },
    getSubTwoName(item) {
      this.subTwo = item;
      this.subTwoDoc = [];
      if (this.addSubTwo) this.addSubTwo = false;
      this.allDocuments.forEach((el) => {
        if (el.idParent === this.subTwo._id) this.subTwoDoc.push(el);
      });
      this.actual2 = false;
    },
    getSubOneDoc(item) {
      this.subOne = item;
      this.subOneDoc = [];
      // agent : accès à ses documents propres uniquement si la sous-cat 1
      // est elle-même explicitement autorisée (pas juste "visible" pour naviguer)
      if (!this.isAdmin && !this.scoped.subOneAllowed.has(item._id)) return;
      this.allDocuments.forEach((el) => {
        if (el.idParent === this.subOne._id) this.subOneDoc.push(el);
      });
    },

    async disableDocument(sub, number, id) {
      if (!this.isAdmin) return;
      number === 1 ? (this.loading = true) : (this.loading2 = true);
      await this.$store.dispatch("disableOneDocument", id);
      await this.actualiser(sub, number);
      this.loading = false;
      this.loading2 = false;
    },
    async enableDocument(sub, number, id) {
      if (!this.isAdmin) return;
      number === 1 ? (this.loading = true) : (this.loading2 = true);
      await this.$store.dispatch("enableOneDocument", id);
      await this.actualiser(sub, number);
      this.loading = false;
      this.loading2 = false;
    },
    async deleteDocument(sub, number, item) {
      if (!this.isAdmin) return;
      number === 1 ? (this.loading = true) : (this.loading2 = true);
      await this.$store.dispatch("deleteOneDocument", item._id);
      await this.$store.dispatch("setDocuments");
      await this.$store.dispatch("setPublicDocuments");
      await this.actualiser(sub, number);
      this.loading = false;
      this.loading2 = false;
    },
    uploaded(value) {
      this.actualiser(value[0], value[1]);
    },
    async actualiser(item, number) {
      if (number === 1) {
        this.actual = true;
        await this.$store.dispatch("setDocuments");
        this.getSubCategoryTwo(item);
      } else {
        this.actual2 = true;
        await this.$store.dispatch("setDocuments");
        this.getSubTwoName(item);
      }
    },

    async refreshCategories() {
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
    },
    async addNewSubOne(idParent) {
      if (!this.isAdmin) return;
      this.loading = true;
      this.newSubOne.idParent = idParent;
      await categoryService.addSubCategoryToCategory(this.newSubOne);
      await this.refreshCategories();
      this.getSubCategoryOne(this.category);
      this.newSubOne.name = "";
      this.addSubOne = false;
      this.loading = false;
    },
    async removeSubOne(id) {
      if (!this.isAdmin) return;
      this.loading = true;
      await categoryService.removeSubCategoryOne(id);
      await this.refreshCategories();
      this.getSubCategoryOne(this.category);
      this.loading = false;
    },
    async retrieveSubOne(id) {
      if (!this.isAdmin) return;
      this.loading = true;
      await categoryService.retrieveSubCategoryOne(id);
      await this.refreshCategories();
      this.getSubCategoryOne(this.category);
      this.loading = false;
    },
    async eraseSubOne(id) {
      if (!this.isAdmin) return;
      this.loading = true;
      await categoryService.eraseSubCategoryOne(id);
      await this.refreshCategories();
      this.getSubCategoryOne(this.category);
      this.loading = false;
    },
    async addSubCategory2(idParent) {
      if (!this.isAdmin) return;
      this.loading = true;
      await categoryService.addSubCategoryTwo(idParent);
      await this.refreshCategories();
      this.getSubCategoryTwo(this.subOne);
      this.loading = false;
    },
    async addNewSubCategory2Field(idParent) {
      if (!this.isAdmin) return;
      this.loading = true;
      this.newSubTwo.idParent = idParent;
      await categoryService.addNewSubCategoryTwoField(this.newSubTwo);
      await this.refreshCategories();
      this.getSubCategoryTwo(this.subOne);
      this.newSubTwo.name = "";
      this.loading = false;
    },
    async removeSubTwo(id) {
      if (!this.isAdmin) return;
      this.loading = true;
      await categoryService.removeSubCategoryTwo(id);
      await this.refreshCategories();
      this.getSubCategoryTwo(this.subOne);
      this.loading = false;
    },
    async retrieveSubTwo(id) {
      if (!this.isAdmin) return;
      this.loading = true;
      await categoryService.retrieveSubCategoryTwo(id);
      await this.refreshCategories();
      this.getSubCategoryTwo(this.subOne);
      this.loading = false;
    },
    async eraseSubTwo(id) {
      if (!this.isAdmin) return;
      this.loading = true;
      await categoryService.eraseSubCategoryTwo(id);
      await this.refreshCategories();
      this.getSubCategoryTwo(this.subOne);
      this.loading = false;
    },
    async toggleInternItem(data, id) {
      if (!this.isAdmin) return;
      this.loading = true;
      await categoryService.toggleInternItem(data, id);
      await this.refreshCategories();
      if (this.subOne) this.getSubCategoryTwo(this.subOne);
      this.getSubCategoryOne(this.category);
      this.loading = false;
    },
    async togglePublicItem(data, id) {
      if (!this.isAdmin) return;
      this.loading = true;
      await categoryService.togglePublicItem(data, id);
      await this.refreshCategories();
      this.getSubCategoryOne(this.category);
      if (this.subOne) this.getSubCategoryTwo(this.subOne);
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$sky-soft: #e8f5fc;
$green: #4a9e3f;
$red: #e0322b;
$muted: #5b6b78;
$line: #dde6ec;

.docs-manager { max-width: 1080px; }
.dm-title {
  font-size: 21px;
  color: $navy;
  font-family: "Spectral", Georgia, serif;
  margin-bottom: 20px;
}
.dm-block { margin-bottom: 26px; }
.dm-label {
  display: block;
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $muted;
  margin-bottom: 10px;
}

.pills { display: flex; flex-wrap: wrap; gap: 8px; }
.pill {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: $navy;
  background: #fff;
  border: 1px solid $line;
  border-radius: 30px;
  padding: 8px 16px;
  cursor: pointer;
  transition: 0.15s;
  &:hover { border-color: $sky; color: $sky; }
  &.is-active { background: $navy; color: #fff; border-color: $navy; }
}

.dm-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
  align-items: start;
}
.panel {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 16px;
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .dm-label { margin-bottom: 0; }
  }
}
.iconbtn {
  width: 30px;
  height: 30px;
  border: 1px solid $line;
  background: #fff;
  border-radius: 7px;
  color: $navy;
  cursor: pointer;
  &:hover { border-color: $sky; color: $sky; }
}

.sublist { display: flex; flex-direction: column; gap: 5px; }
.subrow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid $line;
  border-radius: 9px;
  cursor: pointer;
  transition: 0.13s;
  &:hover { border-color: #b9cde0; background: #fbfdfe; }
  &.is-active { background: $sky-soft; border-color: $sky; }
  &--off { opacity: 0.7; background: #f7f9fb; cursor: default; }
  &__name { font-size: 13.5px; font-weight: 600; color: $navy; }
  &__actions { display: flex; gap: 4px; }
}
.tgic {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  border: 1px solid transparent;
  background: rgba(74, 158, 63, 0.12);
  color: $green;
  cursor: pointer;
  font-size: 12px;
  display: inline-grid;
  place-items: center;
  &.off { background: rgba(224, 50, 43, 0.1); color: $red; }
  &.del { background: rgba(224, 50, 43, 0.1); color: $red; }
  &.restore { background: rgba(74, 158, 63, 0.12); color: $green; }
  &:hover { filter: brightness(0.95); }
}

.addrow {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  &--block { margin-top: 14px; max-width: 420px; }
}
.inp {
  flex: 1;
  padding: 9px 12px;
  border: 1px solid $line;
  border-radius: 8px;
  font: inherit;
  font-size: 13.5px;
  outline: none;
  &:focus { border-color: $sky; }
}
.btn-add {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: $green;
  border: none;
  border-radius: 8px;
  padding: 9px 16px;
  cursor: pointer;
  white-space: nowrap;
  &:hover { filter: brightness(0.95); }
}
.btn-ghost {
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: $sky;
  background: $sky-soft;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  &:hover { background: #d8eefa; }
}

.dm-upload { margin: 4px 0 16px; }
.dm-actions { display: flex; justify-content: flex-end; margin-bottom: 12px; }
.btn-refresh {
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: $navy;
  background: #fff;
  border: 1px solid $line;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  &:hover { border-color: $sky; color: $sky; }
}
.spin { display: inline-flex; align-items: center; }

.doctable {
  border: 1px solid $line;
  border-radius: 10px;
  overflow: hidden;
}
.docrow {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 14px;
  border-bottom: 1px solid $line;
  &:last-child { border-bottom: none; }
  &.is-off { opacity: 0.5; }
  &__file { flex: none; display: inline-flex; }
  &__name { flex: 1; font-size: 13.5px; color: $navy; font-weight: 500; }
  &__actions { display: flex; gap: 5px; }
}
.ico {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #fff;
  cursor: pointer;
  color: $muted;
  display: inline-grid;
  place-items: center;
  &:hover:not(:disabled) { border-color: #b9cde0; color: $navy; }
  &:disabled { opacity: 0.35; cursor: default; }
  &.del:hover { background: $red; color: #fff; border-color: $red; }
}

.tabs2 {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  border-bottom: 1px solid $line;
  padding-bottom: 10px;
  margin-bottom: 16px;
}
.tab2 {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: $muted;
  background: #fff;
  border: 1px solid $line;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  &:hover { color: $sky; border-color: $sky; }
  &.is-active { background: $sky; color: #fff; border-color: $sky; }
  &--add { color: $navy; }
}
.subtwo {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 16px;
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  &__left, &__right { display: flex; gap: 6px; }
}

.dm-loading { display: grid; place-items: center; padding: 40px 0; }

@media (max-width: 860px) {
  .dm-grid { grid-template-columns: 1fr; }
}
</style>
