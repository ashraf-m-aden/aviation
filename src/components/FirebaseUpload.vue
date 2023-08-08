<template>
  <div class="container m-5" >
    <div class="row">
      <div class="col-12">
        <div class="d-flex flex-column mb-5">
          <h2>{{ message }}</h2>
          <input
            v-show="!isBanner && !isNews"
            class="input"
            type="text"
            placeholder="Nom du document"
            v-model="document.name"
            readonly
          />

          <div v-if="isBanner" class="d-flex flex-column">
            <label>Titre: </label
            ><input class="input form-control" type="text" v-model="banner.title" />
            <label>Description: </label
            ><input class="input form-control" type="text" v-model="banner.description" />
          </div>
          <div v-if="isNews" class="d-flex flex-column">
            <h4>Titre: </h4>
            <input class="input form-control" type="text" v-model="news.title" />
            <h4>Contenu: </h4>
            <!-- <textarea rows="10" cols="100" class="border mb-5" type="text" v-model="news.content" /> -->
            <div class="editor">
              <quill-editor theme="snow" toolbar="full" v-model="news.content" class="editor"></quill-editor>

            </div>
          </div>

          <input
            type="file"
            v-show="!isBanner && !isNews"
            id="inputContent"
            @change="previewImage"
            accept=".json,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <input
            type="file"
            v-show="isBanner || isNews"
            id="inputContent"
            @change="previewImage"
            accept="image/*"
          />
        </div>
        <div class="col-12" v-if="imageData != null">
          <img class="preview" :src="picture" />
          <br />
          <button class="btn btn-group btn-outline-danger" v-show="errorButton">
            Re-essayer
          </button>
          <button
            v-if="!loading && !errorButton"
            class="btn small btn-group btn-outline-success"
            @click="onUpload"
          >
            Charger
          </button>
          <button
            v-if="loading && !errorButton"
            class="btn disabled small btn-group btn-outline-success"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </button>
        </div>

        <div class="col-12" v-if="documentData != null">
          <img class="preview" :src="picture" />
          <br />
          <button
            v-if="!loading && document.name"
            @click="onUpload"
            class="btn small btn-group btn-outline-success"
          >
            Charger
          </button>
          <button
            v-if="loading"
            class="btn disabled small btn-group btn-outline-success"
          >
            <!-- <md-progress-spinner
              :md-diameter="20"
              :md-stroke="3"
              md-mode="indeterminate"
            ></md-progress-spinner> -->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from "../firebaseConfig.js";
