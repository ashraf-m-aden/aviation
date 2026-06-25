<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-6">
        <DriveUpload :isBanner="true" />
      </div>

      <div class="col-12 mt-5">
        <h2>Mes bannières</h2>
        <table class="table table-bordered" v-if="banniere.length > 0">
          <thead class="thead-dark">
            <tr>
              <th>Image</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(banner, index) in banniere" :key="banner._id || index">
              <td><img width="150" :src="imageSrc(banner)" @error="onImgError($event, banner)" /></td>
              <td><input type="text" v-model="banner.title" /></td>
              <td><textarea cols="15" rows="3" v-model="banner.description"></textarea></td>
              <td>
                <div class="div-icon">
                  <v-icon @click="top(index)" class="icon icon-up">mdi-chevron-up</v-icon>
                  <v-icon @click="down(index)" class="icon icon-down">mdi-chevron-down</v-icon>
                </div>
              </td>
              <td>
                <button @click="modify(banner)" class="btn btn-sm btn-outline-success me-1">Modifier</button>
                <button @click="deleteBanner(banner)" class="btn btn-sm btn-outline-danger">
                  <v-icon size="small">mdi-delete</v-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <v-btn class="saveButton" @click="save">Enregistrer l'ordre</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import DriveUpload from "../../components/DriveUpload.vue";
import { driveImageUrl, driveThumbUrl } from "@/utils/drive";

export default {
  components: { DriveUpload },
  computed: {
    banniere() {
      return this.$store.state.media.banner;
    },
  },
  methods: {
    // nouvelle donnée = driveId ; ancienne = url Storage (compat le temps de la bascule)
    imageSrc(item) {
      return item.driveId ? driveImageUrl(item.driveId, 300) : item.url || "";
    },
    onImgError(e, item) {
      if (item.driveId) {
        const fb = driveThumbUrl(item.driveId, 300);
        if (e.target.src !== fb) e.target.src = fb;
      }
    },
    modify(banner) {
      this.$store.dispatch("modifyBanner", banner);
    },
    deleteBanner(item) {
      // plus de suppression Storage : le fichier vit sur Drive
      this.$store.dispatch("deleteOneBanner", item._id);
    },
    top(index) {
      this.$store.dispatch("topBanner", index);
    },
    down(index) {
      this.$store.dispatch("downBanner", index);
    },
    save() {
      this.$store.dispatch("saveNewBanner");
    },
  },
  created() {
    this.$store.dispatch("getBanners");
  },
};
</script>

<style lang="scss" scoped>
.div-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .icon {
    cursor: pointer;
    font-size: 2rem;
    &:hover {
      transform: scale(1.5);
    }
    &-down {
      color: #ff1744;
    }
    &-up {
      color: #009688;
    }
  }
}
.saveButton {
  color: #009688;
  float: right;
}
</style>
