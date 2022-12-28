<template>
    <div class="hero-slider-area">
        <div class="hero-slider__container-area">
            <div class="hero-slider__container">
                <div class="hero-slider__wrapper">
                    <swiper :slides-per-view="1" :space-between="10" :speed="1000" :loop="true"
                        :navigation="swiperOptions.navigation" @swiper="onSwiper">
                        <swiper-slide class="hero-slider__single-item" v-for="(banner, index) in banners" :key="index"
                            :style="{ backgroundImage: `url(${banner.url})` }">
                            <div class="hero-slider__content-wrapper">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="hero-slider__content" :class="[banner.addClass]">
                                                <h2 class="hero-slider__title">{{ banner.title }}</h2>
                                                <p class="hero-slider__text">{{ banner.description }}</p>
                                                <router-link to="/contact" class="hero-slider__btn">GET START
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <div
                            class="ht-swiper-button-prev ht-swiper-button-prev-13 ht-swiper-button-nav d-none d-xl-block">
                            <i class="ion-ios-arrow-left"></i>
                        </div>
                        <div
                            class="ht-swiper-button-next ht-swiper-button-next-13 ht-swiper-button-nav d-none d-xl-block">
                            <i class="ion-ios-arrow-forward"></i>
                        </div>
                    </swiper>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SwiperCore, { Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from 'swiper/vue';
SwiperCore.use([Navigation])

export default {
    data() {
        return {
            swiperOptions: {
                navigation: {
                    nextEl: '.ht-swiper-button-next',
                    prevEl: '.ht-swiper-button-prev'
                }
            }
        };
    },

    props: ["sliderData"],

    components: {
        Swiper,
        SwiperSlide,
    },

    methods: {
        onSwiper(swiper) {
            this.swiper = swiper
        }
    },
};
</script>