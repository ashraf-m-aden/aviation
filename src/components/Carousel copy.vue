<template>
  <div class="row  mb-5">
    <div v-if="banners.length > 0" class="col-12  ">
      <div class="carou mr-auto ml-auto">
        <div @click="prev" class="carousel_arrow carousel_arrow_prev ml-2">
          &lang;
        </div>
        <VueSlickCarousel v-bind="settings" class="carousel" ref="carousel">
          <div
            class="carousel_div"
            v-for="(banner, index) in banners"
            :key="index"
          >
            <img class="intro-section overlay bg-cover" :src="banner.url" alt="" />

            <div
              class="carousel_text pl-2"
              v-show="banner.title || banner.description"
            >
              <p class="carousel_text_title">{{ banner.title }}</p>
              <p class="carousel_text_desc">{{ banner.description }}</p>
            </div>
          </div>
          <template #customPaging="page">
            <div class="custom-dot">
              <span class="custom-dot_number">{{ page }}</span>
            </div>
          </template>
        </VueSlickCarousel>
        <div @click="next" class="carousel_arrow carousel_arrow_next mr-2">
          &rang;
        </div>
      </div>
    </div>
    <div v-else class="col-12">
      <v-skeleton-loader
        class="mx-auto skeleton"
        max-height="500px"
        max-width="1000px"
        type="card"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import $ from "jquery";
export default {
  data() {
    return {
      arrows: true,
      dots: true,
      settings: {
        dots: true,
        dotsClass: "slick-dots dot-class",
        edgeFriction: 0.35,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    };
  },
  components: {
    VueSlickCarousel,
  },
  computed: {
    banners() {
      if (this.$store.state.media.banner.length > 0) {
        return this.$store.state.media.banner;
      } else {
        return this.$store.state.media.banner;
      }
    },
  },
  methods: {
    prev() {
      this.$refs.carousel.prev();
    },
    next() {
      this.$refs.carousel.next();
    },
  },
  mounted() {
    $(".slick-prev").removeClass("slick-disabled");
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.slick-active {
  background-color: rgb(70, 161, 204);

  .custom-dot {
    background-color: rgb(70, 161, 204);
  }
}

.custom-dot {
  background-color: grey;
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 50%;
  margin-top: -1.5rem;
  border: solid 1px white;
  .custom-dot_number {
    display: none;
  }
}

.carousel {
  position: relative;
  &_div {
    position: relative;
    height: 80vh;
    @include respond(big-desk) {
      height: 40vh;
    }
    @include respond(tablet-land) {
      height: 37vh;
    }
    @include respond(tablet) {
      height: 27vh;
    }
    &_img {
      width: 100%;
    }
  }

  &_text {
    position: absolute;
    z-index: 999;
    bottom: 0;
    display: inline-block;
    left: 0;
    background: rgba(#0000, 0.5);
    width: 100%;
    color: white;
    text-align: left;
    &_title {
      font-size: 1rem;
      margin-bottom: 0;
    }
    &_desc {
      font-size: 0.7rem;
      margin-top: 0;
    }
  }

  &_arrow {
    position: absolute;
    top: 40%;
    display: inline-block;
    font-size: 2.5rem;
    cursor: pointer;

    z-index: 1;
    color: white;
    @include respond(tablet) {
      display: none;
    }

    &:hover {
      color: rgb(70, 161, 204);
    }

    &_next {
      right: 0;
      padding-right: 3rem;
    }

    &_prev {
      padding-left: 3rem;
    }
  }
}
</style>
