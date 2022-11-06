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

      login_check : localStorage.getItem('session_id') === null && localStorage.getItem('guest_session_id') === null ? false : true,
      login__layout: false,
      singin__text: false,
      open__item: false,

      id: "",
      pw: "",
      token: "",
      request_token: "",

      session_id: "",
      guest_session_id : "",
      account_id : "",

      CHECK_DATA : "",

      // 유효성 검사
      error_id : false,
      error_pw : false,

    }
  },
  methods: {
    searchText() {
      this.searchData = true;
    },
    login() {
      this.login__layout = true;
      this.mobile__check = false;
    },
    login_close() {
      this.login__layout = false;
      this.singin__text = false;
    },
    openItem() {
      this.open__item = !this.open__item;
      this.mobile__check = false;
    },
    userInfo(e) {
      if(localStorage.getItem('guest_session_id')) {
        // guest_session_id로는 불가능하다
        // e.preventDefault();
        
        this.$swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'guest id로는 불가능합니다',
          showConfirmButton: false,
          timer: 2000
        })
      }
      this.open__item = false;
    },
    logOut() {
      this.$swal.fire({
        title: '정말 로그아웃 하시겠습니까?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'LogOut'
        }).then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire(
            '로그아웃 되셨습니다!',
          )
          localStorage.removeItem('session_id');
          localStorage.removeItem('guest_session_id');
          localStorage.removeItem('account_id');
          this.open__item = false;
          this.$router.go();
        }
      })
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
    async guest_singIn() {
      // 타이머
      let timerInterval
        this.$swal.fire({
          title: 'Auto close alert!',
          html: 'I will close in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading()
            const b = this.$swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = this.$swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
      // 게스트 세션 -> 일회용
      await axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.API_KEY}`)
      .then((res) => {
        console.log(res)
        this.guest_session_id = res.data.guest_session_id;
        localStorage.setItem('guest_session_id', this.guest_session_id)
        this.login_check = true;
        this.login__layout = false;
        this.$swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '로그인 되었습니다',
          showConfirmButton: false,
          timer: 2000
        })
      }).catch((e) => {
        console.log(e)
      })
    },
    // 하나의 async함수 내부에 await함수들이 여러개가 있다면 비동기지만 await들이 순서대로 동기적으로? 실행된다 -> await이 여러개라면 하나의 await이 전부끝나야 다음 await부분이 실행되기때문에 (하나가 끝나기도전에 다음께 실행되어 오류되는 상황) -> 이런상황은 걱정할 필요가 없다
    async singIn() {
      // 유효성 검사
      this.singin__text = true;
      if(this.id.length <= 0) {
        this.error_id = true;
      } else {
        this.error_id = false;
      }
      if(this.pw.length <= 0) {
        this.error_pw = true;
      } else {
        this.error_pw = false;
      }
      if(this.id.length > 0 && this.pw.length > 0) {
        // 타이머
        let timerInterval
          this.$swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              this.$swal.showLoading()
              const b = this.$swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = this.$swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === this.$swal.DismissReason.timer) {
              // 
            }
          })
        // 1 - 인증이 필요한 토큰 생성
        // 인증해야하는 리퀘스트 토큰 생성
        // 토큰으로 리퀘스트 토큰 생성 -> 따로 페이지 열어서 인증이 필요하다 (tmdb에선 페이지열어서 인증하는걸 권장한다)
        await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.API_KEY}`)
        .then((res) => {
          console.log(res)
          this.token = res.data.request_token;
          // 아이디로 로그인 안할경우 웹페이지로 인증(권한 허용)
          // window.open(`https://www.themoviedb.org/authenticate/${this.token}`)


        }).catch((e) => {
          console.log(e)
        })

        // 2 - 인증이 필요한 토큰을 -> 인증이 필요없는 토큰으로 생성
        // 2.1 - id, pw가 필요없는 인증된 토큰으로 로그인
        // 2.2 - id, pw로 인증이 필요없는 토큰으로 로그인 (선택)
        // 아이디로 로그인(실제 tmdb 회원가입된거여야함) -> 따로 페이지 열어서 인증 필요없음 -> 인증할필요없는 리퀘스트 토큰 생성
        // 인증안한 랜덤 리퀘스트 토큰으로 인증필요없는 리퀘스트 토큰 생성
        await axios({
          url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${this.API_KEY}`,
          method: "POST",
          data: {
            username: this.id,
            password: this.pw,
            request_token: this.token
          }
        }).then((res) => {
          console.log(res);
          this.request_token = res.data.request_token;
          // window.open(`https://www.themoviedb.org/authenticate/${this.request_token}`)

        }).catch((error) => {
          console.log(error)
        })
        // 3 - 인증이 끝난 토큰으로 -세션생성 -> 로그인
        // 리퀘스트 토큰 -> 세션 생성 -> 이 세션을 저장해서 사용한다 -> 로그인할때마다 토큰은 바뀐다
        await axios({
          url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${this.API_KEY}`,
          method: "POST",
          data: {
            request_token: this.request_token
          }
        }).then((res) => {
          console.log(res);
          this.session_id = res.data.session_id;
          localStorage.setItem('session_id', this.session_id)
          this.login_check = true;
          this.login__layout = false;
          // 로그인 정보가 일치한다면
          this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '로그인 되었습니다',
            showConfirmButton: false,
            timer: 2000
          })
        }).catch((error) => {
          console.log(error)
          // 로그인 정보가 일치하지 않다면
          this.$swal.fire({
            position: 'top-right',
            icon: 'error',
            title: '정보가 일치하지 않습니다',
            showConfirmButton: false,
            timer: 2000
          })
        })

        // 생성된 세션으로 계정 관리 -> 계정 세부 정보 가져오기 (account id -> 이 id로 목록 검색가능)
        await axios.get(`https://api.themoviedb.org/3/account?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`)
        .then((res) => {
          console.log(res);
          this.account_id = res.data.id;
          localStorage.setItem('account_id', this.account_id)
        }).catch((e) => {
          console.log(e)
        })
      }
    }, 
    async signUp() {
      // 생성한 토큰으로 -> tmdb 페이지에서 회원가입 및 승인
      await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.API_KEY}`)
      .then((res) => {
        // TMDB페이지에 로그인이 되어있다면 승인만, 안되어있다면 로그인 및 회원가입
        window.open(`https://www.themoviedb.org/authenticate/${res.data.request_token}?redirect_to=http://www.yourapp.com/approved`)
      }).catch((e) => {
        console.log(e)
      })
    },
    loginCheck() {
      // 조건으로 로그인 인증 로직 구현
      this.login_check = true;
    },
    mobileBtn() {
      this.mobile__check = !this.mobile__check;
      this.login__layout = false;
      this.open__item = false;
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
    // 해당 요소 밖으로 클릭시 item false
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
  },
  async mounted() {

    if(localStorage.getItem('guest_session_id')) {
      // guest_session_info
      await axios.get(`https://api.themoviedb.org/3/guest_session/${localStorage.getItem('guest_session_id')}/rated/movies?api_key=${this.API_KEY}&language=en-US`)
      .then((res) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    } else if(localStorage.getItem('session_id')) {
      // id/pw_session_info
      await axios.get(`https://api.themoviedb.org/3/account/${localStorage.getItem('account_id')}/lists?api_key=${this.API_KEY}&language=en-US&session_id=${localStorage.getItem('session_id')}`)
      .then((res) => {
        // console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    }

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
      <div class="__myInfo __users" v-if="login_check"><span class="material-symbols-outlined" @click="openItem()">account_circle</span></div>
      <div v-else class="__myInfo __login" @click="login()">로그인</div>
      
      <!-- myinfo__item -->
      <div class="__myInfoItem" :class="{ open__item }">
        <RouterLink to="/favorite" @click="userInfo($event)">
          <div class="__saveMovie">즐겨찾기</div>
        </RouterLink>
        <RouterLink to="/rating" @click="userInfo($event)">
          <div class="__saveTv">관심목록</div>
        </RouterLink>
        <div class="__logOut" @click="logOut()">로그아웃</div>
      </div>
      <!-- login__item -->
      <div class="login" :class="{ login__layout }">
        <div class="login__name">Sign In</div>
        <div class="login__close"><span class="material-symbols-outlined" @click="login_close()">close</span></div>
        <div class="login__btn">
          <button class="btn" @click="guest_singIn()">Guest Sign In</button>
        </div>
        <div class="login__text" :class="{ singin__text }">
          <input class="login__id" type="text" name="id" id="id" v-model="id" placeholder="ID" />
          <div class="__error__id" :class="{ error_id }">아이디를 입력해주세요</div>
          <input class="login__pw" type="password" name="pw" id="pw" v-model="pw" @keyup.enter="singIn()" placeholder="PW" />
          <div class="__error__pw" :class="{ error_pw }">비밀번호를 입력해주세요</div>
        </div>
        <div class="login__btn">
          <button class="btn" @click="singIn()">Sign In</button>
        </div>
        <div class="login__btn">
          <button class="btn" @click="signUp()">Sign Up</button>
        </div>
      </div>
      <!-- mobile -->
      <!-- useinfo -->
      <div class="mobileMyinfo" v-if="login_check"><span class="material-symbols-outlined" @click="openItem()">account_circle</span></div>
      
      <div class="mobileMyinfo" v-else :class="{ mobile__check }"><span class="material-symbols-outlined" @click="login()">account_circle</span></div>
      <!-- menu -->
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
    .__myInfoItem.open__item {
      display: block;
      position: absolute;
      top: 4rem !important;
      // left: -6rem;
      // left: 0;
      right: 4rem !important;
      min-width: 13rem;
      font-size: 20px;
      border-radius: 10px;
      text-align: start;
      background: #10161d;
      animation: fadeInUps 1s;
      @keyframes fadeInUps {
        0% {
          opacity: 0;
          transform: translateY(100%);
        }
        100% {
          opacity: 1;
          transform: translateY(0%);
        }
      }
      div {
        padding: 1rem;
        cursor: pointer;
        border-radius: 10px;
        &:hover {
          background: #797a7b;

        }
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
      .__myInfoItem.open__item {
        display: block;
        width: 100% !important;
        height: 100vh !important;
        position: absolute;
        left: 0 !important;
        top: 102% !important;
        border-radius: 0 !important;
        // bottom: -10% !important;
        // right: -115px !important;
        z-index: 1000;
        // border-radius: 20px;
        // padding: 2rem;
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
        div {
          padding: 1rem;
          text-align: center;
          cursor: pointer;
          border-radius: 0 !important;
          &:hover {
            background: #797a7b;
          }
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
        width: 100% !important;
        height: 100vh !important;
        position: absolute;
        top: -307% !important;
        left: 50% !important;
        z-index: 1000;
        border-radius: 0 !important;
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
          .__error__id.error_id,
          .__error__pw.error_pw {
            display: block !important;
            text-align: start;
            margin: auto;
            width: 60vw !important;
            padding-top: 1rem;
            color: red;
            font-size: 15px;
          }
        }
        .login__btn {
          padding-top: 1rem;
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
          font-size: 35px !important;
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
      .mobileMyinfo {
        display: block !important;
        margin-right: 3vw !important;
        // margin-top: 6px !important;
        line-height: 1;
        span {
          cursor: pointer;
          font-size: 33px;
        }
        &:hover {
          border-radius: 50%;
          // background: #eee;
          opacity: .5;
        }
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
      width: 2vw;
      height: 2vw;
      color: #000;
      background: #fff;
      font-size: 1vw;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        font-size: 2.5rem;
        color: #fff;
      }
    }
    .__users {
      background: none;
    }
    .__myInfoItem {
      display: none;
    }
    .__myInfoItem.open__item {
      display: block;
      position: absolute;
      top: 4rem;
      // left: -6rem;
      // left: 0;
      right: 7rem;
      min-width: 13rem;
      font-size: 20px;
      border-radius: 10px;
      text-align: start;
      background: #10161d;
      animation: fadeInUps 1s;
      @keyframes fadeInUps {
        0% {
          opacity: 0;
          transform: translateY(100%);
        }
        100% {
          opacity: 1;
          transform: translateY(0%);
        }
      }
      div {
        padding: 1rem;
        cursor: pointer;
        &:first-child {
          border-radius: 10px 10px 0 0;
        }
        &:last-child {
          // margin-top: 2rem;
          border-radius: 0 0 10px 10px;
        }
        &:hover {
          background: #797a7b;

        }
      }
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
      // height: 50vh;
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
        height: 0;
        opacity: 0;
        padding-top: 0;
        transition: .4s;
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
        
        .__error__id,
        .__error__pw {
          display: none;
        }
        .__error__id.error_id,
        .__error__pw.error_pw {
          display: block !important;
          text-align: start;
          margin: auto;
          width: 28vw;
          padding-top: 1rem;
          color: red;
          font-size: 15px;
        }
      }
      .login__text.singin__text {
        transition: .4s;
        padding-top: 1rem;
        height: auto;
        opacity: 1;
      }
      .login__btn {
        padding-top: 1rem;
        position: relative;
        z-index: 100;
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
    .mobileMyinfo {
      display: none;
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