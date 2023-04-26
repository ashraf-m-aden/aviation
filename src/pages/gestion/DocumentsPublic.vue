<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-12">
        <h1>Liste des documents publiques</h1>
      </div>

      <!-- Categories -->
      <div class="col-12">
        <strong>Categories:</strong>
        <v-radio-group inline>
          <v-radio
            @change="getSubCategoryOne(category)"
            v-for="(category, index) in categories"
            :key="index"
            :label="category.name"
            :value="category._id"
          ></v-radio>
        </v-radio-group>
      </div>
    </div>

    <!-- Sous categories 1 -->
    <div class="row mt-5">
      <div class="col-12 col-md-4 mt-5" v-show="subCategoryOne.length > 0">
        <div class="d-flex justify-content-between mb-5">
          <strong>Sous-Categories de niveau 1:</strong>
          <button>
            <font-awesome-icon
              v-if="!addSubOne"
              :icon="['fas', 'plus']"
              @click="addSubOne = !addSubOne"
            />
            <font-awesome-icon
              v-if="addSubOne"
              :icon="['fas', 'minus']"
              @click="
                {
                  addSubOne = !addSubOne;
                  newSubOne.name = '';
                }
              "
            />
          </button>
        </div>
        <div
          class="nav flex-column nav-pills"
          role="tablist"
          aria-orientation="vertical"
        >
          <div class="" v-for="(item, index) in subCategoryOne" :key="index">
            <div
              v-if="item.enabled"
              class="nav-link d-flex justify-content-between align-center border-bottom subOne text-dark btn-group btn-outline-info"
            >
              <a :id="item._id" role="tab" @click="getSubCategoryTwo(item)">{{
                item.name
              }}</a>
              <font-awesome-icon
                class="text-warning"
                :icon="['fas', 'trash']"
                @click="removeSubOne(item._id)"
              />
            </div>
            <div
              v-else
              class="nav-link d-flex justify-content-between align-center border-bottom text-secondary btn-group btn-outline-info"
            >
              <a :id="item._id" role="tab">{{ item.name }}</a>
              <font-awesome-icon
                class="text-success"
                :icon="['fas', 'trash-restore']"
                @click="retrieveSubOne(item._id)"
              />
              <font-awesome-icon
                class="text-danger"
                :icon="['fas', 'trash']"
                @click="eraseSubOne(item._id)"
              />
            </div>
          </div>
          <div class="d-flex" v-if="addSubOne">
            <input type="text" v-model="newSubOne.name" class="form-control" />
            <button
              class="btn btn-group btn-success"
              @click="addNewSubOne(subCategoryOne[0].idParent)"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 mt-5" v-if="isSubOne">
        <FirebaseUpload
          class="mt-2 mb-5"
          :isPublicDocumentS1="true"
          :category="category"
          :subOne="subOne"
          @uploaded="uploaded"
        ></FirebaseUpload>
        <div class="float-right">
          <button
            v-if="!actual && !loading"
            class="btn small btn-group btn-outline-info"
            @click="actualiser(subOne, 1)"
          >
            Actualiser
          </button>
          <button
            v-if="actual"
            class="btn disabled small btn-group btn-outline-info"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </button>
        </div>
        <table class="table" v-if="!actual && !loading">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fichier</th>
              <th scope="col">Nom</th>
              <th scope="col">Suspendre</th>
              <th scope="col">Re-Publier</th>
              <th scope="col">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(doc, index) in subOneDoc" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <a :href="doc.src" target="_blank">
                  <img
                    src="../../assets/pdf.png"
                    class="img-fluid"
                    width="30"
                    alt=""
                  />
                </a>
              </td>
              <td>{{ doc.name }}</td>
              <td>
                <button
                  @click="disableDocument(subOne, 1, doc._id)"
                  class="btn btn-group btn-outline-warning"
                  :disabled="!doc.enabled"
                >
                  <v-icon size="small" color="yellow-darken-2">
                    mdi-eye-off-outline</v-icon
                  >
                </button>
              </td>
              <td>
                <button
                  @click="enableDocument(subOne, 1, doc._id)"
                  class="btn btn-group btn-outline-success"
                  :disabled="doc.enabled"
                >
                  <v-icon size="small" color="green-darken-2">
                    mdi-eye-outline</v-icon
                  >
                </button>
              </td>
              <td>
                <button
                  @click="deleteDocument(subOne, 1, doc)"
                  class="btn btn-group btn-outline-danger"
                >
                  <v-icon size="small" color="red-darken-2">
                    mdi-delete
                  </v-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="loading" v-if="loading">
          <p class="spinner">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </p>
        </div>
      </div>
    </div>
    <!-- Sous categories 2 -->

    <div class="row">
      <div class="col-12 mt-5" v-show="subCategoryTwo.length > 0">
        <strong>Sous-Categories de niveau 2:</strong>

        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              v-for="(subTwo, index) in subCategoryTwo"
              :key="index"
              :id="subTwo._id"
              @click="getSubTwoName(subTwo)"
              class="nav-item subTwo nav-link"
              role="tab"
              :aria-controls="subTwo.name"
              aria-selected="false"
            >
              {{ subTwo.name }}</a
            >
          </div>
        </nav>
        <div class="" v-if="subTwo !== ''">
          <FirebaseUpload
            class="mt-2 mb-5"
            :isPublicDocumentS2="true"
            :category="category"
            :subOne="subOne"
            :subTwo="subTwo"
            @uploaded="uploaded"
          ></FirebaseUpload>
          <div class="float-right">
            <button
              v-if="!actual2 && !loading2"
              class="btn small btn-group btn-outline-info"
              @click="actualiser(subTwo, 2)"
            >
              Actualiser
            </button>
            <button
              v-if="actual2 && !loading2"
              class="btn disabled small btn-group btn-outline-info"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </button>
          </div>
          <table class="table mb-5" v-if="!actual2 && !loading2">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fichier</th>
                <th scope="col" class="w-50">Nom</th>
                <th scope="col" class="small">Suspendre</th>
                <th scope="col" class="small">Re-Publier</th>
                <th scope="col" class="small">Supprimer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(doc, index) in subTwoDoc" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <a :href="doc.src" target="_blank">
                    <img
                      src="../../assets/pdf.png"
                      class="img-fluid"
                      width="30"
                      alt=""
                    />
                  </a>
                </td>
                <td>{{ doc.name }}</td>
                <td>
                  <button
                    @click="disableDocument(subTwo, 2, doc._id)"
                    class="btn btn-group btn-outline-warning"
                    :disabled="!doc.enabled"
                  >
                    <v-icon icon="md:eye_off"></v-icon>
                  </button>
                </td>
                <td>
                  <button
                    @click="enableDocument(subTwo, 2, doc._id)"
                    class="btn btn-group btn-outline-success"
                    :disabled="doc.enabled"
                  >
                    <v-icon icon="md:eye"></v-icon>
                  </button>
                </td>
                <td>
                  <button
                    @click="deleteDocument(subTwo, 2, doc)"
                    class="btn btn-group btn-outline-danger"
                  >
                    <v-icon size="small" color="red-darken-2">
                      mdi-delete
                    </v-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="loading" v-if="loading2">
            <p class="spinner">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import documentService from "../../services/document.service";
