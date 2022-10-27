<script>
import axios from 'axios';
export default {
  data() {
    return {
      // 개봉예정 URL
      POPULAR_MOVIE_URL : 'https://api.themoviedb.org/3/movie/popular', 
      POPULAR_TV_URL : 'https://api.themoviedb.org/3/tv/popular',

      // 관련 영화 및 티비
      POPULAR_INFO_URL : 'https://api.themoviedb.org/3/movie',

      // KEY
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',
      
      // IMG_URL
      POPULAR_IMG : 'https://image.tmdb.org/t/p/original',

      // DATA
      POPULAR_DATA : [],
      CHECK_DATA : "movie",
    }
  },
  methods: {
    async movie() {
      await axios.get(`${this.POPULAR_MOVIE_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        console.log(res);
        this.POPULAR_DATA = res.data.results;
      }).catch((error) => {
        console.log(error)
      })
      this.CHECK_DATA = "tv";
    },
    async tv() {
      await axios.get(`${this.POPULAR_TV_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        console.log(res);
        this.POPULAR_DATA = res.data.results;
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
      await axios.get(`${this.POPULAR_MOVIE_URL}?api_key=${this.API_KEY}&language=ko`)
      .then((res) => {
        // console.log(res)
        this.POPULAR_DATA = res.data.results;
      }).catch((error) => {
        console.log(error)
      }) 
    } catch(e) {
      console.error(e);
    }
  },
  updated() {
    // 문제 - 상세정보 들어갔다가 뒤로가기하면 초기화 -> store에 상태 저장하기
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { // 감지대상이 교차영역에 진입 할 경우
          // axios
          if(this.CHECK_DATA == "movie") {
            axios.get(`${this.POPULAR_MOVIE_URL}?api_key=${this.API_KEY}&language=ko&page=2`)
            .then((res) => {
              this.POPULAR_DATA = this.POPULAR_DATA.concat(res.data.results)
              // console.log(this.new_data)
            }).catch((error) => {
              console.log(error)
            })
          } else {
            axios.get(`${this.POPULAR_TV_URL}?api_key=${this.API_KEY}&language=ko&page=2`)
            .then((res) => {
              this.POPULAR_DATA = this.POPULAR_DATA.concat(res.data.results)
              // console.log(this.new_data)
            }).catch((error) => {
              console.log(error)
            })
          }
          observer.unobserve(entry.target); // 이미지 로딩 이후론 관찰할 필요 x
        }
      })
    })

    const images = document.querySelector('.popular__item__plus');
    io.observe(images)
  }
}
</script>


<template>
  <div class="popular">
    <div class="popular__list">
      <div class="__header">
        <div class="__title">
          <div class="__movie" @click="movie()">영화</div>
          <div class="__tv" @click="tv()">TV프로그램</div>
        </div>
      </div>
      <div class="popular__item">
        <div class="__item" v-for="item in POPULAR_DATA" :key="item" @click="detail(item.id)">
          <img :src="`${POPULAR_IMG}/${item.poster_path}`" onerror="this.src='/public/no_image.png'" />
        </div>
        <div class="popular__item__plus"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .popular {
    padding-top: 4.1rem;
    // height: 100vh;
    background: #060d17;
    .popular__list {
      width: 70vw;
      margin: auto;
      .__header {
        height: 10vh;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 22px;
        .__title {
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
      .popular__item {
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
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .popular {
      padding-top: 2.9rem !important;
      .popular__list {
        width: 90vw;
        margin: auto;
        .popular__item {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(3, 1fr);
          justify-items: center;
          .__item {
            img {
              width: 28vw;
              height: 35vw;
              border-radius: 10px;
              transition: .2s;
              &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: .2s;
              }
            }
          }
        }
      }
    }
  }
</style>