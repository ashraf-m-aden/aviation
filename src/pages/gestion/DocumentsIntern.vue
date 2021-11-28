<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-12">
        <h1>Liste des documents en interne</h1>
      </div>
      <div class="col-12">
        <strong>Categories:</strong>
        <b-form-radio-group id="radio-group-1" name="radio-options">
          <b-form-radio
            @change="getSubCategoryOne(category)"
            v-for="(category, index) in categories"
            :key="index"
            :value="category._id"
            >{{ category.name }}</b-form-radio
          >
        </b-form-radio-group>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 col-md-4 mt-5" v-show="subCategoryOne.length > 0">
        <strong>Sous-Categories de niveau 1:</strong>

        <div
          class="nav flex-column nav-pills"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            class="nav-link subOne text-dark btn-group btn-outline-info"
            :id="item._id"
            role="tab"
            @click="getSubCategoryTwo(item)"
            v-for="(item, index) in subCategoryOne"
            :key="index"
            >{{ item.name }}</a
          >
        </div>
      </div>
      <div class="col-12 col-md-8 mt-5" v-if="isSubOne">
        <FirebaseUpload
          class=" mt-2 mb-5"
          :isPrivateDocument1="true"
          :category="category"
          :subOne="subOne"
        ></FirebaseUpload>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fichier</th>
              <th scope="col">Nom</th>
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
                  @click="deleteDocument(doc)"
                  class="btn btn-group btn-outline-danger"
                >
                  <md-icon>delete</md-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
            class=" mt-2 mb-5"
            :isPrivateDocument2="true"
            :category="category"
            :subOne="subOne"
            :subTwo="subTwo"
          ></FirebaseUpload>

          <table class="table mb-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fichier</th>
                <th scope="col" class="w-50">Nom</th>
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
                    @click="deleteDocument(doc)"
                    class="btn btn-group btn-outline-danger"
                  >
                    <md-icon>delete</md-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import documentService from "../../services/document.service";
import FirebaseUpload from "../../components/FirebaseUpload";
import $ from "jquery";
const firebase = require("../../firebaseConfig.js");

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
    };
  },
  methods: {
    async getSubCategoryOne(item) {
      this.subCategoryOne = [];
      this.subCategoryTwo = [];
      this.subOneDoc = [];
      this.category = item;
      this.subOne = "";
      this.subTwo = "";
      this.isSubOne = false;

      await this.allsubCategoryOne.forEach((element) => {
        if (element.idParent === item._id) {
          this.subCategoryOne.push(element);
        }
      });
    },
    getSubCategoryTwo(item) {
      $(".subOne")
        .removeClass("bg-info text-light")
        .addClass("text-dark");
      $("#" + item._id)
        .addClass("bg-info text-light")
        .removeClass("text-dark");
      this.subOne = item;
      this.subTwo = "";
       this.subOneDoc= [];
      this.subCategoryTwo = [];
      this.allsubCategoryTwo.forEach((element) => {
        if (
          element.idParent === item._id &&
          element.name !== "Reglementation aéronautique de Djibouti"
        ) {
          this.subCategoryTwo.push(element);
        }
      });
      this.allDocuments.forEach((element) => {
        if (element.idParent === item._id) {
          this.subOneDoc.push(element);
        }
      });
      if (this.subCategoryTwo.length > 0) {
        this.isSubOne = false;
      } else {
        this.isSubOne = true;
      }
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
    },
    disableDocument(id) {
      this.$store.dispatch("disableOneDocument", id);
    },
    enableDocument(id) {
      this.$store.dispatch("enableOneDocument", id);
    },
    deleteDocument(item) {
      // Create a reference to the file to delete
      var desertRef = firebase.storage().ref(item.ref);

      // Delete the file
      desertRef
        .delete()
        .then(() => {
          // File deleted successfully
          this.$store.dispatch("deleteOneDocument", item._id);
        })
        .catch(function () {
          // Uh-oh, an error occurred!
          console.log(item);
        });
    },
  },
  computed: {
    allDocuments() {
      let docs = this.$store.state.documents.documents.filter((docs) => {
        return docs.isIntern;
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
