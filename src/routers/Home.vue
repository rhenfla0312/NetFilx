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
      MOVIE_URL : 'https://api.themoviedb.org/3/movie',

      // KEY -> env로 관리하기
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',

      // IMG_URL
      MOVIE_IMG : 'https://image.tmdb.org/t/p/original',

      // MOVIE_LIST
      new_movies : [],
      popular_moviles : [],

      // random movie(10)
      action_movies : [],
      adventure_movies : [],
      animation_movies : [],
      comedy_movies : [],
      drama_movies : [],
      fantasy_movies : [],
      history_movies : [],
      hurt_movies : [],
      thriller_movies : [],
      War_movies : [],

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


    // 최신 영화 목록
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
    
    // 영화 타이틀에 맞는 -> 영화 목록 (10개 선정)
    // 액션 -> 28
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=28&page=10`)
    .then((res) => {
      // console.log(res);
      this.action_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })

    // 모험-> 12
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=12&page=9`)
    .then((res) => {
      // console.log(res);
      this.adventure_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })

    // 애니메이션 -> 16
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=16&page=4`)
    .then((res) => {
      // console.log(res);
      this.animation_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })
    // 코미디 -> 35
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=35&page=13`)
    .then((res) => {
      // console.log(res);
      this.comedy_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })

    // 드라마 -> 18
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=18&page=3`)
    .then((res) => {
      // console.log(res);
      this.drama_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })
    // 판타지 -> 14
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=14&page=3`)
    .then((res) => {
      // console.log(res);
      this.fantasy_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })
    // 역사-> 36
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=36&page=9`)
    .then((res) => {
      // console.log(res);
      this.history_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })
    // 공포 -> 27
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=27&page=5`)
    .then((res) => {
      // console.log(res);
      this.hurt_movies  = res.data.results
    }).catch((error) => {
      console.log(error)
    })
    // 스릴러 -> 53
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=53&page=3`)
    .then((res) => {
      // console.log(res);
      this.thriller_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })
    // 전쟁 -> 10752
    axios.get(`${this.MENU_URL}?api_key=${this.API_KEY}&language=ko&with_genres=10752&page=7`)
    .then((res) => {
      // console.log(res);
      this.War_movies = res.data.results
    }).catch((error) => {
      console.log(error)
    })
  },
}
</script>


<template>
  <div class="mv__container">
    <!-- 1 swiper -->
    <div class="mv__first">
      <div class="first">개봉예정영화</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in new_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 2 swiper -->
    <div class="mv__first">
      <div class="first">인기영화</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in popular_moviles" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 3 swiper -->
    <div class="mv__first">
      <div class="first">액션</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in action_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 4 swiper -->
    <div class="mv__first">
      <div class="first">모험</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in adventure_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 5 swiper -->
    <div class="mv__first">
      <div class="first">애니메이션</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in animation_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 6 swiper -->
    <div class="mv__first">
      <div class="first">코미디</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in comedy_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 7 swiper -->
    <div class="mv__first">
      <div class="first">드라마</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in drama_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 3 swiper -->
    <div class="mv__first">
      <div class="first">판타지</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in fantasy_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 8 swiper -->
    <div class="mv__first">
      <div class="first">역사</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in history_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 9 swiper -->
    <div class="mv__first">
      <div class="first">공포</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in hurt_movies" :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 10 swiper -->
    <div class="mv__first">
      <div class="first">스릴러</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in thriller_movies " :key="movie">
          <img class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
    </div>
    <!-- 11 swiper -->
    <div class="mv__first">
      <div class="first">전쟁</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in War_movies" :key="movie">
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
        font-size: 4vw !important;
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
    }
  }
</style>