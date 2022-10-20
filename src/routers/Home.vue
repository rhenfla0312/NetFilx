<script>
// movie default page

import axios from 'axios'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [
        Pagination,
      ]
    }
  },
  data() {
    return {
      // URL
      BASE_URL : 'https://api.themoviedb.org/3/genre/movie/list',
      MENU_URL : 'https://api.themoviedb.org/3/discover/movie',
      NEW_URL : 'https://api.themoviedb.org/3/movie/upcoming',
      POPULAR_URL : 'https://api.themoviedb.org/3/movie/popular', 
      TRAND_URL : 'https://api.themoviedb.org/3/trending/movie/day',

      NEW_VIDEO : 'https://api.themoviedb.org/3/movie',

      // KEY -> env로 관리하기
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',

      // IMG_URL
      MOVIE_IMG : 'https://image.tmdb.org/t/p/original',

      // MOVIE_LIST
      new_movies : [],
      popular_moviles : [],
      trand_movies : [],

      // MOVIE_VIDEO
      new_video_id_one : '',
      new_video_id_two : '',

      displaySize : 0
    }
  },
  computed: {
    displayWidthSize() {
      return window.onresize  = ((e) => {
        return this.displaySize = window.innerWidth;
      })
    }
  },
  watch: {
    displayWidthSize(e) {
      e = window.innerWidth;
    }
  },
  mounted() {
    this.displaySize = window.innerWidth;
    // id에 맞는 영상 가져오기 - 테스트용
    // axios.get(`${this.MOVIE_URL}/760161/videos?api_key=${this.API_KEY}&language=ko`)
    // .then((res) => {
    //   // console.log(res)
    // }).catch((error) => {
    //   console.log(error)
    // })
    
    
    // 영화 장르 확인
    axios.get(`${this.BASE_URL}?api_key=${this.API_KEY}&language=ko`)
    .then((res) => {
      // console.log(res)
    }).catch((error) => {
      console.log(error)
    })


    // 개봉예정 영화 목록
    axios.get(`${this.NEW_URL}?api_key=${this.API_KEY}&language=ko`)
    .then((res) => {
      // console.log(res);
      this.new_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })
    
    // 인기 영화 목록
    axios.get(`${this.POPULAR_URL}?api_key=${this.API_KEY}&language=ko&page=4`)
    .then((res) => {
      // console.log(res)
      this.popular_moviles = res.data.results
    }).catch((error) => {
      console.log(error)
    })

    // 트렌드 영화
    axios.get(`${this.TRAND_URL}?api_key=${this.API_KEY}&language=ko`)
    .then((res) => {
      console.log(res)
      this.trand_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })

    // 최신 영화 비디오 - (아바타, 와칸다포에버)
    axios.get(`${this.NEW_VIDEO}/19995/videos?api_key=${this.API_KEY}&language=ko`)
    .then((res) => {
      console.log(res)
      this.new_video_id_one = res.data.results[0].key
    }).catch((error) => {
      console.log(error)
    })
    axios.get(`${this.NEW_VIDEO}/505642/videos?api_key=${this.API_KEY}&language=ko`)
    .then((res) => {
      console.log(res)
      this.new_video_id_two = res.data.results[0].key
    }).catch((error) => {
      console.log(error)
    })

  },
}
</script>


<template>
  <div class="mv__container">
    <!-- 1 swiper -> new -->
    <div class="mv__first">
      <div class="first">개봉예정영화</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in new_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 2 swiper -> popular -->
    <div class="mv__first">
      <div class="first">인기영화</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in popular_moviles" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 3 swiper -> video -->
    <div class="mv__first">
      <div class="first">최신예고편</div>
      <swiper class="first__swiper video__swiper" :slides-per-view="(displaySize > 1024) ? 2 : 1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide>
          <iframe :src="`https://www.youtube.com/embed/${new_video_id_one}?autoplay=1`" frameborder="0"></iframe>
        </swiper-slide>
        <swiper-slide>
          <iframe :src="`https://www.youtube.com/embed/${new_video_id_two}?autoplay=1`" frameborder="0"></iframe>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 4 swiper -> trand -->
    <div class="mv__first">
      <div class="first">실시간 급상승</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in trand_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
  </div>
</template>


<style lang="scss" scoped>

@media screen and (max-width: 1024px) {

  .mv__container {
    .mv__first {
      .first {
        font-size: 3vw !important;
      }
      .first__swiper {
        .mv__poster {
          width: 15vw !important;
          height: 25vh !important;
        }
        .mv__next {
          span {
            font-size: 6vw !important;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {

  .mv__container {
    .mv__first {
      .first {
        font-size: 5vw !important;
      }
      .first__swiper {
        .mv__poster {
          width: 25vw !important;
          height: 25vh !important;
        }
        .mv__next {
          span {
            font-size: 10vw !important;
          }
        }
      }
    }
  } 

}
  .mv__container {
    width: 90vw;
    margin: auto;
    padding-bottom: 30px;
    .mv__first {
      padding-top: 30px;
      .first {
        padding-left: 20px;
        font-size: 2vw;
        color: #fff;
      }  
      .first__swiper {
        padding: 20px;
        .mv__poster {
          width: 10vw;
          height: 30vh;
          // font-size defualt - 16px;
          border-radius: 5px;
          // transition : ease - 자연스러운 변화
          transition: all 0.3s ease;
          &:hover {
            transform: scale(1.2);
            transition: all 0.3s ease;
            z-index: 100;
            cursor: pointer;
          }
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
      .video__swiper {
        background: #101010;
        border-radius: 10px;
        height: 50vh;
        iframe {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>