import FirebaseUpload from "../../components/FirebaseUpload.vue";
import $ from "jquery";
import { storage } from "../../firebaseConfig.js";
import categoryService from "@/services/category.service";
export default {
  metaInfo() {
    // if no subcomponents specify a metaInfo.title, this title will be used
    return {
      meta: [
        {
          name: "robots",
          content: "noindex",
        },
        {
          name: "googlebot",
          content: "noindex",
        },
      ],
    };
  },
  components: {
    FirebaseUpload,
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
      newSubOne: {
        idParent: "",
        enabled: true,
        _id: "",
        name: "",
      },
    };
  },
  methods: {
    async getSubCategoryOne(item) {
      this.subCategoryOne = [];
      this.subCategoryTwo = [];
      this.subOneDoc = [];
      this.isSubOne = false;
      this.category = item;
      this.subOne = "";
      this.subTwo = "";

      await this.allsubCategoryOne.forEach((element) => {
        if (
          element.idParent === item._id &&
          element._id !== "6035f340a713263cf8a98c55" &&
          element._id !== "6035f357a713263cf8a98c58"
        ) {
          this.subCategoryOne.push(element);
        }
      });
    },
    getSubCategoryTwo(item) {
      $(".subOne").removeClass("bg-info text-light").addClass("text-dark");
      $("#" + item._id)
        .addClass("bg-info text-light")
        .removeClass("text-dark");
      this.getSubOneDoc(item);
      this.subOne = item;
      this.subTwo = "";
      this.subCategoryTwo = [];
      this.allsubCategoryTwo.forEach((element) => {
        if (
          element.idParent === item._id &&
          element.name !== "Reglementation aéronautique de Djibouti"
        ) {
          this.subCategoryTwo.push(element);
        }
      });
      if (this.subCategoryTwo.length > 0) {
        this.isSubOne = false;
      } else {
        this.isSubOne = true;
      }
      this.actual = false;
    },
    async getSubTwoName(item) {
      $(".subTwo").removeClass("active border-danger");
      $("#" + item._id).addClass("active border-danger");
      this.subTwo = item;
      this.subTwoDoc = [];

      await this.allDocuments.forEach((element) => {
        if (element.idParent === this.subTwo._id) {
          this.subTwoDoc.push(element);
        }
      });
      this.actual2 = false;
    },
    async getSubOneDoc(item) {
      this.subOne = item;
      this.subOneDoc = [];

      await this.allDocuments.forEach((element) => {
        if (element.idParent === this.subOne._id) {
          this.subOneDoc.push(element);
        }
      });
    },
    async disableDocument(sub, number, id) {
      if (number == 1) {
        this.loading = true;
      } else {
        this.loading2 = true;
      }
      await this.$store.dispatch("disableOneDocument", id);
      await this.actualiser(sub, number);
      this.loading = false;
      this.loading2 = false;
    },
    async enableDocument(sub, number, id) {
      if (number == 1) {
        this.loading = true;
      } else {
        this.loading2 = true;
      }
      await this.$store.dispatch("enableOneDocument", id);
      await this.actualiser(sub, number);
      this.loading = false;
      this.loading2 = false;
    },
    deleteDocument(sub, number, item) {
      if (number == 1) {
        this.loading = true;
      } else {
        this.loading2 = true;
      }
      // Create a reference to the file to delete
      var desertRef = storage.ref(item.ref);

      // Delete the file
      desertRef
        .delete()
        .then(async () => {
          // File deleted successfully
          this.$store.dispatch("deleteOneDocument", item._id);
          await this.$store.dispatch("setPublicDocuments");
          await this.actualiser(sub, number);
          this.loading = false;
          this.loading2 = false;
        })
        .catch(function () {
          // Uh-oh, an error occurred!
          console.log(item);
          this.loading = false;
          this.loading2 = false;
        });
    },
    uploaded(value) {
      this.actualiser(value[0], value[1]);
    },
    async actualiser(item, number) {
      if (number == 1) {
        this.actual = true;
        await this.$store.dispatch("setDocuments");
        this.getSubCategoryTwo(item);
      } else {
        this.actual2 = true;
        await this.$store.dispatch("setDocuments");

        this.getSubTwoName(item);
      }
    },
    async addNewSubOne(idParent) {
      this.newSubOne.idParent = idParent;
      await categoryService.addSubCategoryToCategory(this.newSubOne);
      this.$store.dispatch("fetchCategory");
      this.$store.dispatch("fetchSubCategoryOne");
      this.$store.dispatch("fetchSubCategoryTwo");
      this.newSubOne.name = "";
      this.addSubOne = false;
    },
    async removeSubOne(id) {
      await categoryService.removeSubCategoryToCategory(id);
      this.$store.dispatch("fetchCategory");
      this.$store.dispatch("fetchSubCategoryOne");
      this.$store.dispatch("fetchSubCategoryTwo");
    },
    async retrieveSubOne(id) {
      await categoryService.retrieveSubCategoryToCategory(id);
      this.$store.dispatch("fetchCategory");
      this.$store.dispatch("fetchSubCategoryOne");
      this.$store.dispatch("fetchSubCategoryTwo");
    },
    async eraseSubOne(id) {
      await categoryService.eraseSubCategoryToCategory(id);
      this.$store.dispatch("fetchCategory");
      this.$store.dispatch("fetchSubCategoryOne");
      this.$store.dispatch("fetchSubCategoryTwo");
    },
  },
  computed: {
    allDocuments() {
      let docs = this.$store.state.documents.documents.filter((docs) => {
        return !docs.isIntern;
      });
      return docs;
    },
    categories() {
      let categories = this.$store.state.category.category.filter((cat) => {
        return cat.name !== "A propos de nous" && cat.name !== "e-Services";
      });
      return categories;
    },
    allsubCategoryOne() {
      return this.$store.state.category.subCategoryOne;
    },
    allsubCategoryTwo() {
      return this.$store.state.category.subCategoryTwo;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../sass/main.scss";
.loading {
  width: 100%;
  height: 100%;
  background: rgb(102, 146, 160);
  z-index: 999;
}
.col-12 {
  position: relative;
}

.actual {
  width: 100%;
  height: 100vh;
  background: rgb(102, 146, 160);
  z-index: 999;
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
