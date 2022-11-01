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
      total_page : 0,

      mobile__check : false,
      mobile__movie__check : false,
      mobile__tv__check : false,

      login_check : false,
      login__layout: false,

      id: "",
      pw: "",
      token: "",
      session_id : "",

      CHECK_DATA : ""
    }
  },
  methods: {
    searchText() {
      this.searchData = true;
    },
    login() {
      this.login__layout = true;
    },
    login_close() {
      this.login__layout = false;
    },
    async search() {
      // 총 페이지 개수마 넘겨주는 용도
      await axios.get(`${this.SEARCH_URL}?api_key=${this.API_KEY}&language=ko&query=${this.searchs}`)
        .then((res) => {
          // console.log(res);
          this.total_page = res.data.total_pages;
        }).catch((error) => {
          console.log(error)
        })
      this.$router.push({
        name: "Search",
        params: {
          title : this.searchs,
          total_page : this.total_page
        }
      })
    },
    singIn() {
      alert("준비중 ㄱㄷ")
    }, 
    signUp() {
      alert("준비중 ㄱㄷ")
      // await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.API_KEY}`)
      // .then(async (res) => {
      //   console.log(res);
      //   this.token = res.data.request_token;

        
      // }).catch((error) => {
      //   console.log(error)
      // })

      // window.open(`https://www.themoviedb.org/authenticate/${this.token}`)
    
      // setTimeout(() => {
      //   axios({
      //     method: 'POST',
      //     url : `https://api.themoviedb.org/3/authentication/session/new?api_key=${this.API_KEY}`,
      //     data: {
      //       request_token: this.token
      //     }
      //   }).then((res) => {
      //     console.log(res)
      //     this.session_id = res.data.session_id;
      //     localStorage.setItem("name", this.id);
      //     localStorage.setItem("session_id", this.session_id);
      //     this.login_check = true;
      //     this.login__layout = false;
      //     document.querySelector(".__myInfo").innerText = localStorage.getItem('name');
      //   }).catch((error) => {
      //     console.log(error)
      //   })
      // },5000)
    },
    loginCheck() {
      // 조건으로 로그인 인증 로직 구현
      this.login_check = true;
    },
    mobileBtn() {
      this.mobile__check = !this.mobile__check;
    },
    new_popular() {
      this.mobile__check = false;
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
      <div v-if="login_check" class="__myInfo"></div>
      <div v-else class="__myInfo __login" @click="login()">로그인</div>
      <div class="login" :class="{ login__layout }">
        <div class="login__name">Sign In</div>
        <div class="login__close"><span class="material-symbols-outlined" @click="login_close()">close</span></div>
        <div class="login__text">
          <input class="login__id" type="text" name="id" id="id" v-model="id" />
          <input class="login__pw" type="password" name="pw" id="pw" v-model="pw" />
        </div>
        <div class="login__btn">
          <button class="btn" @click="singIn()">Sign In</button>
        </div>
        <div class="login__btn">
          <button class="btn" @click="signUp()">Sign Up</button>
        </div>
      </div>
      <!-- mobile -->
      <div class="mobileMenu"><span @click="mobileBtn()" class="material-symbols-outlined">menu</span></div>
      <div class="mobile__list" :class="{ mobile__check }">
        <!-- <div class="mobile__close"><span @click="mobileBtn()" class="material-symbols-outlined">menu</span></div> -->
        <div class="mobile__movie">
          <RouterLink to="/new" class="big__mobile__movie" @click="new_popular()">신규</RouterLink>
        </div>
        <div class="mobile__movie">
          <RouterLink to="/popular" class="big__mobile__tv" @click="new_popular()">인기</RouterLink>
        </div>
      </div>
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
        width: 3rem !important;
        font-size: 2vw !important;
      }
      .__tv {
        width: 3rem !important;
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
      .login.login__layout {
        width: 60vw !important;
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
      .login {
        position: relative;
        animation: fadeOut 1s;
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translate(-50%, 20%);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 100%);
          }
        }
        display: none;
      }
      .login.login__layout {
        display: block;
        width: 100% !important;
        height: 100vh !important;
        position: absolute;
        top: -307% !important;
        left: 50% !important;
        z-index: 1000;
        transform: translate(-50%, 20%);
        border-radius: 20px;
        padding: 2rem;
        animation: fadeInUp 1s;
        background: #060d17;
        box-shadow: 0 28px 48pxrgba(0, 0, 0, 0.4);
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            // translate(x, y)
            transform: translate(-50%, 100%);

          }
          100% {
            opacity: 1;
            transform: translate(-50%, 20%);
          }
        }
        .login__name {
          font-size: 30px;
          color: #fff;
        }
        .login__close {
          position: absolute;
          // right: 25px;
          right: 20px;
          top: 20px;
          span {
            width: 80px;
            cursor: pointer;
            font-size: 30px;
            transition: .3s;
            transform: rotate(0);
            &:hover {
              transition: .3s;
              transform: rotate(180deg);
            }
          }
        }
        .login__text {
          padding-top: 2rem;
          .login__id,
          .login__pw {
            color: #fff;
            width: 60vw !important;
            height: 5vh;
            outline: none;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            padding-left: 2rem;
            background: #1c252f;
          }
          .login__pw {
            margin-top: 1rem;
          }
        }
        .login__btn {
          padding-top: 2rem;
          .btn {
            width: 60vw !important;
            height: 5vh;
            outline: none;
            border: none;
            border-radius: 5px;
            background: #fff;
            color: #000;
            font-size: 20px;
            box-shadow: 3px 3px 3px black;
            transition-duration: .3s;
            &:active {
              box-shadow: none;
              margin-left: 1px;
              margin-top: 1px;
            }
          }
          &:last-child {
            padding-top: 1rem;
          }
        }
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
        top: 46px !important;
        transition: .3s !important;
        width: 100% !important;
        background: #060d17;
        height: 100vh;
        z-index: 300;
        opacity: 1 !important;
      }
      .mobile__close {
        span {
          margin-left: 11rem;
          font-size: 6vw !important;
          margin-top: 0.3rem;
          transition: 0.3s;
          cursor: pointer;
          transform: rotate(0);
          &:hover {
            transform: rotate(180deg);
            transition: 0.3s;
          }
        }
      }
      .mobile__movie {
        display: flex;
        justify-content: center;
        align-items: center;
        .big__mobile__movie,
        .big__mobile__tv {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
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
        padding-left: 1rem;
        width: 50%;
        border-radius: 5px;
        margin-left: auto;
        opacity: 1;
        transition: .4s;
        font-size: 25px;
        outline: none;
        border: none;
        // color: #797a7b;
        color: #fff;
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
    .login {
      position: relative;
      animation: fadeOut 1s;
      @keyframes fadeOut {
        0% {
          opacity: 1;
          transform: translate(-50%, 20%);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, 100%);
        }
      }
      display: none;
    }
    .login.login__layout {
      display: block;
      width: 35vw;
      height: 50vh;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1000;
      transform: translate(-50%, 20%);
      border-radius: 20px;
      padding: 2rem;
      animation: fadeInUp 1s;
      background: #060d17;
      box-shadow: 0 28px 48pxrgba(0, 0, 0, 0.4);
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          // translate(x, y)
          transform: translate(-50%, 100%);

        }
        100% {
          opacity: 1;
          transform: translate(-50%, 20%);
        }
      }
      .login__name {
        font-size: 30px;
        color: #fff;
      }
      .login__close {
        position: absolute;
        // right: 25px;
        right: 20px;
        top: 20px;
        span {
          width: 80px;
          cursor: pointer;
          font-size: 30px;
          transition: .3s;
          transform: rotate(0);
          &:hover {
            transition: .3s;
            transform: rotate(180deg);
          }
        }
      }
      .login__text {
        padding-top: 2rem;
        .login__id,
        .login__pw {
          color: #fff;
          width: 28vw;
          height: 5vh;
          outline: none;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          padding-left: 2rem;
          background: #1c252f;
        }
        .login__pw {
          margin-top: 1rem;
        }
      }
      .login__btn {
        padding-top: 2rem;
        .btn {
          width: 28vw;
          height: 5vh;
          outline: none;
          border: none;
          border-radius: 5px;
          background: #fff;
          color: #000;
          font-size: 20px;
          box-shadow: 3px 3px 3px black;
          transition-duration: .3s;
          &:active {
            box-shadow: none;
            margin-left: 1px;
            margin-top: 1px;
          }
        }
        &:last-child {
          padding-top: 1rem;
        }
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
      top: 46px;
      right: 0;
      width: 0;
      opacity: 0;
      transition: .3s;
      font-size: 3vw;
      background: #060d17;
      height: 100vh;
      z-index: 400;
      .mobile__myInfo {
        padding: 2em;
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, 0.90);
        }
      }
      .mobile__movie {
        height: 8vh;
        vertical-align: middle;
        cursor: pointer;
        line-height: 3;
        &:hover {
          background: rgb(0,0,0,.9);
        }
      }
    }
  }
}
</style>