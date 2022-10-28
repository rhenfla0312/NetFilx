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

      MOVIE_INFO_URL : 'https://api.themoviedb.org/3/movie',

      // KEY -> env로 관리하기
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',

      // IMG_URL
      MOVIE_IMG : 'https://image.tmdb.org/t/p/original',

      // MOVIE_LIST
      new_movies : [],
      popular_moviles : [],
      trand_movies : [],

      // MOVIE_VIDEO
      new_video_infos : [],

      displaySize : 0,

      // MOVIE_DETAIL_INFO_check
      movie_info_new : false,
      movie_info_popular : false,
      movie_info_video : false,
      movie_info_trand : false,
      // MOVIE_DETAIL_INFO
      movie_info_new_data : {},
      movie_info_popular_data : {},
      movie_info_video_data : {},
      movie_info_trand_data : {},
      // MOVIE_DETAIL_INFO_id
      movie_info_new_id : '',
      movie_info_popular_id : '',
      movie_info_video_id : '',
      movie_info_trand_id : '',

      CHECK_DATA : "movie",

      skeleton_new : true,
      skeleton_popular : true,
      skeleton_video : true,
      skeleton_trand : true,
    }
  },
  computed: {
    displayWidthSize() {
      return window.onresize  = ((e) => {
        return this.displaySize = window.innerWidth;
      })
    },
  },
  watch: {
    displayWidthSize(e) {
      e = window.innerWidth;
    },
  },
  methods: {
    mvBack(bg) {
      this.$refs.mv_bg.style.backgroundImage = `url(${this.MOVIE_IMG}/${bg})`;
      this.$refs.mv_bg.style.backgroundPosition = 'center';
      this.$refs.mv_bg.style.backgroundSize = '100%';
      this.$refs.mv_bg.style.backgroundRepeat = 'no-repeat';
    },

    // detail page
    detail(id) {
      this.$router.push({
        name: "DetailInfo",
        params: {
          id: id,
          CHECK_DATA : this.CHECK_DATA
        }
      })
    },

    // new
    async new_movieInfo(id, bg) {
      this.movie_info_new_id = ''

      this.movie_info_new = true;
      this.movie_info_popular = false;
      // this.movie_info_video = false;
      this.movie_info_trand = false;

      this.$refs.detail_new_bg.style.backgroundImage = `url(${this.MOVIE_IMG}/${bg})`;
      this.$refs.detail_new_bg.style.backgroundPosition = 'center';
      if(this.displaySize >= 1024) {
        this.$refs.detail_new_bg.style.backgroundSize = '100%';
      } else if(this.displaySize < 1024) {
        this.$refs.detail_new_bg.style.backgroundSize = 'auto';
      }
      this.$refs.detail_new_bg.style.backgroundRepeat = 'no-repeat';
      
      // id에 맞는 영화정보 불러오기
      await axios.get(`${this.MOVIE_INFO_URL}/${id}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.movie_info_new_data = res.data;
      }).catch((error) => {
        console.log(error)
      })
      // id에 맞는 영상 가져오기
      await axios.get(`${this.MOVIE_INFO_URL}/${id}/videos?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.movie_info_new_id = res.data.results[0].key;
      }).catch((error) => {
        console.log(error)
      }) 

    },
    new_movieInfo_close() {
      this.movie_info_new = false;
    },  
    // popular
    async popular_movieInfo(id, bg) {
      this.movie_info_popular_id = '';

      this.movie_info_new = false;
      this.movie_info_popular = true;
      this.movie_info_video = false;
      this.movie_info_trand = false;

      // 해당 id에 맞는 영화정보 불러오기
      this.$refs.detail_popular_bg.style.backgroundImage = `url(${this.MOVIE_IMG}/${bg})`;
      this.$refs.detail_popular_bg.style.backgroundPosition = 'center';
      if(this.displaySize >= 1024) {
        this.$refs.detail_popular_bg.style.backgroundSize = '100%';
      } else if(this.displaySize < 1024) {
        this.$refs.detail_popular_bg.style.backgroundSize = 'auto';
      }
      this.$refs.detail_popular_bg.style.backgroundRepeat = 'no-repeat';
      
      // id에 맞는 영화정보 불러오기
      await axios.get(`${this.MOVIE_INFO_URL}/${id}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.movie_info_popular_data = res.data;
      }).catch((error) => {
        console.log(error)
      })
      // id에 맞는 영상 가져오기
      await axios.get(`${this.MOVIE_INFO_URL}/${id}/videos?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.movie_info_popular_id = res.data.results[0].key;
      }).catch((error) => {
        console.log(error)
      }) 
    },
    popular_movieInfo_close() {
      this.movie_info_popular = false;
    },
    // video
    async video_movieInfo(id, bg) {
      this.movie_info_video_id = '';

      this.movie_info_new = false;
      this.movie_info_popular = false;
      this.movie_info_video = true;
      this.movie_info_trand = false;

      // 해당 id에 맞는 영화정보 불러오기
      this.$refs.detail_video_bg.style.backgroundImage = `url(${this.MOVIE_IMG}/${bg})`;
      this.$refs.detail_video_bg.style.backgroundPosition = 'center';
      if(this.displaySize >= 1024) {
        this.$refs.detail_popular_bg.style.backgroundSize = '100%';
      } else if(this.displaySize < 1024) {
        this.$refs.detail_video_bg.style.backgroundSize = 'auto';
      }
      this.$refs.detail_video_bg.style.backgroundRepeat = 'no-repeat';
      
      // id에 맞는 영화정보 불러오기
      await axios.get(`${this.MOVIE_INFO_URL}/${id}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.movie_info_video_data = res.data;
      }).catch((error) => {
        console.log(error)
      })
      // id에 맞는 영상 가져오기
      await axios.get(`${this.MOVIE_INFO_URL}/${id}/videos?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.movie_info_video_id = res.data.results[0].key;
      }).catch((error) => {
        console.log(error)
      }) 
    },
    video_movieInfo_close() {
      this.movie_info_video = false;
    },
    // trand
    async trand_movieInfo(id, bg) {
      this.movie_info_new = false;
      this.movie_info_popular = false;
      this.movie_info_video = false;
      this.movie_info_trand = true;

      // 해당 id에 맞는 영화정보 불러오기
      this.$refs.detail_trand_bg.style.backgroundImage = `url(${this.MOVIE_IMG}/${bg})`;
      this.$refs.detail_trand_bg.style.backgroundPosition = 'center';
      if(this.displaySize >= 1024) {
        this.$refs.detail_trand_bg.style.backgroundSize = '100%';
      } else if(this.displaySize < 1024) {
        this.$refs.detail_trand_bg.style.backgroundSize = 'auto';
      }
      this.$refs.detail_trand_bg.style.backgroundRepeat = 'no-repeat';
      
      // id에 맞는 영화정보 불러오기
      await axios.get(`${this.MOVIE_INFO_URL}/${id}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.movie_info_trand_data = res.data;
      }).catch((error) => {
        console.log(error)
      })
      // id에 맞는 영상 가져오기
      await axios.get(`${this.MOVIE_INFO_URL}/${id}/videos?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.movie_info_video_id = res.data.results[0].key;
      }).catch((error) => {
        console.log(error)
      }) 
    },
    trand_movieInfo_close() {
      this.movie_info_trand = false;
    }
  },
  // window esc event
  //   updated() {
  //     window.onkeydown = function(event){
  //       if(event.keyCode == 27){
  //         this.movie_info_new = false;
  //         this.movie_info_popular = false;
  //         this.movie_info_video = false;
  //         this.movie_info_trand = false;
  //       };
  //     }
  //   },
  async mounted() {
    this.displaySize = window.innerWidth;

    try {
      // 영화 장르 확인
      await axios.get(`${this.BASE_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
      }).catch((error) => {
        console.log(error)
      })
  
      // 개봉예정 영화 목록
      await axios.get(`${this.NEW_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res);
        this.skeleton_new = false;
        this.new_movies = res.data.results
      }).catch((error) => {
        console.log(error)
      })
      
      // 인기 영화 목록
      await axios.get(`${this.POPULAR_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.skeleton_popular = false;
        this.popular_moviles = res.data.results
      }).catch((error) => {
        console.log(error)
      })
  
      // 트렌드 영화
      await axios.get(`${this.TRAND_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.skeleton_trand = false;
        this.trand_movies = res.data.results
      }).catch((error) => {
        console.log(error)
      })
  
      // 최신 영화 비디오_세부정보 4개 선정 - (아바타2 - 76600, 와칸다포에버 - 505642, 아바타 - 19995 , 블랙아담 - 436270)
      await axios.get(`${this.MOVIE_INFO_URL}/76600?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.new_video_infos.push(res.data);
      }).catch((error) => {
        console.log(error)
      })
      await axios.get(`${this.MOVIE_INFO_URL}/505642?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.new_video_infos.push(res.data);
      }).catch((error) => {
        console.log(error)
      })
      await axios.get(`${this.MOVIE_INFO_URL}/19995?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.new_video_infos.push(res.data);
      }).catch((error) => {
        console.log(error)
      })
      await axios.get(`${this.MOVIE_INFO_URL}/436270?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.new_video_infos.push(res.data);
      }).catch((error) => {
        console.log(error)
      })
    } catch (e) {
      // console.log가 아닌 error는 콘솔의 에러를 뱉는다
      console.error(e)
    }
  },
}
</script>


