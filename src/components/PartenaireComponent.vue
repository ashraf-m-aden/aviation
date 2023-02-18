<template>
  <div class="col-12">
    <!-- <VueSlickCarousel v-bind="settings" class="carousel" ref="carousel">
      <div class="carousel-box">
        <img
          :src="require('../assets/airport.jpg')"
          class="image"
          alt="Aéroport de Djibouti"
        />
      </div>
      <div class="carousel-box">
        <img
          :src="require('../assets/air djibouti.png')"
          class="image"
          alt="Air Djibouti"
        />
      </div>
      <div class="carousel-box">
        <img
          :src="require('../assets/air france.png')"
          class="image"
          alt="Air France"
        />
      </div>
      <div class="carousel-box">
        <div class="carousel-box-content">
          <img
            :src="require('../assets/ethiopian.png')"
            class="image"
            alt="Ethiopian Airlines"
          />
        </div>
      </div>
      <div class="carousel-box">
        <div class="carousel-box-content">
          <img
            :src="require('../assets/turkish-airlines-logo.jpg')"
            class="image"
            alt="Turkish Airlines"
          />
        </div>
      </div>
      <div class="carousel-box">
        <div class="carousel-box-content">
          <img
            :src="require('../assets/emirates.png')"
            class="image"
            alt="Emirates Airlines"
          />
        </div>
      </div>
      <div class="carousel-box">
        <div class="carousel-box-content">
          <img
            :src="require('../assets/qatar.png')"
            class="image"
            alt="Qatar Airways"
          />
        </div>
      </div>
    </VueSlickCarousel> -->
  </div>
</template>

<script>
// import VueSlickCarousel from "vue-slick-carousel";
// import "vue-slick-carousel/dist/vue-slick-carousel.css";
// // optional style for arrows & dots
// import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {

  components: {
    // VueSlickCarousel,
  },
  data() {
    return {
      settings: {
        dots: false,
        arrows: false,
        fade: false,
        pauseOnHover: false,
        dotsClass: "slick-dots custom-dot-class",
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        swipeToSlide: true,
      },
      windowWidth: window.innerHeight,
      txt: "",
    };
  },
  watch: {
    windowWidth(newHeight) {
      if (newHeight >= 1200) {
        this.settings.slidesToShow = 6;
      }
      if (newHeight < 1200) {
        this.settings.slidesToShow = 5;
      }
      if (newHeight < 1000) {
        this.settings.slidesToShow = 4;
      }
      if (newHeight < 830) {
        this.settings.slidesToShow = 3;
      }
    },
  },

  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerHeight;
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.border-bottom,
.border-top {
  width: 50%;
}

.infinite {
  font-size: 6rem;
  color: $color-secondary;
}
.partenaires {
  height: auto;
  padding: 5rem;

  @include respond(tablet-land) {
    height: 40vh;
  }
}

.title {
  color: $color-primary;
  font-weight: 700;
  font-size: 4rem;
  font-family: magical;
  text-transform: uppercase;
  margin-left: auto;
  margin-right: auto;
  padding: 5rem;

  @include respond(phone) {
    padding: 5rem 0 2rem 0;
    font-size: 2rem;
  }
}

.carousel {
  height: 30vh;
  width: 100%;

  &-box {
    position: relative;
    height: 25vh;
    .image {
      width: 150px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      @include centerElement;

      @include respond(phone) {
        height: 6rem;
      }
    }
  }
}
</style>
