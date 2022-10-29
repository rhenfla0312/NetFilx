<script>
import axios from 'axios';
export default {
  data() {
    return {
      SEARCH_URL : 'https://api.themoviedb.org/3/search/multi',

      API_KEY : 'e95aab0b32ea685f4064a7364dec77f4',

      searchData : false,
      searchItem : '',
      searchs : '',
      searchFile : [],
      page_searchFile : [],

      mobile__check : false,
      mobile__movie__check : false,
      mobile__tv__check : false,

      login_check : false,

      CHECK_DATA : ""
    }
  },
  methods: {
    searchText() {
      this.searchData = true;
    },
    login() {
      alert("준비중");
    },
    async search() {
      await axios.get(`${this.SEARCH_URL}?api_key=${this.API_KEY}&language=ko&query=${this.searchs}`)
        .then((res) => {
          console.log(res)
          this.searchFile = res.data.results;
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
          this.$router.push({
            name: "Search",
            params: {
              title : this.searchs,
              searchFile : JSON.stringify(this.searchFile),
              CHECK_DATA : this.searchFile[0].media_type
            }
          })
        }).catch((error) => {
          console.log(error)
        })
    },
    loginCheck() {
      // 조건으로 로그인 인증 로직 구현
      this.login_check = true;
    },
    mobileBtn() {
      this.mobile__check = !this.mobile__check;
    },
    mobileMovieBtn() {
      this.mobile__movie__check = !this.mobile__movie__check;
    },
    mobileTvBtn() {
      this.mobile__tv__check = !this.mobile__tv__check;
    }
  },
  updated() {
    // window.addEventListener('click', (e) => {
    //   if(this.$refs.searchText) {
    //     // console.log('window-hover')
    //     this.searchData = true;
    //     console.log(this.searchData);
    //   } else {
    //     // console.log('window-blur');
    //     this.searchData = false;
    //     console.log(searchData);
    //   }
    // })
  }
}
</script>

<template>
  <div class="mv__header">
    <div class="mv__menu">
      <RouterLink class="__title" to="/">SPMV</RouterLink>
      <RouterLink to="/new" class="__movie">신규</RouterLink>
      <RouterLink to="/popular" class="__tv">인기</RouterLink>
      <div class="__searchBox" :class="{ searchData }">
        <input type="text" class="__searchText" ref="searchText" :class="{ searchData }" v-model="searchs" @keydown.enter="search()" @click="searchText()" />
        <div class="__search"><span @click="search()" class="material-symbols-outlined">search</span></div>
      </div>
      <div v-if="login_check" class="__myInfo">Y</div>
      <div v-else class="__myInfo __login" @click="login()">로그인</div>
      <!-- mobile -->
      <div class="mobileMenu"><span @click="mobileBtn()" class="material-symbols-outlined">menu</span></div>
      <!-- <div class="mobile__list" :class="{ mobile__check }">
        <div class="mobile__myInfo">내정보</div>
        <div class="mobile__movie">
          <div class="big__mobile__movie" @click="mobileMovieBtn()">영화</div>
          <div class="small__mobile__movie" :class="{ mobile__movie__check }">
            <div class="item movie__upcoming">개봉예정</div>
            <div class="item movie__popular">인기</div>
            <div class="item movie__trand">실시간 급상승</div>
          </div>
        </div>
        <div class="big__mobile__tv" @click="mobileTvBtn()">TV프로그램</div>
        <div class="small__mobile__tv" :class="{ mobile__tv__check }">
          <div class="item tv__upcoming">개봉예정</div>
          <div class="item tv__popular">인기</div>
          <div class="item tv__trand">실시간 급상승</div>
        </div>
      </div> -->
    </div>
  </div>
</template>


<style lang="scss">
// font
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&family=Source+Sans+Pro:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

