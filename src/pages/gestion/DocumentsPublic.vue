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
      <div
        class="col-12 col-md-4 mt-5"
        v-show="subCategoryOne.length > 0 && !loading"
      >
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
        <table class="table">
          <tr
            v-for="(item, index) in subCategoryOne"
            :key="index"
            class="subOne"
            :id="item._id"
          >
            <td v-if="item.enabled">
              <div
                @click="getSubCategoryTwo(item)"
                class="d-flex justify-content-between align-center subOne text-dark btn"
              >
                <h6>{{ item.name }}</h6>
                <font-awesome-icon
                  v-if="
                    subOne._id == item._id &&
                    subOneDoc.length == 0 &&
                    subCategoryTwo.length == 0
                  "
                  class="text-warning"
                  :icon="['fas', 'trash']"
                  @click="removeSubOne(item._id)"
                />
                <div class="d-flex justify-content-between">
                  <button
                    v-if="subOne._id == item._id"
                    @click="togglePublicItem(!item.isPublic, item._id)"
                  >
                    <font-awesome-icon
                      :class="item.isPublic ? 'text-white' : 'text-danger'"
                      :icon="['fas', 'globe']"
                    />
                  </button>
                  <button
                    @click="toggleInternItem(!item.isIntern, item._id)"
                    v-if="subOne._id == item._id"
                  >
                    <font-awesome-icon
                      :class="item.isIntern ? 'text-white' : 'text-danger'"
                      :icon="['fas', 'house']"
                    />
                  </button>
                </div>
              </div>
            </td>
            <td v-else>
              <div
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
            </td>
          </tr>
          <div class="d-flex" v-if="addSubOne">
            <input type="text" v-model="newSubOne.name" class="form-control" />
            <button
              class="btn btn-group btn-success"
              @click="addNewSubOne(subCategoryOne[0].idParent)"
            >
              Save
            </button>
          </div>
        </table>
      </div>
      <div
        class="col-12 col-md-8 mt-5"
        v-if="isSubOne && !loading && subOne.isPublic"
      >
        <button
          v-if="subOneDoc.length == 0"
          class="float-right btn btn-group btn-group btn-success"
          @click="addSubCategory2(subOne._id)"
        >
          creer sous-catégories
        </button>
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
      <div class="loading col-12 m-5" v-if="loading">
        <p class="spinner">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </p>
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
            <button
              class="nav-item subTwo nav-link"
              role="tab"
              @click="addSubTwo = !addSubTwo"
            >
              <font-awesome-icon v-if="!addSubTwo" :icon="['fas', 'plus']" />
              <font-awesome-icon
                v-if="addSubTwo"
                :icon="['fas', 'minus']"
                @click="
                  {
                    addSubTwo = !addSubTwo;
                    newSubTwo.name = '';
                  }
                "
              />
            </button>
          </div>
        </nav>
        <div class="col-12" v-if="subTwo !== ''">
          <div
            v-if="!loading && !addSubTwo"
            class="d-flex float-right justify-content-between"
          >
            <button v-if="subTwo.enabled">
              <font-awesome-icon
                class="text-warning mr-2"
                :icon="['fas', 'trash']"
                @click="removeSubTwo(subTwo._id)"
              />
            </button>
            <button v-if="!subTwo.enabled">
              <font-awesome-icon
                class="text-success mr-2"
                :icon="['fas', 'trash-restore']"
                @click="retrieveSubTwo(subTwo._id)"
              />
            </button>
            <button v-if="!subTwo.enabled">
              <font-awesome-icon
                class="text-danger"
                :icon="['fas', 'trash']"
                @click="eraseSubTwo(subTwo._id)"
              />
            </button>
            <div class="d-flex justify-content-between">
                  <button
                    @click="togglePublicItem(!subTwo.isPublic, subTwo._id)"
                  >
                    <font-awesome-icon
                      :class="subTwo.isPublic ? 'text-success' : 'text-danger'"
                      :icon="['fas', 'globe']"
                    />
                  </button>
                  <button
                    @click="toggleInternItem(!subTwo.isIntern, subTwo._id)"
                  >
                    <font-awesome-icon
                      :class="subTwo.isIntern ? 'text-success' : 'text-danger'"
                      :icon="['fas', 'house']"
                    />
                  </button>
                </div>
          </div>
          <div v-if="subTwo.enabled && !loading && !addSubTwo">
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

          <div class="loading col-12 m-5" v-if="loading">
            <p class="spinner">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </p>
          </div>
        </div>
        <div class="col-12">
          <div v-if="addSubTwo" class="mt-5">
            <h4>Enregistrer une sous catégorie</h4>
            <div class="col-3 d-flex justify-content-between mt-5 mb-10">
              <input
                v-model="newSubTwo.name"
                type="text"
                class="form-control"
              />
              <button
                class="btn btn-group btn-primary"
                @click="addNewSubCategory2Field(subOne._id)"
              >
                Enregistrer
              </button>
            </div>
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
      addSubTwo:false,
      newSubOne: {
        idParent: "",
        enabled: true,
        isIntern: false,
        isPublic: true,
        _id: "",
        name: "",
      },
      newSubTwo: {
        idParent: "",
        enabled: true,
        isIntern: false,
        isPublic: true,
        _id: "",
        name: "",
      },
    };
  },
  methods: {
    // async addPublic(isPublic){  fonction pour ajouter les parametre isPublic et isIntern
    //   await categoryService.addPublicIntern(isPublic);
    // },
    async getSubCategoryOne(item) {
      this.subCategoryOne = [];
      this.subCategoryTwo = [];
      this.subOneDoc = [];
      this.isSubOne = false;
      this.category = item;
      this.subOne = "";
      this.subTwo = "";

      await this.allsubCategoryOne.forEach((element) => {
        if (element.idParent === item._id) {
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
      if (this.addSubTwo) {
        this.addSubTwo = !this.addSubTwo;
      }
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
      this.loading = true;

      this.newSubOne.idParent = idParent;
      await categoryService.addSubCategoryToCategory(this.newSubOne);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      await this.getSubCategoryOne(this.category);
      this.newSubOne.name = "";
      this.addSubOne = false;
      this.loading = false;
    },
    async removeSubOne(id) {
      this.loading = true;

      await categoryService.removeSubCategoryOne(id);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      await this.getSubCategoryOne(this.category);
      this.loading = false;
    },
    async retrieveSubOne(id) {
      this.loading = true;

      await categoryService.retrieveSubCategoryOne(id);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      await this.getSubCategoryOne(this.category);
      this.loading = false;
    },
    async eraseSubOne(id) {
      this.loading = true;

      await categoryService.eraseSubCategoryOne(id);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      await this.getSubCategoryOne(this.category);
      this.loading = false;
    },
    async addSubCategory2(idParent) {
      this.loading = true;
      await categoryService.addSubCategoryTwo(idParent);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      this.getSubCategoryTwo(this.subOne);
      this.loading = false;
    },
    async addNewSubCategory2Field(idParent) {
      this.loading = true;

      this.newSubTwo.idParent = idParent;
      await categoryService.addNewSubCategoryTwoField(this.newSubTwo);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      this.getSubCategoryTwo(this.subOne);
      this.newSubTwo.name = "";
      this.loading = false;
    },
    async removeSubTwo(id) {
      this.loading = true;

      await categoryService.removeSubCategoryTwo(id);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      this.getSubCategoryTwo(this.subOne);
      this.loading = false;
    },
    async retrieveSubTwo(id) {
      this.loading = true;

      await categoryService.retrieveSubCategoryTwo(id);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      this.getSubCategoryTwo(this.subOne);
      this.loading = false;
    },
    async eraseSubTwo(id) {
      this.loading = true;

      await categoryService.eraseSubCategoryTwo(id);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      this.getSubCategoryTwo(this.subOne);
      this.loading = false;
    },
    async toggleInternItem(data, id) {
      this.loading = true;

      await categoryService.toggleInternItem(data, id);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      await this.getSubCategoryTwo(this.subOne);
      await this.getSubCategoryOne(this.category);

      this.loading = false;
    },
    async togglePublicItem(data, id) {
      this.loading = true;

      await categoryService.togglePublicItem(data, id);
      await this.$store.dispatch("fetchCategory");
      await this.$store.dispatch("fetchSubCategoryOne");
      await this.$store.dispatch("fetchSubCategoryTwo");
      await this.getSubCategoryOne(this.category);

      await this.getSubCategoryTwo(this.subOne);
      this.loading = false;
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
.subOne {
  border: none;
}
</style>