<template>
  <div class="mv__img">
    <!-- <img src="https://www.justwatch.com/appassets/img/home/tv/tv.webp" alt=""> -->
  </div>
  <div class="mv__container">
    <!-- 1 swiper -> new -->
    <div class="mv__first">
      <div class="first">개봉예정</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in new_movies" :key="movie">
          <div v-if="skeleton_new" class="skeleton__poster"></div>
          <img v-else class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`" @click="new_movieInfo(movie.id, movie.backdrop_path)">
        </swiper-slide>
        <swiper-slide class="mv__next">
          <RouterLink to="/new"><span class="material-symbols-outlined">arrow_circle_right</span></RouterLink>
        </swiper-slide>
      </swiper>
      <!-- mv__detail__info -->
      <div class="mv__detail__info" :class="{ movie_info_new }" ref="detail_new_bg">
        <div class="detail__info">
          <!-- <img :src="(displaySize > 768) ? `${this.MOVIE_IMG}/${movie_info_new_data.poster_path}` : `${this.MOVIE_IMG}/${movie_info_new_data.backdrop_path}`" alt="" class="detail__poster" /> -->
          <div class="detail__box" v-if="displaySize > 768">
            <img :src="`${this.MOVIE_IMG}/${movie_info_new_data.poster_path}`" class="detail__poster" />
            <div class="detail__btn" @click="detail(movie_info_new_data.id)">상세보기</div>
          </div>
          <div class="detail__text">
            <div class="__header">
              <div class="__title">{{ movie_info_new_data.title }}</div>
              <div class="__close"><span class="material-symbols-outlined" @click="new_movieInfo_close()">close</span></div>
            </div>
            <div class="detail__box" v-if="displaySize < 768">
              <img :src="`${this.MOVIE_IMG}/${movie_info_new_data.backdrop_path}`" class="detail__poster" />
              <div class="detail__btn" @click="detail(movie_info_new_data.id)">상세보기</div>
            </div>
            <div class="__des">{{ movie_info_new_data.overview !== "" ? movie_info_new_data.overview : "상세설명이 없습니다" }}</div>
            <div class="detail__video">
              <iframe :src="`https://www.youtube.com/embed/${movie_info_new_id}?autoplay=1&mute=1`"></iframe>
            </div>
          </div>
        </div>
      </div>  
    </div>
    <!-- 2 swiper -> popular -->
    <div class="mv__first">
      <div class="first">인기</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in popular_moviles" :key="movie">
          <div v-if="skeleton_popular" class="skeleton__poster"></div>
          <img v-else class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`" onerror="this.src='/public/no_image.png'"  @click="popular_movieInfo(movie.id, movie.backdrop_path)" />
        </swiper-slide>
        <swiper-slide class="mv__next">
          <RouterLink to="/popular"><span class="material-symbols-outlined">arrow_circle_right</span></RouterLink>
        </swiper-slide>
      </swiper>
      <!-- mv__detail__info -->
      <div class="mv__detail__info" :class="{ movie_info_popular }" ref="detail_popular_bg">
        <div class="detail__info">
          <div class="detail__box" v-if="displaySize > 768">
            <img :src="`${this.MOVIE_IMG}/${movie_info_popular_data.poster_path}`" class="detail__poster" onerror="this.src='/public/no_image.png'" />
            <div class="detail__btn" @click="detail(movie_info_popular_data.id)">상세보기</div>
          </div>
          <div class="detail__text">
            <div class="__header">
              <div class="__title">{{ movie_info_popular_data.title }}</div>
              <div class="__close"><span class="material-symbols-outlined" @click="popular_movieInfo_close()">close</span></div>
            </div>
            <div class="detail__box" v-if="displaySize < 768">
              <img :src="`${this.MOVIE_IMG}/${movie_info_popular_data.backdrop_path}`" class="detail__poster" onerror="this.src='/public/no_image.png'" />
              <div class="detail__btn" @click="detail(movie_info_popular_data.id)">상세보기</div>
            </div>
            <div class="__des">{{ movie_info_popular_data.overview !== "" ? movie_info_popular_data.overview : "상세설명이 없습니다" }}</div>
            <div class="detail__video">
              <iframe :src="`https://www.youtube.com/embed/${movie_info_popular_id}?autoplay=1&mute=1`"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 3 swiper -> video -->
    <div class="mv__first">
      <div class="video__swiper" ref="mv_bg">
        <div class="first first__video">최신예고편</div>
        <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 4 : (displaySize > 768) ? 3 : 2" :space-between="30" :modules="modules" Navigation="false">
          <swiper-slide class="mv__video" v-for="movie in new_video_infos" :key="movie" @click="video_movieInfo(movie.id, movie.backdrop_path)">
            <div class="mv__box">
              <img class="mv__video__poster" :src="`${this.MOVIE_IMG}/${movie.backdrop_path}`" @mouseover="mvBack(movie.backdrop_path)" onerror="this.src='/public/no_image.png'" />
              <div class="mv__video__title">{{ movie.title == "아바타" ? "[리마스터링] " + movie.title : movie.title  }}</div>
              <span class="material-symbols-outlined mv__play">youtube_activity</span>
            </div>
          </swiper-slide>
        </swiper>
        <!-- mv__detail__info -->
        <div class="mv__detail__info" :class="{ movie_info_video }"  ref="detail_video_bg">
          <!-- <div class="__close">
            <span class="material-symbols-outlined" @click="video_movieInfo_close()">close</span>
          </div> -->
          <div class="detail__video">
            <iframe :src="`https://www.youtube.com/embed/${movie_info_video_id}?autoplay=1&mute=1`"></iframe>
          </div>
        </div>
      </div>
    </div>
    <!-- 4 swiper -> trand -->
    <div class="mv__first">
      <div class="first">실시간 급상승</div>
      <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 7.1 : (displaySize > 768) ? 5.1 : 3.1" :space-between="30" :modules="modules" Navigation="false">
        <swiper-slide v-for="movie in trand_movies" :key="movie">
          <div v-if="skeleton_trand" class="skeleton__poster"></div>
          <img v-else class="mv__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`" onerror="this.src='/public/no_image.png'" @click="trand_movieInfo(movie.id, movie.backdrop_path)" />
        </swiper-slide>
        <swiper-slide class="mv__next"><span class="material-symbols-outlined">arrow_circle_right</span></swiper-slide>
      </swiper>
      <!-- mv__detail__info -->
      <div class="mv__detail__info" :class="{ movie_info_trand }"  ref="detail_trand_bg">
        <div class="detail__info">
          <div class="detail__box" v-if="displaySize > 768">
            <img :src="`${this.MOVIE_IMG}/${movie_info_trand_data.poster_path}`" class="detail__poster" onerror="this.src='/public/no_image.png'" />
            <div class="detail__btn" @click="detail(movie_info_trand_data.id)">상세보기</div>
          </div>
          <div class="detail__text">
            <div class="__header">
              <div class="__title">{{ movie_info_trand_data.title }}</div>
              <div class="__close"><span class="material-symbols-outlined" @click="trand_movieInfo_close()">close</span></div>
            </div>
            <div class="detail__box" v-if="displaySize < 768">
              <img :src="`${this.MOVIE_IMG}/${movie_info_trand_data.backdrop_path}`" class="detail__poster" onerror="this.src='/public/no_image.png'" />
              <div class="detail__btn" @click="detail(movie_info_trand_data.id)">상세보기</div>
            </div>
            <div class="__des">{{ movie_info_trand_data.overview !== "" ? movie_info_trand_data.overview : "상세설명이 없습니다" }}</div>
            <div class="detail__video">
              <iframe :src="`https://www.youtube.com/embed/${movie_info_trand_id}?autoplay=1&mute=1`"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