@media screen and (max-width: 1024px) {
  .mv__header {
    .mv__menu {
      font-size: 3vw !important;
      height: 7vh !important;
      .__movie {
        font-size: 2vw !important;
      }
      .__tv {
        font-size: 2vw !important;
      }
      .__searchBox {
        height: 3.3vh !important;
        position: relative;
        display: flex;
        margin-left: auto;
        outline: none;
        border: none;
        margin-right: 2vw !important;
        margin-left: 10vw !important;
        .__search {
          display: flex;
          justify-content: center;
          align-items: center;
          // margin-left: auto;
          margin-top: 0.1vw;
          position: absolute;
          right: 1vw;
          z-index: 200;
          color: #000;
          top: 0;
          bottom: 0;
          margin: auto;
          span {
            cursor: pointer;
            font-size: 3.4vw !important;
          }
        }
        .__searchText {
          width: 50%;
          height: 3.3vh !important;
          border-radius: 5px;
          margin-left: auto;
          opacity: 1;
          transition: .4s;
          outline: none;
          border: none;
          color: #eeeeee;
          background: #fff;
          // background: #10161d;
        }
        .__searchText.searchData {
          width: 100% !important;
        }
      }
      .__searchBox.searchData {
        width: 30% !important;
      }
      .__myInfo {
        width: 3vw !important;
        height: 3vw !important;
        font-size: 2vw !important;
      }
      .__login {
        border-radius: 5px !important;
        width: 8vw !important;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .mv__header {
    // height: 10vh !impo/rtant;
    .mv__menu {
      font-size: 5vw !important;
      height: 5vh !important;
      .__title {
        margin-right: auto !important;
        margin-left: 7vw !important;
      }
      .__movie {
        display: none;
      }
      .__tv {
        display: none;
      }
      .__searchBox {
        height: 2.5vh !important;
        position: relative;
        display: flex;
        margin-left: auto;
        outline: none;
        border: none;
        margin-right: 5vw !important;
        margin-left: 10vw !important;
        .__search {
          display: flex;
          justify-content: center;
          align-items: center;
          // margin-left: auto;
          margin-top: 0.1vw;
          position: absolute;
          right: 1vw;
          z-index: 200;
          color: #000;
          top: 0;
          bottom: 0;
          margin: auto;
          span {
            cursor: pointer;
            font-size: 5vw !important;
          }
        }
        .__searchText {
          width: 50%;
          height: 2.5vh !important;
          border-radius: 5px;
          margin-left: auto;
          opacity: 1;
          transition: .4s;
          outline: none;
          border: none;
          color: #eeeeee;
          background: #fff;
          // background: #10161d;
        }
        .__searchText.searchData {
          width: 100% !important;
        }
      }
      .__searchBox.searchData {
        width: 50% !important;
      }
      .__myInfo {
        display: none !important;
        margin-right: 7vw !important;
        width: 5vw !important;
        height: 5vw !important;
        font-size: 3vw !important;
      }
      .mobileMenu {
        margin-right: 7vw !important;
        display: block !important;
        span {
          font-size: 6vw !important;
          transform: rotate(0);
          transition: .3s;
          &:hover {
            transform: rotate(180deg);
            transition: .3s;
          }
        }
      }
      .mobile__list.mobile__check {
        transition: .3s !important;
        width: 300px !important;
        opacity: 1 !important;
      }
      .small__mobile__movie.mobile__movie__check {
        height: 20vh !important;
        opacity: 1 !important;
        transition: .2s !important;
        cursor: pointer;
      }
      .small__mobile__tv.mobile__tv__check {
        height: 20vh !important;
        opacity: 1 !important;
        transition: .2s !important;
        cursor: pointer;
      }
    }
  }
}

a {
  color: #fff !important;
  text-decoration: none !important;
}

.mv__header {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-family: 'Orbitron', sans-serif;
  // height: 10vh;
  .mv__menu {
    width: 100vw;
    height: 7vh;
    border-bottom: 1px solid #060d17;
    background-color: #060d17;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 10000;
    color: #fff;
    font-size: 2vw;
    text-align: center;
    .__title {
      margin-left: 6vw;
      margin-right: 5vw;
      cursor: pointer;
    }
    .__movie {
      margin-right: 3vw;
      font-size: 1vw;
      // margin-top: 0.2vw;
      cursor: pointer;

    }
    .__tv {
      font-size: 1vw;
      cursor: pointer;
    }
    .__searchBox {
      height: 4.2vh;
      position: relative;
      display: flex;
      margin-left: auto;
      outline: none;
      border: none;
      margin-right: 2vw;
      .__search {
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-left: auto;
        margin-top: 0.1vw;
        position: absolute;
        right: 1vw;
        z-index: 200;
        color: #797a7b;
        top: 0;
        bottom: 0;
        margin: auto;
        span {
          cursor: pointer;
          font-size: 2vw;
        }
      }
      .__searchText {
        width: 50%;
        border-radius: 5px;
        margin-left: auto;
        opacity: 1;
        transition: .4s;
        font-size: 25px;
        outline: none;
        border: none;
        color: #797a7b;
        // background: #fff;
        background: #10161d;
      }
      .__searchText.searchData {
        width: 100% !important;
      }
    }
    .__searchBox.searchData {
      width: 50% !important;
    }
    .__myInfo {
      margin-right: 6vw;
      cursor: pointer;
      background: #fff;
      border-radius: 50%;
      width: 2vw;
      height: 2vw;
      color: #000;
      font-size: 1vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .__login {
      border-radius: 5px;
      width: 6rem;
      transition: .2s;
      &:hover {
        transform: scale(1.1);
        transition: .2s;
      }
    }
    .mobileMenu {
      display: none;
      margin-right: 6vw;
      cursor: pointer;
      font-size: 1vw;
    }
    .mobile__list {
      position: absolute;
      top: 11.7vw;
      right: 0;
      width: 0;
      opacity: 0;
      transition: .3s;
      font-size: 3vw;
      background: rgba(0, 0, 0, 0.35);
      height: 100vh;
      .mobile__myInfo {
        padding: 2em;
        cursor: pointer;
        &:hover {
        background: rgba(0, 0, 0, 0.90);
        }
      }
      .big__mobile__movie {
        cursor: pointer;
        padding: 1em;
        font-weight: bold;
      }
      .big__mobile__tv {
        cursor: pointer;
        // movie 요소로 가려지는 버그발생 -> z-index 부여
        position: relative;
        font-weight: bold;
        padding: 1em;
        z-index: 100;
      }
      .small__mobile__movie {
        height: 0;
        opacity: 0;
        transition: .2s;
        .item {
          padding: 1em;
          &:hover {
            background: rgba(0, 0, 0, 0.90);
          }
        }
      }
      .small__mobile__tv {
        height: 0;
        opacity: 0;
        transition: .2s;
        .item {
          padding: 1em;
          &:hover {
            background: rgba(0, 0, 0, 0.90);
          }
        }
      }
    }
  }
}
</style>