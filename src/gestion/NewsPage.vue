<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-8">
        <DriveUpload :isNews="true" />
      </div>

      <div class="col-12 mt-5">
        <h2 class="h2">Les articles</h2>
        <table class="table table-bordered" v-if="allNews.length > 0">
          <thead class="thead-dark">
            <tr>
              <th>Image</th>
              <th>Titre</th>
              <th>Contenu</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in allNews" :key="article._id || index">
              <td><img width="80" :src="imageSrc(article)" @error="onImgError($event, article)" /></td>
              <td><input type="text" v-model="article.title" /></td>
              <td>
                <QuillEditor
                  :content="article.content"
                  content-type="html"
                  theme="snow"
                  @update:content="(v) => (article.content = v)"
                />
              </td>
              <td>
                <div class="div-icon">
                  <v-icon @click="top(index)" class="icon icon-up">mdi-chevron-up</v-icon>
                  <v-icon @click="down(index)" class="icon icon-down">mdi-chevron-down</v-icon>
                </div>
              </td>
              <td>
                <button @click="modify(article)" class="btn btn-sm btn-outline-success me-1">Modifier</button>
                <button @click="deleteArticle(article)" class="btn btn-sm btn-outline-danger">
                  <v-icon size="small">mdi-delete</v-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <v-btn small class="saveButton" @click="save">Enregistrer l'ordre</v-btn>
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
    allNews() {
      return this.$store.state.media.allNews;
    },
  },
  methods: {
    imageSrc(item) {
      return item.driveId ? driveImageUrl(item.driveId, 300) : item.url || "";
    },
    onImgError(e, item) {
      if (item.driveId) {
        const fb = driveThumbUrl(item.driveId, 300);
        if (e.target.src !== fb) e.target.src = fb;
      }
    },
    modify(article) {
      this.$store.dispatch("modifyNews", article);
    },
    deleteArticle(item) {
      this.$store.dispatch("deleteOneNews", item._id);
    },
    top(index) {
      this.$store.dispatch("topNews", index);
    },
    down(index) {
      this.$store.dispatch("downNews", index);
    },
    save() {
      this.$store.dispatch("saveNewNews");
    },
  },
  created() {
    this.$store.dispatch("getNews");
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
