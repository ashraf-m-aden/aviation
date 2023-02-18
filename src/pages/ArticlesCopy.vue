<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="title-box">
          <h1 class="title">Articles</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12" v-if="news">
        <div class="news-box">
          <div class="news-box_image">
            <img :src="news.url" :alt="news.title" class="news-box_image_img" />
          </div>
          <div class="news-box_content">
            <div class="news-box_title d-flex flex-column">
              <h1 class="h2">{{ news.title }}</h1>
              <strong>{{ news.createdAt }}</strong>
            </div>
            <div v-html="news.content" class="content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 col-md-6" v-if="prev">
        <h1 class="h5">Article precèdent</h1>
        <News :news="prev" :dashboard="false"></News>
      </div>
      <div class="col-12 col-md-6" v-if="next">
        <h1 class="h5">Article suivant</h1>
        <News :news="next" :dashboard="false"></News>
      </div>
    </div>
  </div>
</template>

<script>
import News from "../components/News";
export default {   

  components: {
    News,
  },
  computed: {
    Allnews() {
      return this.$store.state.media.allNews;
    },
    news() {
      const article = this.Allnews.filter((x) => {
        return x._id === this.$route.params.id;
      });
      if (article.length === 0) {
        return article[0];
      } else {
        return article[0];
      }
    },
    prev() {
      let result = {};
      for (let index = 0; index < this.Allnews.length; index++) {
        if (this.news === this.Allnews[index]) {
          result = this.Allnews[index - 1];
        }
      }
      return result;
    },
    next() {
      let result = {};
      for (let index = 0; index < this.Allnews.length; index++) {
        if (this.news === this.Allnews[index]) {
          result = this.Allnews[index + 1];
        }
      }
      return result;
    },
  },
  methods: {
    goError() {
      this.$router.push({ name: "404" });
    },
  },
};
</script>

<style lang="scss">
@import "../sass/main.scss";
.news-box {
  width: 100%;
  &_image {
    @include respond(big-desk) {
      height: 40vh !important;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
    @include respond(desk) {
      height: 50vh !important;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
    float: left;
    width: 30%;
    display: flex;
    justify-content: center;
    &_img {
      height: auto;
      width: auto;
    }

    @include respond(tablet-land) {
      height: 30vh !important;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
    @include respond(tablet) {
      float: none;
      width: 100%;
      height: 50vh;
    }
  }
  &_content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  &_title {
    @include respond(big-desk) {
      font-size: 1.5rem !important;
      margin-bottom: 2rem;
    }
    @include respond(desk) {
      font-size: 1rem !important;
      margin-bottom: 2rem;
    }
    @include respond(tablet-land) {
      font-size: 1.5rem !important;
      margin-bottom: 2rem;
    }

    @include respond(tablet) {
      font-size: 1rem !important;
      margin-bottom: 1rem;
    }
  }
}
span {
  @include respond(big-desk) {
    font-size: 2rem !important;
  }
  @include respond(tablet-land) {
    font-size: 1.5rem !important;
  }

  @include respond(tablet) {
    font-size: 1rem !important;
  }
}
.title-box {
  position: relative;
  height: 40vh;
  background-image: url("../assets/article.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .title {
    position: absolute;
    bottom: 1vh;
    left: 1vh;
    font-size: 2rem;
    text-transform: uppercase;
    color: white;
  }

  .title-img {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 50vh;
    min-width: 100%;
  }
}
</style>