@media screen and (max-width: 1024px) {
  .mv__img {
    height: 40vh !important;
    img {
      // padding-top: 2rem !important;
      width: 100% !important;
    }
  }
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
        .skeleton__poster {
          width: 15vw !important;
          height: 25vh !important;
        }
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
        .mv__next {
          span {
            font-size: 6vw !important;
          }
        }
      }
      .video__swiper {
        height: 40vh !important;
      }
    }
    .mv__first {
      position: relative;
      // movie__detail__info
      .mv__detail__info {
        animation: fadeOut 1s;
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 100%);
          }
        }
        display: none;

      }
      .mv__detail__info.movie_info_new {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .detail__info {
          display: flex;
          .detail__text {
            width: 100%;
            padding-left: 0 !important;
            .detail__poster {
              margin-top: 10px;
              width: 100% !important;
              border-radius: 10px;
            }
            .__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .__title {
                font-size: 30px;
                font-weight: 600;  
                color: #000;
              }
              .__close {
                
                span {
                  font-size: 40px;
                  cursor: pointer;
                  transition: .3s;
                  transform: rotate(0);
                  &:hover {
                    transition: .3s;
                    transform : rotate(180deg);
                  }
                }
              }
            }
            .__des {
              width: 100%;
              min-height: 17vh;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
              font-weight: 600;
              color: #000;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-word;
              display: -webkit-box;
              -webkit-line-clamp: 5; // 원하는 라인수
              -webkit-box-orient: vertical;
            }
            .detail__video {
              display: none !important;
              padding-top: 56.25%;
              position: relative;
              iframe {
                border-radius: 10px;
                background: black;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .mv__detail__info.movie_info_popular {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .detail__info {
          display: flex;
          .detail__text {
            width: 100%;
            padding-left: 0 !important;
            .detail__poster {
              margin-top: 10px;
              width: 100% !important;
              border-radius: 10px;
            }
            .__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .__title {
                font-size: 30px;
                font-weight: 600;  
                color: #000;
              }
              .__close {
                
                span {
                  font-size: 40px;
                  cursor: pointer;
                  transition: .3s;
                  transform: rotate(0);
                  &:hover {
                    transition: .3s;
                    transform : rotate(180deg);
                  }
                }
              }
            }
            .__des {
              width: 100%;
              min-height: 17vh;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
              font-weight: 600;
              color: #000;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-word;
              display: -webkit-box;
              -webkit-line-clamp: 5; // 원하는 라인수
              -webkit-box-orient: vertical;
            }
            .detail__video {
              display: none !important;
              padding-top: 56.25%;
              position: relative;
              iframe {
                border-radius: 10px;
                background: black;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .mv__detail__info.movie_info_video {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 3rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        // .__close {
        //   position: absolute;
        //   z-index: 200;
        //   // right: 20px;
        //   right: 15px;
        //   top: 60px;
        // color: #000;
        //   span {
        //     font-size: 40px;
        //     cursor: pointer;
        //     transition: .3s;
        //     transform: rotate(0);
        //     &:hover {
        //       transition: .3s;
        //       transform : rotate(180deg);
        //     }
        //   }
        // }
        .detail__video {
          padding-top: 56.25%;
          position: relative;
          iframe {
            border-radius: 10px;
            background: black;
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
      .mv__detail__info.movie_info_trand {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .detail__info {
          display: flex;
          .detail__text {
            width: 100%;
            padding-left: 0 !important;
            .detail__poster {
              margin-top: 10px;
              width: 100% !important;
              border-radius: 10px;
            }
            .__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .__title {
                font-size: 30px;
                font-weight: 600;  
                color: #000;
              }
              .__close {
                
                span {
                  font-size: 40px;
                  cursor: pointer;
                  transition: .3s;
                  transform: rotate(0);
                  &:hover {
                    transition: .3s;
                    transform : rotate(180deg);
                  }
                }
              }
            }
            .__des {
              width: 100%;
              min-height: 17vh;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
              font-weight: 600;
              color: #000;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-word;
              display: -webkit-box;
              -webkit-line-clamp: 5; // 원하는 라인수
              -webkit-box-orient: vertical;
            }
            .detail__video {
              display: none !important;
              padding-top: 56.25%;
              position: relative;
              iframe {
                border-radius: 10px;
                background: black;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .mv__img {
    height: 30vh !important;
    img {
      padding-top: 5rem !important;
      width: 100% !important;
    }
  }
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
        .skeleton__poster {
          width: 25vw !important;
          height: 25vh !important;
        }
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
        .mv__next {
          span {
            font-size: 10vw !important;
          }
        }
      }
      .video__swiper {
        height: 35vh !important;
      }
    }
    .mv__first {
      position: relative;
      // movie__detail__info
      .mv__detail__info {
        animation: fadeOut 1s;
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 100%);
          }
        }
        display: none;

      }
      .mv__detail__info.movie_info_new {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .detail__info {
          display: flex;
          .detail__text {
            width: 100%;
            padding-left: 0 !important;
            .detail__poster {
              margin-top: 10px;
              width: 100% !important;
              border-radius: 10px;
            }
            .__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .__title {
                font-size: 30px;
                font-weight: 600;  
                color: #000;
              }
              .__close {
                
                span {
                  font-size: 40px;
                  cursor: pointer;
                  transition: .3s;
                  transform: rotate(0);
                  &:hover {
                    transition: .3s;
                    transform : rotate(180deg);
                  }
                }
              }
            }
            .__des {
              width: 100%;
              min-height: 17vh;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
              font-weight: 600;
              color: #000;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-word;
              display: -webkit-box;
              -webkit-line-clamp: 5; // 원하는 라인수
              -webkit-box-orient: vertical;
            }
            .detail__video {
              display: none !important;
              padding-top: 56.25%;
              position: relative;
              iframe {
                border-radius: 10px;
                background: black;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .mv__detail__info.movie_info_popular {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .detail__info {
          display: flex;
          .detail__text {
            width: 100%;
            padding-left: 0 !important;
            .detail__poster {
              margin-top: 10px;
              width: 100% !important;
              border-radius: 10px;
            }
            .__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .__title {
                font-size: 30px;
                font-weight: 600;  
                color: #000;
              }
              .__close {
                
                span {
                  font-size: 40px;
                  cursor: pointer;
                  transition: .3s;
                  transform: rotate(0);
                  &:hover {
                    transition: .3s;
                    transform : rotate(180deg);
                  }
                }
              }
            }
            .__des {
              width: 100%;
              min-height: 17vh;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
              font-weight: 600;
              color: #000;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-word;
              display: -webkit-box;
              -webkit-line-clamp: 5; // 원하는 라인수
              -webkit-box-orient: vertical;
            }
            .detail__video {
              display: none !important;
              padding-top: 56.25%;
              position: relative;
              iframe {
                border-radius: 10px;
                background: black;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .mv__detail__info.movie_info_video {
        display: block;
        width: 90vw !important;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 1rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        // .__close {
        //   position: absolute;
        //   z-index: 200;
        //   // right: 20px;
        //   right: 15px;
        //   top: 60px;
        // color: #000;
        //   span {
        //     font-size: 40px;
        //     cursor: pointer;
        //     transition: .3s;
        //     transform: rotate(0);
        //     &:hover {
        //       transition: .3s;
        //       transform : rotate(180deg);
        //     }
        //   }
        // }
        .detail__video {
          padding-top: 56.25%;
          position: relative;
          iframe {
            border-radius: 10px;
            background: black;
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
      .mv__detail__info.movie_info_trand {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .detail__info {
          display: flex;
          .detail__text {
            width: 100%;
            padding-left: 0 !important;
            .detail__poster {
              margin-top: 10px;
              width: 100% !important;
              border-radius: 10px;
            }
            .__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .__title {
                font-size: 30px;
                font-weight: 600;  
                color: #000;
              }
              .__close {
                
                span {
                  font-size: 40px;
                  cursor: pointer;
                  transition: .3s;
                  transform: rotate(0);
                  &:hover {
                    transition: .3s;
                    transform : rotate(180deg);
                  }
                }
              }
            }
            .__des {
              width: 100%;
              min-height: 17vh;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
              font-weight: 600;
              color: #000;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-word;
              display: -webkit-box;
              -webkit-line-clamp: 5; // 원하는 라인수
              -webkit-box-orient: vertical;
            }
            .detail__video {
              display: none !important;
              padding-top: 56.25%;
              position: relative;
              iframe {
                border-radius: 10px;
                background: black;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  } 
}
  .mv__img {
    height: 50vh;
    background-image: url('https://www.justwatch.com/appassets/img/home/bg-tiles/bg-tiles.webp');
    background-repeat: no-repeat;
    background-position: center;
    // background-size: 100%;
    img {
      width: 100%;
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
        // padding-top: 30px;
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
        .skeleton__poster {
          width: 10vw;
          height: 30vh;
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
        .mv__video {
          position: relative;
          padding-bottom: 50px;
          width: 30vw;
          height: 30vh;
          transition: all 0.3s ease;
          .mv__box {
            position: relative;
            width: 100%;
            height: 100%;
            &:hover {
              transform: scale(1.1);
              transition: all 0.3s ease;
              z-index: 100;
              cursor: pointer;
            }
            .mv__video__poster {
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
            .mv__video__title {
              padding-top: 10px;
              color: #fff;
              font-size: 25px;
              text-align: center;
            }
            .mv__play {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 5em;
              color: #d50000;
            }
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
        height: 45vh;
        iframe {
          width: 100%;
          height: 100%;
        }
      }
    }
    .mv__first {
      position: relative;

      // movie__detail__info
      .mv__detail__info {
        animation: fadeOut 1s;
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 100%);
          }
        }
        display: none;

      }
      .mv__detail__info.movie_info_new {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .detail__info {
          display: flex;
          .detail__box {
            position: relative;
            .detail__poster {
              width: 25vw;
              height: 100%;
              border-radius: 10px;
            }
            .detail__btn {
              position: absolute;
              right: 10px;
              bottom: 10px;
              width: 6rem;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 2rem;
              border-radius: 5px;
              background-image: linear-gradient(to right, #434343 0%, black 100%);
              color: #fff;
              font-weight: bold;
              cursor: pointer;
              transition: .2s;
              &:hover {
                transition: .2s;
                transform: scale(1.1);
              }
            }
          }
          .detail__text {
            width: 100%;
            padding-left: 20px;
            .__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .__title {
                font-size: 30px;
                font-weight: 600;  
                color: #000;
              }
              .__close {
                
                span {
                  font-size: 40px;
                  cursor: pointer;
                  transition: .3s;
                  transform: rotate(0);
                  &:hover {
                    transition: .3s;
                    transform : rotate(180deg);
                  }
                }
              }
            }
            .detail__box {
              position: relative;
              .detail__poster {
                width: 25vw;
                height: 100%;
                border-radius: 10px;
              }
              .detail__btn {
                position: absolute;
                right: 10px;
                bottom: 10px;
                width: 6rem;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 2rem;
                border-radius: 5px;
                background-image: linear-gradient(to right, #434343 0%, black 100%);
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                transition: .2s;
                &:hover {
                  transition: .2s;
                  transform: scale(1.1);
                }
              }
            }
            .__des {
              min-height: 17vh;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
              font-weight: 600;
              color: #000;
            }
            .detail__video {
              padding-top: 56.25%;
              position: relative;
              iframe {
                border-radius: 10px;
                background: black;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .mv__detail__info.movie_info_popular {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .detail__info {
          display: flex;
          .detail__box {
            position: relative;
            .detail__poster {
              width: 25vw;
              height: 100%;
              border-radius: 10px;
            }
            .detail__btn {
              position: absolute;
              right: 10px;
              bottom: 10px;
              width: 6rem;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 2rem;
              border-radius: 5px;
              background-image: linear-gradient(to right, #434343 0%, black 100%);
              color: #fff;
              font-weight: bold;
              cursor: pointer;
              transition: .2s;
              &:hover {
                transition: .2s;
                transform: scale(1.1);
              }
            }
          }
          .detail__text {
            width: 100%;
            padding-left: 20px;
            .__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .__title {
                font-size: 30px;
                font-weight: 600;  
                color: #000;
              }
              .__close {
                span {
                  font-size: 40px;
                  cursor: pointer;
                  transition: .3s;
                  transform: rotate(0);
                  color: #000;
                  &:hover {
                    transition: .3s;
                    transform : rotate(180deg);
                  }
                }
              }
            }
            .detail__box {
              position: relative;
              .detail__poster {
                width: 25vw;
                height: 100%;
                border-radius: 10px;
              }
              .detail__btn {
                position: absolute;
                right: 10px;
                bottom: 10px;
                width: 6rem;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 2rem;
                border-radius: 5px;
                background-image: linear-gradient(to right, #434343 0%, black 100%);
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                transition: .2s;
                &:hover {
                  transition: .2s;
                  transform: scale(1.1);
                }
              }
            }
            .__des {
              min-height: 17vh;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
              font-weight: 600;
              color: #000;
            }
            .detail__video {
              padding-top: 56.25%;
              position: relative;
              iframe {
                border-radius: 10px;
                background: black;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .mv__detail__info.movie_info_video {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 3rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        // .__close {
        //   position: absolute;
        //   z-index: 200;
        //   // right: 20px;
        //   right: 15px;
        //   top: 60px;
        color: #000;
        //   span {
        //     font-size: 40px;
        //     cursor: pointer;
        //     transition: .3s;
        //     transform: rotate(0);
        //     &:hover {
        //       transition: .3s;
        //       transform : rotate(180deg);
        //     }
        //   }
        // }
        .detail__video {
          padding-top: 56.25%;
          position: relative;
          iframe {
            border-radius: 10px;
            background: black;
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
      .mv__detail__info.movie_info_trand {
        display: block;
        width: 80vw;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .detail__info {
          display: flex;
          .detail__box {
            position: relative;
            .detail__poster {
              width: 25vw;
              height: 100%;
              border-radius: 10px;
            }
            .detail__btn {
              position: absolute;
              right: 10px;
              bottom: 10px;
              width: 6rem;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 2rem;
              border-radius: 5px;
              background-image: linear-gradient(to right, #434343 0%, black 100%);
              color: #fff;
              font-weight: bold;
              cursor: pointer;
              transition: .2s;
              &:hover {
                transition: .2s;
                transform: scale(1.1);
              }
            }
          }
          .detail__text {
            width: 100%;
            padding-left: 20px;
            .__header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .__title {
                font-size: 30px;
                font-weight: 600;  
                color: #000;
              }
              .__close {
                
                span {
                  font-size: 40px;
                  cursor: pointer;
                  transition: .3s;
                  transform: rotate(0);
                  color: #000;
                  &:hover {
                    transition: .3s;
                    transform : rotate(180deg);
                  }
                }
              }
            }
            .detail__box {
              position: relative;
              .detail__poster {
                width: 25vw;
                height: 100%;
                border-radius: 10px;
              }
              .detail__btn {
                position: absolute;
                right: 10px;
                bottom: 10px;
                width: 6rem;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 2rem;
                border-radius: 5px;
                background-image: linear-gradient(to right, #434343 0%, black 100%);
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                transition: .2s;
                &:hover {
                  transition: .2s;
                  transform: scale(1.1);
                }
              }
            }
            .__des {
              min-height: 17vh;
              padding-top: 20px;
              padding-bottom: 20px;
              font-size: 19px;
              font-weight: 600;
              color: #000;
            }
            .detail__video {
              padding-top: 56.25%;
              position: relative;
              iframe {
                border-radius: 10px;
                background: black;
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>