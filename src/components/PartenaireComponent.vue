<template>
  <div class="col-12">
    <div class="carousel">
      <div class="carousel-box">
        <div
          v-for="(item, index) in partenaires"
          :key="index"
          class="image"
          :style="{ 'background-image': 'url(' + item.src + ')' }"
        ></div>
      </div>
    </div>

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
import airport from "../assets/airport.jpg";
import ethiopian from "../assets/ethiopian.png";
import emirat from "../assets/emirates.png";
import qatar from "../assets/qatar.png";
import turkish from "../assets/turkish-airlines-logo.jpg";
import france from "../assets/air france.png";
import djibouti from "../assets/air djibouti.png";
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
      partenaires: [
        { src: airport },
        { src: djibouti },
        { src: turkish },
        { src: emirat },
        { src: qatar },
        { src: ethiopian },
        { src: france },
      ],
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
  width: 100%;
  margin: 5rem 0 5rem 0;
  &-box {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .image {
      width: 150px;
      height: 6rem;
      background-size: contain;
      background-position: center;
      @include respond(phone) {
        height: 6rem;
      }
    }
  }
}
</style>