import $ from "jquery";
export default {
  name: "FirebaseUpload",
  props: [
    "isBanner",
    "isPublicDocumentS1",
    "isPublicDocumentS2",
    "category",
    "subOne",
    "subTwo",
    "isPrivateDocument1",
    "isPrivateDocument2",
    "isNews",
  ],
  data() {
    return {
      extension: "",
      document: {
        src: "",
        idParent: "",
        name: "",
        ref: "",
        createdAt: new Date(),
        enabled: true,
        isIntern: false,
      },
      banner: {
        title: "",
        description: "",
        url: "",
        ref: "",
        createdAt: new Date(),
      },
      news: {
        title: "",
        url: "",
        ref: "",
        content: "",
        createdAt: new Date(),
      },
      imageData: null,
      documentData: null,
      picture: [],
      uploadValue: 0,
      loading: false,
      errorButton: false,
    };
  },
  computed: {
    message() {
      if (
        this.isPublicDocumentS1 ||
        this.isPublicDocumentS2 ||
        this.isPrivateDocument1 ||
        this.isPrivateDocument2
      ) {
        return "Enregistrer un document";
      }
      if (this.isNews) {
        return "Enregistrer un nouvel article";
      }
      return "Enregistrer une banniere";
    },
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      //this.picture = null;
      if (this.isNews || this.isBanner) {
        this.imageData = event.target.files[0];
        this.extension = event.target.files[0].name.split(".").pop();
      } else {
        this.documentData = event.target.files[0];
        this.document.name = event.target.files[0].name.split(".").shift();
        this.extension = event.target.files[0].name.split(".").pop();
      }
    },
    onUpload() {
      if (this.isPublicDocumentS1) {
        this.loading = true;
        this.errorButton = false;
        const storageRef = storage
          .ref(
            this.category.name +
              "/" +
              this.subOne.name +
              "/" +
              this.document.name +
              "." +
              this.extension
          )
          .put(this.documentData);
        storageRef.on(
          "state_changed",
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
            this.loading = false;
          },
          () => {
            storageRef.snapshot.ref
              .getDownloadURL()
              .then(async (url) => {
                this.document.src = url;
                this.document.createdAt = new Date();
                this.document.idParent = this.subOne._id;
                this.document.ref =
                  this.category.name +
                  "/" +
                  this.subOne.name +
                  "/" +
                  this.document.name +
                  "." +
                  this.extension;
                await this.$store
                  .dispatch("addDocument", this.document)
                  .then(() => {
                    this.loading = false;
                    this.document = {};
                    $("#inputContent").val("");
                    this.$store.dispatch("setDocuments");
                    this.$store.dispatch("setPublicDocuments");
                    this.$emit("uploaded", [this.subOne, 1]);
                  })
                  .catch((error) => {
                    console.log(error);
                    this.loading = false;
                  });
              })
              .catch(() => {
                this.loading = false;
                this.errorButton = true;
              });
          }
        );
      }
      if (this.isPublicDocumentS2) {
        this.loading = true;
        this.errorButton = false;
        const storageRef = storage
          .ref(
            this.category.name +
              "/" +
              this.subOne.name +
              "/" +
              this.subTwo.name +
              "/" +
              this.document.name +
              "." +
              this.extension
          )
          .put(this.documentData);
        storageRef.on(
          "state_changed",
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
            this.loading = false;
          },
          () => {
            storageRef.snapshot.ref
              .getDownloadURL()
              .then(async (url) => {
                this.document.src = url;
                this.document.createdAt = new Date();

                this.document.idParent = this.subTwo._id;
                this.document.ref =
                  this.category.name +
                  "/" +
                  this.subOne.name +
                  "/" +
                  this.subTwo.name +
                  "/" +
                  this.document.name +
                  "." +
                  this.extension;
                await this.$store
                  .dispatch("addDocument", this.document)
                  .then(() => {
                    this.loading = false;
                    this.document = {};
                    $("#inputContent").val("");
                    this.$store.dispatch("setDocuments");
                    this.$store.dispatch("setPublicDocuments");
                    this.$emit("uploaded", [this.subTwo, 2]);
                  })
                  .catch((error) => {
                    console.log(error);
                    this.loading = false;
                  });
              })
              .catch(() => {
                this.loading = false;
                this.errorButton = true;
              });
          }
        );
      }
      if (this.isPrivateDocument1) {
        let document = {
          name: this.document.name,
          src: "",
          ref: "",
          isIntern: true,
          createdAt: new Date(),
        };
        this.loading = true;
        this.errorButton = false;
        const storageRef = storage
          .ref(
            "document internes/" +
              this.category.name +
              "/" +
              this.subOne.name +
              "/" +
              this.document.name +
              "." +
              this.extension
          )
          .put(this.documentData);
        storageRef.on(
          "state_changed",
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
            this.loading = false;
          },
          () => {
            storageRef.snapshot.ref
              .getDownloadURL()
              .then(async (url) => {
                document.src = url;
                document.isIntern = true;
                document.enabled = true;
                document.idParent = this.subOne._id;
                document.ref =
                  "document internes/" +
                  this.category.name +
                  "/" +
                  this.subOne.name +
                  "/" +
                  this.document.name +
                  "." +
                  this.extension;

                await this.$store
                  .dispatch("addDocument", document)
                  .then(async () => {
                    this.loading = false;
                    this.document = {};
                    $("#inputContent").val("");
                    await this.$store.dispatch("setDocuments");
                    this.$emit("uploaded", [this.subOne, 1]);
                  })
                  .catch((error) => {
                    console.log(error);
                    this.loading = false;
                  });
                this.picture.push(url);
                //this.$store.dispatch("setPicture", this.picture);
              })
              .catch(() => {
                this.loading = false;
                this.errorButton = true;
              });
          }
        );
      }
      if (this.isPrivateDocument2) {
        let document = {
          name: this.document.name,
          src: "",
          ref: "",
          isIntern: true,
          createdAt: new Date(),
        };
        this.loading = true;
        this.errorButton = false;
        const storageRef = storage
          .ref(
            "document internes/" +
              this.category.name +
              "/" +
              this.subOne.name +
              "/" +
              this.subTwo.name +
              "/" +
              this.document.name +
              "." +
              this.extension
          )
          .put(this.documentData);
        storageRef.on(
          "state_changed",
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
            this.loading = false;
          },
          () => {
            storageRef.snapshot.ref
              .getDownloadURL()
              .then(async (url) => {
                document.src = url;
                document.isIntern = true;
                document.enabled = true;
                document.idParent = this.subTwo._id;
                document.ref =
                  "document internes/" +
                  this.category.name +
                  "/" +
                  this.subOne.name +
                  "/" +
                  this.subTwo.name +
                  "/" +
                  this.document.name +
                  "." +
                  this.extension;
                await this.$store
                  .dispatch("addDocument", document)
                  .then(async () => {
                    this.loading = false;
                    this.document = {};
                    $("#inputContent").val("");
                    await this.$store.dispatch("setDocuments");

                    this.$emit("uploaded", [this.subTwo, 2]);
                  })
                  .catch((error) => {
                    console.log(error);
                    this.loading = false;
                  });
                this.picture.push(url);
                //this.$store.dispatch("setPicture", this.picture);
              })
              .catch(() => {
                this.loading = false;
                this.errorButton = true;
              });
          }
        );
      }
      if (this.isBanner) {
        this.loading = true;
        this.errorButton = false;
        const storageRef = storage
          .ref("banners/" + this.banner.title + "." + this.extension)
          .put(this.imageData);
        storageRef.on(
          "state_changed",
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
            this.loading = false;
          },
          () => {
            storageRef.snapshot.ref
              .getDownloadURL()
              .then(async (url) => {
                this.banner.url = url;
                this.banner.ref =
                  "banners/" + this.banner.title + "." + this.extension;
                await this.$store
                  .dispatch("addBanner", this.banner)
                  .then(() => {
                    this.loading = false;
                    this.banner = {};
                    $("#inputContent").val("");
                    this.$store.dispatch("getBanners");
                  })
                  .catch((error) => {
                    console.log(error);
                    this.loading = false;
                  });
              })
              .catch(() => {
                this.loading = false;
                this.errorButton = true;
              });
          }
        );
      }
      if (this.isNews) {
        this.loading = true;
        this.errorButton = false;
        const storageRef = storage
          .ref("news/" + this.news.title + "." + this.extension)
          .put(this.imageData);
        storageRef.on(
          "state_changed",
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
            this.loading = false;
          },
          () => {
            storageRef.snapshot.ref
              .getDownloadURL()
              .then(async (url) => {
                this.news.url = url;
                this.news.ref =
                  "news/" + this.news.title + "." + this.extension;
                await this.$store
                  .dispatch("addNews", this.news)
                  .then(() => {
                    this.loading = false;
                    this.news = {};
                    $("#inputContent").val("");
                    this.$store.dispatch("getNews");
                  })
                  .catch((error) => {
                    console.log(error);
                    this.loading = false;
                  });
              })
              .catch(() => {
                this.loading = false;
                this.errorButton = true;
              });
          }
        );
      }
    },
  },
};
</script>

<style scoped>
img.preview {
  width: 200px;
}

.editor {
  border: solid 1px blue;
  height: 500px;
}
</style>
