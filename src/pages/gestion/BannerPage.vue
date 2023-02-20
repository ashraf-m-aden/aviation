<template>
  <div class="container">
    <div class="row loading" v-if="loading">
      <p class="spinner">
        Suppresion
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </p>
    </div>
    <div class="row" v-else>
      <div class="col-6">
        <FirebaseUpload :isBanner="bannier"></FirebaseUpload>
      </div>
      <div class="col-12 mt-5">
        <h2>Mes bannieres</h2>
        <table class="table table-bordered" v-if="banniere.length > 0">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Titre</th>
              <th scope="col">Description</th>
              <th scope="col">Position</th>
              <th scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(banner, index) in banniere" :key="index">
              <td scope="row"><img width="150" :src="banner.url" /></td>
              <td><input type="text" :value="banner.title" /></td>
              <td>
                <textarea
                  name=""
                  id=""
                  :value="banner.description"
                  cols="15"
                  rows="3"
                ></textarea>
              </td>
              <td>
                <div class="div-icon">
                  <v-icon @click="top(index)" class="icon icon-up">
                    mdi-chevron-up
                  </v-icon>
                  <v-icon @click="down(index)" class="icon icon-down">
                    mdi-chevron-down
                  </v-icon>
                </div>
              </td>
              <td>
                <button
                  @click="deleteBanner(banner)"
                  class="btn btn-group btn-outline-success"
                >
                  <v-icon icon="md:delete"></v-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <v-btn small class="saveButton" @click="save"> Enregistrer </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import FirebaseUpload from "../../components/FirebaseUpload.vue";
import * as firebase from "../../firebaseConfig.js";
export default {
  components: {
    FirebaseUpload,
  },
  data() {
    return {
      bannier: true,
      loading: false,
    };
  },
  mounted() {},
  computed: {
    banniere() {
      return this.$store.state.media.banner;
    },
  },
  methods: {
    deleteBanner(item) {
      this.loading = true;
      // Create a reference to the file to delete
      var desertRef = firebase.storage().ref(item.ref);
      try {
        // Delete the file
        desertRef.delete();
        // File deleted successfully

        this.$store.dispatch("deleteOneBanner", item._id);
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      } catch (error) {
        this.$store.dispatch("deleteOneBanner", item._id);
        this.loading = false;
      }
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
};
</script>
<style lang="scss" scoped>
@import "../../sass/main.scss";
.loading {
  width: 100%;
  height: 100vh;
  background: rgb(102, 146, 160);
}
.spinner {
  @include centerElement;
}

.div-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .icon {
    cursor: pointer;
    &:hover {
      transform: scale(1.5);
    }
    font-size: 2rem;
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
  font-size: 0.1rem;
  float: right;
}
</style>
