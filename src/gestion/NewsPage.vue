<template>
  <div class="news">
    <!-- Ajout -->
    <DriveUpload :isNews="true" />

    <!-- Liste -->
    <h3 class="news__h3">Articles</h3>
    <p v-if="!allNews.length" class="news__empty">
      Aucun article pour le moment.
    </p>

    <div v-else class="nlist">
      <div
        class="ncard"
        v-for="(article, index) in allNews"
        :key="article._id || index"
      >
        <!-- Média + remplacement d'image -->
        <div class="ncard__media">
          <div class="ph">
            <img
              :src="imageSrc(article)"
              alt=""
              @error="onImgError($event, article)"
            />
          </div>
          <label class="imglabel">Remplacer l'image (lien Drive)</label>
          <input
            class="inp inp--sm"
            type="text"
            :placeholder="
              draft(article).driveId
                ? 'Coller un nouveau lien…'
                : 'Coller un lien Drive…'
            "
            @input="setImage(article, $event.target.value)"
          />
          <span class="imgid" v-if="draft(article).driveId"
            >id : {{ draft(article).driveId }}</span
          >
        </div>

        <!-- Contenu -->
        <div class="ncard__body">
          <label>Titre</label>
          <input class="inp" type="text" v-model="draft(article).title" />

          <label>Contenu</label>
          <div class="editor">
            <QuillEditor
              :key="'q-' + article._id"
              :content="article.content || ''"
              content-type="html"
              theme="snow"
              @update:content="(v) => onContent(article, v)"
            />
          </div>

          <div class="ncard__foot">
            <div class="order">
              <button
                class="ico"
                :disabled="index === 0"
                @click="top(index)"
                title="Monter"
              >
                ▲
              </button>
              <button
                class="ico"
                :disabled="index === allNews.length - 1"
                @click="down(index)"
                title="Descendre"
              >
                ▼
              </button>
            </div>
            <div class="acts">
              <button class="btn-save" @click="modify(article)">
                Modifier
              </button>
              <button
                class="ico del"
                @click="remove(article)"
                title="Supprimer"
              >
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="news__bar" v-if="allNews.length">
      <button class="btn-order" @click="saveOrder">Enregistrer l'ordre</button>
    </div>
  </div>
</template>

<script>
import DriveUpload from "@/components/DriveUpload.vue";
import { driveImageUrl, driveThumbUrl, extractDriveId } from "@/utils/drive";

export default {
  name: "NewsPage",
  components: { DriveUpload },
  data() {
    // brouillons d'édition par article : on ne touche au store qu'au clic « Modifier »
    return { drafts: {} };
  },
  computed: {
    allNews() {
      return this.$store.state.media.allNews || [];
    },
  },
  watch: {
    allNews: {
      immediate: true,
      handler() {
        this.syncDrafts();
      },
    },
  },
  methods: {
    // crée le brouillon d'un article s'il n'existe pas encore, puis le renvoie
    draft(article) {
      if (!this.drafts[article._id]) {
        this.drafts[article._id] = {
          title: article.title || "",
          content: article.content || "",
          driveId: article.driveId || "",
        };
      }
      return this.drafts[article._id];
    },
    syncDrafts() {
      this.allNews.forEach((a) => {
        if (!this.drafts[a._id]) {
          this.drafts[a._id] = {
            title: a.title || "",
            content: a.content || "",
            driveId: a.driveId || "",
          };
        }
      });
    },
    onContent(article, html) {
      this.draft(article).content = html;
    },
    imageSrc(item) {
      const id = this.draft(item).driveId || item.driveId;
      return id ? driveImageUrl(id, 600) : item.url || "";
    },
    onImgError(e, item) {
      const id = this.draft(item).driveId || item.driveId;
      if (id) {
        const fb = driveThumbUrl(id, 600);
        if (e.target.src !== fb) e.target.src = fb;
      }
    },
    setImage(item, link) {
      const id = extractDriveId(link);
      if (id) this.draft(item).driveId = id;
    },
    modify(article) {
      const d = this.draft(article);
      const payload = {
        ...article,
        title: d.title,
        content: d.content,
        driveId: d.driveId || article.driveId || "",
      };
      this.$store.dispatch("modifyNews", payload);
      this.$store.dispatch("successNotif", "Article mis à jour.");
    },
    remove(item) {
      if (!confirm("Supprimer cet article ?")) return;
      this.$store.dispatch("deleteOneNews", item._id);
      delete this.drafts[item._id];
    },
    top(index) {
      this.$store.dispatch("topNews", index);
    },
    down(index) {
      this.$store.dispatch("downNews", index);
    },
    saveOrder() {
      this.$store.dispatch("saveNewNews");
      this.$store.dispatch("successNotif", "Ordre enregistré.");
    },
  },
  created() {
    this.$store.dispatch("getNews");
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

.news {
  &__h3 {
    font-size: 16px;
    color: $navy;
    margin: 28px 0 14px;
  }
  &__empty {
    color: $muted;
    font-size: 14px;
  }
  &__bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
}
.nlist {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ncard {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 240px 1fr;
  &__media {
    padding: 14px;
    background: #fafcfd;
    border-inline-end: 1px solid $line;
    display: flex;
    flex-direction: column;
  }
  &__body {
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    min-width: 0;
    label {
      font-size: 11.5px;
      font-weight: 700;
      color: $navy;
      margin: 10px 0 6px;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  &__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
  }
}
.ph {
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(120deg, $navy, $sky);
  margin-bottom: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
.imglabel {
  font-size: 11px;
  font-weight: 700;
  color: $navy;
  margin-bottom: 5px;
}
.imgid {
  font-size: 10.5px;
  color: $muted;
  margin-top: 5px;
  word-break: break-all;
}
.editor {
  background: #fff;
  border-radius: 8px;
  :deep(.ql-container) {
    min-height: 140px;
    font-size: 14px;
  }
  :deep(.ql-toolbar),
  :deep(.ql-container) {
    border-color: $line;
  }
}
.inp {
  width: 100%;
  padding: 9px 11px;
  border: 1px solid $line;
  border-radius: 8px;
  font: inherit;
  font-size: 13px;
  outline: none;
  &:focus {
    border-color: $sky;
  }
  &--sm {
    padding: 7px 10px;
    font-size: 12px;
  }
}
.order {
  display: flex;
  gap: 5px;
}
.acts {
  display: flex;
  gap: 6px;
  align-items: center;
}
.ico {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #fff;
  cursor: pointer;
  color: $muted;
  font-size: 11px;
  &:hover:not(:disabled) {
    color: $navy;
    border-color: #b9cde0;
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
  &.del:hover {
    color: #fff;
    background: $red;
    border-color: $red;
  }
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
  &:hover {
    background: $navy-700;
  }
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
  &:hover {
    background: #d8eefa;
  }
}
@media (max-width: 820px) {
  .ncard {
    grid-template-columns: 1fr;
  }
  .ncard__media {
    border-inline-end: none;
    border-bottom: 1px solid $line;
  }
}
</style>
