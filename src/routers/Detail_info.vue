<script>
import axios from 'axios';
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
      MOVIE_INFO_URL : 'https://api.themoviedb.org/3/movie',

      // KEY -> env로 관리하기
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',

      // IMG_URL
      MOVIE_IMG : 'https://image.tmdb.org/t/p/original',

      ID : this.$route.params.id,
      detail_data: {},
      detail_similar_Data : [],
      detail_video: "",
      detail_data_genres : "",

      video_check: false,
      displaySize : 0,

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
    detail__video__play() {
      this.video_check = true;
    },
    // detail page
    detail(id) {
      this.$router.push({
        name: "DetailInfo",
        params: {
          id: id
        }
      })
      setTimeout(() => {
        this.$router.go();
      },10) 
    },
  },
  async mounted() {
    this.displaySize = window.innerWidth;

    try {
      // id에 맞는 정보 가져오기
      await axios.get(`${this.MOVIE_INFO_URL}/${this.ID}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        console.log(res)
        this.detail_data = res.data
        this.detail_data_genres = res.data.genres[0].name
      }).catch((error) => {
        console.log(error)
      })
  
      // id에 맞는 영상 가져오기
      await axios.get(`${this.MOVIE_INFO_URL}/${this.ID}/videos?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        console.log(res)
        if(res.data.results.length > 0) {
          this.detail_video = res.data.results[0].key
        } 
      }).catch((error) => {
        console.log(error)
      })

      // id에 맞는 비슷한 영상 가져오기
      await axios.get(`${this.MOVIE_INFO_URL}/${this.ID}/recommendations?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        console.log(res)
        this.detail_similar_Data = res.data.results
      }).catch((error) => {
        console.log(error)
      })

    } catch(e) {
      console.error(e);
    }
  }
}
</script>


<template>
  <div class="mv__detail">
    <div class="detail__box">
      <div class="detail__bg" :style="{ 'backgroundImage' : `url(${MOVIE_IMG}/${detail_data.backdrop_path})` }">
        <span class="material-symbols-outlined mv__play" :class="{ video_check }" @click="detail__video__play()">youtube_activity</span>
        <!-- 버튼 클릭시 유튜브 재생 -->
        <iframe class="detail__video" :class="{ video_check }" :src="`https://www.youtube.com/embed/${detail_video}`"></iframe>
      </div>
      <div class="detail__info">
        <div class="__info">
          <div class="__first">
            <div class="__poster">
              <img :src="`${MOVIE_IMG}/${detail_data.poster_path}`" alt="">
            </div>
            <div class="__text">
              <div class="__title">{{detail_data.title }}</div>
              <div class="__des">{{ detail_data.overview}}</div>
            </div>
          </div>
          <!-- second -> 나중에 반복문으로 돌릴예정 -->
          <div class="__second">
            <div class="__left">
              <hr />
              <div class="date">
                <div class="date__text">개봉일 : </div>
                <div class="date__item">{{ detail_data.release_date }}</div>
              </div>
              <div class="genres">
                <div class="genres__text">장르 : </div>
                <div class="genres__item">{{ detail_data_genres }}</div>
              </div>
              <div class="runtime">
                <div class="runtime__text">시간 : </div>
                <div class="runtime__item">{{ detail_data.runtime }}</div>
              </div>
              <div class="like">
                <div class="like__text">평점 : </div>
                <div class="like__item">{{ detail_data.vote_average }}</div>
              </div>
            </div>
            <div class="__right">
              <div class="detail__title">관련영화</div>
              <swiper class="first__swiper" :slides-per-view="(displaySize > 1024) ? 4.2 : 3.2" :space-between="30" :modules="modules" Navigation="false">
                <swiper-slide v-for="movie in detail_similar_Data" :key="movie" @click="detail(movie.id)">
                  <img class="detail__poster" :src="`${this.MOVIE_IMG}/${movie.poster_path}`">
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .mv__detail {
    padding-top: 5.9rem;
    .detail__box {
      position: relative;
      .detail__bg {
        position: relative;
        height: 40vh;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        .mv__play {
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #d50000;
          font-size: 100px;
          transition: .3s;
          cursor: pointer;
          &:hover {
            font-size: 110px;
            transition: .3s;
          }
        }
        .mv__play.video_check {
          display: none;
        }
        .detail__video {
          display: none;
          position: absolute;
          width: 70%;
          height: 100%;
          left: 0;
          right: 0;
          margin: auto;
        }
        .detail__video.video_check {
          display: block;
        }
      }
      .detail__info {
        background: #060d17;
        position: relative;
        z-index: 50;
        width: 80vw;
        margin: -5vh auto 0;
        border-radius: 30px 30px 0 0;
        .__info {
          width: 100%;
          height: 100%;
          padding: 5rem;
          .__first {
            display: flex;
            .__poster {
              width: 20vw;
              height: 50vh;
              img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
              }
            }
            .__text {
              padding-left: 5rem;
              width: 50vw;
              height: 50vh;
              .__title {
                font-size: 30px;
                color: #fff;
              }
              .__des {
                padding-top: 3rem;
                font-size: 20px;
                color: #fff;
              }
            }
          }
          .__second {
            padding-top: 1rem;
            display: flex;
            width: 100%;
            .__left {
              width: 20vw;
              hr {
                color: red;
              }
              .date {
                font-size: 20px;
                color: #fff;
                display: flex;
                .date__text {
                  width: 50%;
                }
                .date__item {
                  width: 50%;
                }
              }
              .genres {
                font-size: 20px;
                color: #fff;
                display: flex;
                .genres__text {
                  width: 50%;
                }
                .genres__item {
                  width: 50%;
                }
              }
              .runtime {
                font-size: 20px;
                color: #fff;
                display: flex;
                .runtime__text {
                  width: 50%;
                }
                .runtime__item {
                  width: 50%;
                }
              }
              .like {
                font-size: 20px;
                color: #fff;
                display: flex;
                .like__text {
                  width: 50%;
                }
                .like__item {
                  width: 50%;
                }
              }
            }
            .__right {
              padding-left: 5rem;
              width: 50vw;
              .detail__title {
                padding-top: 1rem;
                font-size: 30px;
                color: #fff;
              }
              .swiper-slide {
                padding-top: 1rem;
                padding-bottom: 1rem;
                .detail__poster {
                  width: 10vw;
                  border-radius: 10px;
                  cursor: pointer;
                  transition: .2s;
                  &:hover {
                    transform: scale(1.1);
                    transition: .2s;
                  }
                }
              }
            }
          }
        }
      }
    }
  }



  @media screen and (max-width: 768px) {
    .mv__detail {
      padding-top: 4.7rem;
      .detail__box {
        .detail__bg {
          height: 30vh;
          background-position: center;
          background-size: auto !important;
          .mv__play {
            display: block;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #d50000;
            font-size: 100px;
            transition: .3s;
            cursor: pointer;
            &:hover {
              font-size: 110px;
              transition: .3s;
            }
          }
          .mv__play.video_check {
            display: none;
          }
          .detail__video {
            display: none;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            margin: auto;
          }
          .detail__video.video_check {
            display: block;
          }
        }
        .detail__info {
          width: 90vw !important;
          z-index: 100 !important;
          .__info {
            padding: 2rem !important;
            .__first {
              display: block !important;
              .__poster {
                width: 100%;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 10px;
                }
              }
              .__text {
                padding-left: 0 !important;
                padding-top: 1rem;
                width: 100% !important;
                // width: 50vw;
                height: 30vh !important;
                text-align: center;
                .__title {
                  font-size: 30px;
                  color: #fff;
                }
                .__des {
                  padding-top: 3rem;
                  font-size: 20px;
                  color: #fff;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-word;
                  display: -webkit-box;
                  -webkit-line-clamp: 5; // 원하는 라인수
                  -webkit-box-orient: vertical;
                }
              }
            }
            .__second {
              padding-top: 1rem;
              display: block;
              width: 100%;
              .__left {
                width: 100% !important;
                hr {
                  color: red;
                }
                .date {
                  font-size: 20px;
                  color: #fff;
                  display: flex;
                  .date__text {
                    width: 50%;
                  }
                  .date__item {
                    width: 50%;
                  }
                }
                .genres {
                  font-size: 20px;
                  color: #fff;
                  display: flex;
                  .genres__text {
                    width: 50%;
                  }
                  .genres__item {
                    width: 50%;
                  }
                }
                .runtime {
                  font-size: 20px;
                  color: #fff;
                  display: flex;
                  .runtime__text {
                    width: 50%;
                  }
                  .runtime__item {
                    width: 50%;
                  }
                }
                .like {
                  font-size: 20px;
                  color: #fff;
                  display: flex;
                  .like__text {
                    width: 50%;
                  }
                  .like__item {
                    width: 50%;
                  }
                }
              }
              .__right {
                padding-top: 3rem;
                padding-left: 0 !important;
                width: 100% !important;
                .detail__title {
                  padding-top: 1rem;
                  font-size: 30px;
                  color: #fff;
                }
                .swiper-slide {
                  padding-top: 1rem;
                  padding-bottom: 1rem;
                  .detail__poster {
                    width: 24vw !important;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: .2s;
                    &:hover {
                      transform: scale(1.1);
                      transition: .2s;
                    }
                  }
                }
              }
            }
          }
        }
      }

    }
  }
</style>


