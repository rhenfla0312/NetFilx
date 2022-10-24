<script>
export default {
  data() {
    return {
      searchData : false,
      searchItem : '',

      mobile__check : false,
      mobile__movie__check : false,
      mobile__tv__check : false,

      login_check : false
    }
  },
  methods: {
    search() {
      this.searchData = true;
      if(this.searchItem) {
        // 검색 API 요청
      }
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
}
</script>

<template>
  <div class="mv__header">
    <div class="mv__menu">
      <RouterLink class="__title" to="/">SPMV</RouterLink>
      <div class="__movie">영화</div>
      <div class="__tv">TV프로그램</div>
      <div class="__searchBox">
        <input type="text" class="__searchText" :class="{ searchData }" />
        <div class="__search" :class="{ searchData }"><span @click="search()" class="material-symbols-outlined">search</span></div>
      </div>
      <div v-if="login_check" class="__myInfo">Y</div>
      <div v-else class="__myInfo __login">로그인</div>
      <!-- mobile -->
      <div class="mobileMenu"><span @click="mobileBtn()" class="material-symbols-outlined">menu</span></div>
      <div class="mobile__list" :class="{ mobile__check }">
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
      </div>
    </div>
    <div class="mv__img">
      <img src="https://www.justwatch.com/appassets/img/home/tv/tv.webp" alt="">
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
      height: 9vh !important;
      .__title {

      }
      .__movie {
        font-size: 2vw !important;
      }
      .__tv {
        font-size: 2vw !important;
      }
      .__search {
        span {
          font-size: 4vw !important;
        }
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
    .mv__img {
      height: 70vh !important;
      img {
        // padding-top: 2rem !important;
        width: 100% !important;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .mv__header {
    // height: 10vh !impo/rtant;
    .mv__menu {
      font-size: 6vw !important;
      height: 8vh !important;
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
        height: 50%;
        .__search {
          span {
            font-size: 6vw !important;
          }
        }
        .__searchText.searchData {
          width: 70% !important;
        }
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
    .mv__img {
      height: 50vh !important;
      img {
        padding-top: 5rem !important;
        width: 100% !important;
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
    height: 10vh;
    border-bottom: 1px solid rgba(0,0,0,.35);
    background-color: rgba(0,0,0,.35);
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 100;
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
      margin-top: 0.2vw;
      cursor: pointer;

    }
    .__tv {
      font-size: 1vw;
      cursor: pointer;
    }
    .__searchBox {
      position: relative;
      display: flex;
      margin-left: auto;
      .__search {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        margin-right: 2vw;
        margin-top: 0.1vw;
        span {
          cursor: pointer;
          font-size: 2vw;
        }
      }
      .__search.searchData {
        position: absolute;
        right: 3vw;
        z-index: 200;
        color: #000;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      .__searchText {
        width: 0;
        opacity: 0;
        transition: .4s;
      }
      .__searchText.searchData {
        margin-left: auto;
        width: 100%;
        border-radius: 20px;
        outline: none;
        border: none;
        font-size: 20px;
        padding: 5px;
        opacity: 1;
        transition: .4s;
        margin-right: 2vw;
      }
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
  .mv__img {
    height: 100vh;
    background-image: url('https://www.justwatch.com/appassets/img/home/bg-tiles/bg-tiles.webp');
    background-repeat: no-repeat;
    background-position: center;
    // background-size: 100%;
    img {
      width: 100%;
    }
  }
}
</style>