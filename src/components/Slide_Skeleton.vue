<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
  }
}
</script>


<template>
  <swiper class="first__swiper">
    <swiper-slide><div class="skeleton__poster"></div></swiper-slide>
    <swiper-slide><div class="skeleton__poster"></div></swiper-slide>
    <swiper-slide><div class="skeleton__poster"></div></swiper-slide>
    <swiper-slide><div class="skeleton__poster"></div></swiper-slide>
    <swiper-slide><div class="skeleton__poster"></div></swiper-slide>
    <swiper-slide><div class="skeleton__poster"></div></swiper-slide>
    <swiper-slide><div class="skeleton__poster"></div></swiper-slide>
    <swiper-slide><div class="skeleton__poster"></div></swiper-slide>
  </swiper>
</template>


<style lang="scss" scoped>
  .skeleton__poster {
    width: 10vw;
    height: 30vh;
    border-radius: 5px;
    background-color: rgba(165, 165, 165, 0.1);
    animation: pulse-bg 1s infinite;
    @keyframes pulse-bg {
      0% {
        background-color: rgba(165, 165, 165, 0.1);
      }
      50% {
        background-color: rgba(165, 165, 165, 0.3);
      }
      100% {
        background-color: rgba(165, 165, 165, 0.1);
      }
    }
  }
  @media screen and (max-width: 1024px) {  
    .skeleton__poster {
      width: 15vw !important;
      height: 25vh !important;
    }
  }
  @media screen and (max-width: 768px) {
    .skeleton__poster {
      width: 25vw !important;
      height: 25vh !important;
    }
  }
</style>

