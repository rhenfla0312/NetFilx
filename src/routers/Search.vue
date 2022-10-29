<script>
import axios from 'axios';
export default {
  data() {
    return {
      SEARCH_URL : 'https://api.themoviedb.org/3/search/multi',
      // 개봉예정 URL
      SEARCH_MOVIE_URL : 'https://api.themoviedb.org/3/movie/popular', 
      SEARCH_TV_URL : 'https://api.themoviedb.org/3/tv/popular',

      // 관련 영화 및 티비
      SEARCH_INFO_URL : 'https://api.themoviedb.org/3/movie',

      // KEY
      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',
      
      // IMG_URL
      SEARCHR_IMG : 'https://image.tmdb.org/t/p/original',

      // DATA
      SEARCH_TITLE : this.$route.params.title,

      SEARCH_FILE : [],

      CHECK_DATA : "",

      skeleton : false

    }
  },
  methods: {
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
  updated() {
    // if(this.PAGE_SEARCH_DATA !== "") {
      //   // search는 무한스크롤 잠시 대기 -> 객체에 영화, tv 구분자가 있는지 찾아본다
      //   // 문제 - 상세정보 들어갔다가 뒤로가기하면 초기화 -> store에 상태 저장하기
      //   const io = new IntersectionObserver((entries, observer) => {
        //     entries.forEach(entry => {
          //       if (entry.isIntersecting) { // 감지대상이 교차영역에 진입 할 경우
            // this.page_skeleton = true;
            //         this.SEARCH_DATA = this.SEARCH_DATA.concat(this.PAGE_SEARCH_DATA)
            // this.page_skeleton = false;
    //         observer.unobserve(entry.target); // 이미지 로딩 이후론 관찰할 필요 x
    //       }
    //     })
    //   })
  
    //   const search = document.querySelector('.search__item__plus');
    //   io.observe(search)
    // }
  },
  async mounted() {
    await axios.get(`${this.SEARCH_URL}?api_key=${this.API_KEY}&language=ko&query=${this.SEARCH_TITLE}`)
      .then((res) => {
        console.log(res)
        this.SEARCH_FILE = res.data.results;
        this.CHECK_DATA = res.data.results[0].media_type;
        // if(res.data.total_pages > 1) {
        //   // 불러는 와지는데 다 불러와지기전에 데이터가 router로 넘어간다 -> 순서보장 반복문으로 처리하기전까진 검색데이터 페이지네이션 중지
        //   for(let i = 2; i <= res.data.total_pages; i++) {
        //     axios.get(`${this.SEARCH_URL}?api_key=${this.API_KEY}&language=ko&query=${this.searchs}&page=${i}`)
        //     .then((res) => {
        //       this.searchFile = this.searchFile.concat(res.data.results)
        //     }).catch((error) => {
        //       console.log(error)
        //     })
        //   }
        // }
      }).catch((error) => {
        console.log(error)
      })
  }
}
</script>


<template>
  <div class="search">
    <div class="search__list">
      <div class="search__item">
        <div class="__item" v-for="item in SEARCH_FILE" :key="item" @click="detail(item.id)">
          <img v-if="SEARCH_TITLE" :src="`${SEARCHR_IMG}/${item.poster_path}`" onerror="this.src='/public/no_image.png'" />
          <div v-else :class="{ page_skeleton }" class="__skeleton"></div>
        </div>
        <div class="search__item__plus"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search {
    padding-top: 4.1rem;
    // height: 100vh;
    background: #060d17;
    min-height: 100vh;
    .search__list {
      padding-top: 10vh;
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
      .search__item {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(6, 1fr);
        justify-items: center;
        .__item {
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
          .__skeleton.page_skeleton {
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
    .search {
      padding-top: 2.9rem !important;
      .search__list {
        width: 90vw;
        margin: auto;
        .search__item {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(3, 1fr);
          justify-items: center;
          .__item {
            .__skeleton {
              width: 28vw !important;
              height: 35vw !important;
            }
            .__skeleton.page_skeleton {
              width: 28vw !important;
              height: 35vw !important;
            }
            img {
              width: 28vw !important;
              height: 35vw !important;
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