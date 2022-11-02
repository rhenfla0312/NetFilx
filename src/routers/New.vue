<script>
import axios from 'axios';
export default {
  data() {
    return {
      // 개봉예정 URL
      NEW_MOVIE_URL : 'https://api.themoviedb.org/3/movie/upcoming',
      NEW_TV_URL : 'https://api.themoviedb.org/3/tv/on_the_air',

      // 관련 영화 및 티비
      NEW_INFO_URL : 'https://api.themoviedb.org/3/movie',

      // KEY
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',
      
      // IMG_URL
      NEW_IMG : 'https://image.tmdb.org/t/p/original',

      // DATA
      NEW_DATA : [],
      CHECK_DATA : "movie",

      skeleton : true,
      movie_page : 2,
      tv_page : 2,
    }
  },
  methods: {
    async movie() {
      this.skeleton = true;
      await axios.get(`${this.NEW_MOVIE_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        console.log(res);
        this.skeleton = false;
        this.NEW_DATA = res.data.results;
      }).catch((error) => {
        console.log(error)
      })
      this.CHECK_DATA = "movie";
    },
    async tv() {
      this.skeleton = true;
      await axios.get(`${this.NEW_TV_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        console.log(res);
        this.skeleton = false;
        this.NEW_DATA = res.data.results;
      }).catch((error) => {
        console.log(error)
      })
      this.CHECK_DATA = "tv";
    },
    // detail page
    detail(id) {
      this.$router.push({
        name: "DetailInfo",
        params: {
          id,
          CHECK_DATA : this.CHECK_DATA
        }
      })
    },
  },
  async mounted() {
    try {
      // default -> movie
      await axios.get(`${this.NEW_MOVIE_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.NEW_DATA = res.data.results;
        setTimeout(() => {
          this.skeleton = false;
        },100)
      }).catch((error) => {
        console.log(error)
      }) 
    } catch(e) {
      console.error(e);
    }
  },
  updated() {
    // 무한스크롤에선 일단 스켈레톤을 빼자 - 전체가 스켈레톤으로 변함 (새로 가져오는거만 변해야댐)
    // 문제 - 상세정보 들어갔다가 뒤로가기하면 초기화 -> store에 상태 저장하기
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(async entry=> {
        if (entry.isIntersecting) { // 감지대상이 교차영역에 진입 할 경우
          // axios
          if(this.CHECK_DATA == "movie") {
              // this.skeleton = true;
              await axios.get(`${this.NEW_MOVIE_URL}?api_key=${this.API_KEY}&language=ko&page=${this.movie_page}`)
              .then((res) => {
                console.log(res);
                this.NEW_DATA = this.NEW_DATA.concat(res.data.results)
                // setTimeout(() => {
                //   this.skeleton = false;
                // },1000)
              }).catch((error) => {
                console.log(error)
              })
              this.movie_page++;
          } else {
            // this.skeleton = true;
            await axios.get(`${this.NEW_TV_URL}?api_key=${this.API_KEY}&language=ko&page=${this.tv_page}`)
            .then((res) => {
              this.NEW_DATA = this.NEW_DATA.concat(res.data.results)
              // setTimeout(() => {
              //   this.skeleton = false;
              // },1000)
            }).catch((error) => {
              console.log(error)
            })
            this.tv_page++;
          }
          observer.unobserve(entry.target); // 이미지 로딩 이후론 관찰할 필요 x
        }
      })
    })

    const images = document.querySelector('.new__item__plus');
    io.observe(images)
  }
}
</script>


<template>
  <div class="new">
    <div class="new__list">
      <div class="__header">
        <div class="__title">
          <div class="__movie" @click="movie()">영화</div>
          <div class="__tv" @click="tv()">TV프로그램</div>
        </div>
      </div>
      <div class="new__item">
        <div class="__item" v-for="item in NEW_DATA" :key="item" @click="detail(item.id)">
          <div v-if="skeleton" class="__skeleton"></div>
          <img v-else :src="`${NEW_IMG}/${item.poster_path}`" />
        </div>
      </div>
    </div>
    <div class="new__item__plus"></div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap');
  .new {
    padding-top: 4.1rem;
    // height: 100vh;
    background: #060d17;
    .new__list {
      width: 70vw;
      margin: auto;
      .__header {
        height: 10vh;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 22px;
        .__title {
          font-family: 'IBM Plex Sans KR', sans-serif;
          display: flex;
          .__movie {
            margin-left: 1rem;
            transition: .2s;
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
              transition: .2s;
            }
          }
          .__tv {
            margin-left: 5rem;
            transition: .2s;
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
              transition: .2s;
            }
          }
        }
      }
      .new__item {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(6, 1fr);
        justify-items: center;
        .__item {
          img {
            width: 11vw;
            height: 14vw;
            border-radius: 10px;
            transition: .2s;
            &:hover {
              cursor: pointer;
              transform: scale(1.1);
              transition: .2s;
            }
          }
          .__skeleton {
            width: 11vw;
            height: 14vw;
            border-radius: 10px;
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
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .new {
      padding-top: 4.1rem;
      // height: 100vh;
      background: #060d17;
      .new__list {
        width: 70vw;
        margin: auto;
        .__header {
          height: 10vh;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 22px;
          .__title {
            font-family: 'IBM Plex Sans KR', sans-serif;
            display: flex;
            .__movie {
              font-size: 20px;
              margin-left: 1rem;
              transition: .2s;
              cursor: pointer;
              &:hover {
                transform: scale(1.1);
                transition: .2s;
              }
            }
            .__tv {
              font-size: 20px;
              margin-left: 5rem;
              transition: .2s;
              cursor: pointer;
              &:hover {
                transform: scale(1.1);
                transition: .2s;
              }
            }
          }
        }
        .new__item {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(4, 1fr);
          justify-items: center;
          .__item {
            img {
              width: 17vw;
              height: 20vw;
              border-radius: 10px;
              transition: .2s;
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: .2s;
              }
            }
            .__skeleton {
              width: 17vw;
              height: 20vw;
              border-radius: 10px;
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
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .new {
      padding-top: 2.9rem !important;
      .new__list {
        width: 100%;
        margin: auto;
        .__header {
          height: 10vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 22px;
          .__title {
            font-family: 'IBM Plex Sans KR', sans-serif;
            display: flex;
            .__movie {
              font-size: 20px;
              margin-left: 1rem;
              transition: .2s;
              cursor: pointer;
              &:hover {
                transform: scale(1.1);
                transition: .2s;
              }
            }
            .__tv {
              font-size: 20px;
              margin-left: 5rem;
              transition: .2s;
              cursor: pointer;
              &:hover {
                transform: scale(1.1);
                transition: .2s;
              }
            }
          }
        }
        .new__item {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(3, 1fr);
          justify-items: center;
          .__item {
            img {
              width: 28vw;
              height: 25vh;
              border-radius: 10px;
              transition: .2s;
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: .2s;
              }
            }
            .__skeleton {
              width: 28vw !important;
              height: 25vh !important;
            }
          }
        }
      }
    }
  }
</style>