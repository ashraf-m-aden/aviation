<template>
  <div class="banners">
    <!-- Ajout -->
    <DriveUpload :isBanner="true" />

    <!-- Liste -->
    <h3 class="banners__h3">Bannières du carrousel</h3>
    <p v-if="!banniere.length" class="banners__empty">Aucune bannière pour le moment.</p>

    <div v-else class="bgrid">
      <div class="bcard" v-for="(banner, index) in banniere" :key="banner._id || index">
        <div class="bcard__media">
          <img :src="imageSrc(banner)" alt="" @error="onImgError($event, banner)" />
        </div>
        <div class="bcard__body">
          <label>Titre</label>
          <input class="inp" type="text" v-model="banner.title" />
          <label>Description</label>
          <textarea class="inp" rows="2" v-model="banner.description"></textarea>

          <div class="bcard__foot">
            <div class="order">
              <button class="ico" :disabled="index === 0" @click="top(index)" title="Monter">▲</button>
              <button class="ico" :disabled="index === banniere.length - 1" @click="down(index)" title="Descendre">▼</button>
            </div>
            <div class="acts">
              <button class="btn-save" @click="modify(banner)">Enregistrer</button>
              <button class="ico del" @click="remove(banner)" title="Supprimer">🗑</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="banners__bar" v-if="banniere.length">
      <button class="btn-order" @click="saveOrder">Enregistrer l'ordre</button>
    </div>
  </div>
</template>

<script>
import DriveUpload from "@/components/DriveUpload.vue";
import { driveImageUrl, driveThumbUrl } from "@/utils/drive";

export default {
  name: "BannerPage",
  components: { DriveUpload },
  computed: {
    banniere() {
      return this.$store.state.media.banner || [];
    },
  },
  methods: {
    imageSrc(item) {
      return item.driveId ? driveImageUrl(item.driveId, 600) : item.url || "";
    },
    onImgError(e, item) {
      if (item.driveId) {
        const fb = driveThumbUrl(item.driveId, 600);
        if (e.target.src !== fb) e.target.src = fb;
      }
    },
    modify(banner) {
      this.$store.dispatch("modifyBanner", banner);
      this.$store.dispatch("successNotif", "Bannière mise à jour.");
    },
    remove(item) {
      if (!confirm("Supprimer cette bannière ?")) return;
      this.$store.dispatch("deleteOneBanner", item._id);
    },
    top(index) {
      this.$store.dispatch("topBanner", index);
    },
    down(index) {
      this.$store.dispatch("downBanner", index);
    },
    saveOrder() {
      this.$store.dispatch("saveNewBanner");
      this.$store.dispatch("successNotif", "Ordre enregistré.");
    },
  },
  created() {
    this.$store.dispatch("getBanners");
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$red: #e0322b;
$muted: #5b6b78;
$line: #dde6ec;

.banners {
  &__h3 { font-size: 16px; color: $navy; margin: 28px 0 14px; }
  &__empty { color: $muted; font-size: 14px; }
  &__bar { display: flex; justify-content: flex-end; margin-top: 16px; }
}
.bgrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.bcard {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &__media {
    height: 150px;
    background: linear-gradient(120deg, $navy, $sky);
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
  }
  &__body {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    label { font-size: 11.5px; font-weight: 700; color: $navy; margin: 8px 0 5px; }
  }
  &__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
  }
}
.inp {
  width: 100%;
  padding: 8px 11px;
  border: 1px solid $line;
  border-radius: 8px;
  font: inherit;
  font-size: 13px;
  outline: none;
  resize: vertical;
  &:focus { border-color: $sky; }
}
.order { display: flex; gap: 5px; }
.acts { display: flex; gap: 6px; align-items: center; }
.ico {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #fff;
  cursor: pointer;
  color: $muted;
  font-size: 11px;
  &:hover:not(:disabled) { color: $navy; border-color: #b9cde0; }
  &:disabled { opacity: 0.4; cursor: default; }
  &.del:hover { color: #fff; background: $red; border-color: $red; }
}
.btn-save {
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  background: $navy;
  border: none;
  border-radius: 7px;
  padding: 8px 14px;
  cursor: pointer;
  &:hover { background: $navy-700; }
}
.btn-order {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: $sky;
  background: #e8f5fc;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  &:hover { background: #d8eefa; }
}

@media (max-width: 720px) {
  .bgrid { grid-template-columns: 1fr; }
}
</style>
