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
    <swiper-slide class="mv__video"><div class="mv__box"><div class="mv__video__poster"></div><div class="mv__video__title"></div></div></swiper-slide>
    <swiper-slide class="mv__video"><div class="mv__box"><div class="mv__video__poster"></div><div class="mv__video__title"></div></div></swiper-slide>
    <swiper-slide class="mv__video"><div class="mv__box"><div class="mv__video__poster"></div><div class="mv__video__title"></div></div></swiper-slide>
    <swiper-slide class="mv__video"><div class="mv__box"><div class="mv__video__poster"></div><div class="mv__video__title"></div></div></swiper-slide>
  </swiper>
</template>


<style lang="scss" scoped>
  .mv__video {
    position: relative;
    padding-bottom: 50px;
    width: 30vw;
    height: 30vh;
    .mv__box {
      position: relative;
      width: 100%;
      height: 100%;
      .mv__video__poster {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: #ddd;
        animation: pulse-bg 1s infinite;
        @keyframes pulse-bg {
          0% {
            background-color: #ddd;
          }
          50% {
            background-color: #d0d0d0;
          }
          100% {
            background-color: #ddd;
          }
        }
      }
      .mv__video__title {
        // padding-top: 10px;
        margin-top: 10px;
        width: 100%;
        height: 25%;
        color: #fff;
        font-size: 25px;
        text-align: center;
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
    }
  }
  @media screen and (max-width: 1024px) {  

    .mv__video {
      padding-bottom: 20px !important;
      width: 27vw !important;
      height: 25vh !important;
      .mv__box {
        .mv__video__title {
          font-size: 20px !important;
        }
      }
    } 
  }
  @media screen and (max-width: 768px) {
    .mv__video {
      padding-bottom: 50px !important;
      width: 39vw !important;
      height: 22vh !important;
      .mv__box {
        .mv__video__title {
          font-size: 16px !important;
        }
      }
    } 
  }
</style>

