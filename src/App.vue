<script>
import axios from 'axios'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'


import 'swiper/css'
// 해당 모듈에 맞는 css도 가져와야 그 스타일에 맞게 적용된다
import 'swiper/css/pagination'
import 'swiper/css/navigation'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  // setup()은 props를 사용하고, 반응형을 주입하는 ref, reactive를 사용한 변수를 가지고 return을 해 template에서 사용하는 방식이다
  setup() {
    return {
      modules: [
        Pagination,
      ]
    }
  },
  data() {
    return {
      BASE_URL : 'https://api.themoviedb.org/3/genre/movie/list',
      MENU_URL : 'https://api.themoviedb.org/3/discover/movie',
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',
      MOVIE_IMG : 'https://image.tmdb.org/t/p/original',
      movies : [],
      displaySize : 0,
      tablet : false,
      mobile : false,
    }
  },
  computed: {
    displayWidthSize() {
      return window.onresize  = ((e) => {
        return this.displaySize = window.innerWidth;
      })
    },
    tabletSize() {
      if(this.displaySize <= 1024 && this.displaySize >= 768) {
        return this.tablet = true;   
      } else {
        return this.tablet = false;
      }
    },
    mobileSize() {
      if(this.displaySize <= 768 ) {
        return this.mobile = true;
      } else {
        return this.mobile = false;
      }
    }
  },
  // watch는 computed와 같이 사용한다 -> computed의 값을 감지한다?
  watch: {
    displayWidthSize(e) {
      e = window.innerWidth;
      console.log(e)
    },
    tabletSize(e) {
      // console.log(e)
      console.log("tablet :" + e)
    },
    mobileSize(e) {
      // console.log(e)
      console.log("mobile :" + e)
    }
  },
  mounted() {
    this.displaySize = window.innerWidth;
    // 영화 타이틀에 맞는 -> 영화 목록
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=kr&with_genres=28`)
    .then((res) => {
      // console.log(res);
      this.movies = res.data.results
      // console.log(this.movies)
    }).catch((error) => {
      console.log(error)
    })

    // 영화 타이틀
    axios.get(`${this.BASE_URL}?api_key=${this.API_KEY}&language=ko`)
    .then((res) => {
      // console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  },
}
</script>


<template>
  <div class="mv">
    <div class="mv__logo" :class="{ tablet, mobile }">
      <img class="__logo" :class="{ tablet, mobile }" src="../public/netfilx_logo.png" alt="">
    </div>
    <div class="mv__container">
      <!-- 1 swiper -->
      <div class="mv__first">
        <div class="first" :class="{ tablet, mobile }">액션</div>
        <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7 : (displaySize > 768) ? 5 : 3" :space-between="30" :modules="modules" Navigation="false">
          <swiper-slide v-for="movie in movies" :key="movie">
            <img class="mv__poster" :class="{ tablet, mobile }" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
          </swiper-slide>
          <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- 반응형 -->
    <!-- <div class="container">
      <div class="row">

      </div>
    </div> -->
  </div>
</template>


<style lang="scss">
@import "./scss/main.scss";
  .mv {
    font-family: 'Nanum Gothic', sans-serif !important;
    width: 100vw;
    height: 100vh;
    background: #000;
    .mv__logo {
      height: 50vh;
      background-image: url('https://assets.nflxext.com/ffe/siteui/vlv3/28b69a57-cadf-43d9-8a95-e5f2e11199de/4490a703-c009-4266-8f15-938d80811812/KR-ko-20221010-popsignuptwoweeks-perspective_alpha_website_large.jpg');
      background-repeat: no-repeat;
      // background-position: center;
      background-size: 100%;
      .__logo {
        width: 10vw;
        cursor: pointer;
      }
      .tablet {
        width: 15vw;
      }
      .mobile {
        width: 25vw;
      }
    }
    .mv__logo.mobile {
      height: 30vh;
    }
    .mv__container {
      width: 90vw;
      margin: auto;
      .mv__first {
        padding-top: 50px;   
        .first {
          font-size: 2vw;
          color: #fff;
        }  
        .tablet {
          font-size: 4vw;
        }
        .mobile {
          font-size: 5vw;
        }
        .first__swiper {
          padding-top: 20px;
          .mv__poster {
            // font-size defualt - 16px;
            width: 10vw;
            border-radius: 5px;
            // transition : ease - 자연스러운 변화
            transition: all 0.3s ease;
            overflow: visible !important;
            &:hover {
              transform: scale(1.3);
              transition: all 0.3s ease;
              z-index: 100;
              cursor: pointer;
            }
          }
          .tablet {
            width: 15vw;
          }
          .mobile {
            width: 25vw;
          }
          .mv__next {
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: #fff;
            span {
              font-size: 4vw;
            }
          }
        }
      }
    }
  }
</style>