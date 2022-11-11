<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  // data() {
  //   return {
  //     options: {
  //       licenseKey: 'YOUR_KEY_HEERE',
  //       menu: '#menu',
  //       anchors: ['page1', 'page2', 'page3'],
  //       // afterLoad: this.afterLoad,
  //       sectionsColor: ['#d3959b', '#003973', '#283048'],
  //     },
  //   }
  // },
  methods: {
    des__close() {
      this.$refs.des__close.style.display = 'none';
      localStorage.setItem('appDisplay', 'none');
    },
  },
  mounted() {
    // 모든 사용자가 처음 접속하고 한번 껏다면 그후로는 안나오게 한다 -> 로컬스토리지 디스플레이값을 삭제를 안할거라서
    if(localStorage.getItem('appDisplay') == 'none') {
      this.$refs.des__close.style.display = 'none';
    }
  }
}
</script>


<template>
  <div class="mv">
    <!-- 처음 접속시 보이는 페이지 -> 소개 -->
    <!-- 기록 - 처음 접속시 소개페이지를 만들려면 최상단 컴포넌트에서 최상위 부모요소에 relative를 걸고 한단계 자식으로 absolute로하여 가로세로 100%를 주면 덮인다 -->
    <!-- fullpage는 성공했지만 약간 문제가 발생하여 일단은 멈춘다 -->
    <!-- <full-page ref="fullpage" :options="options" id="fullpage"></div>
      <div class="section">Second</div>
      <div class="section">Thery</div>
    </full-page> -->

    <!-- 처음접속시 상세정보 -->
    <div class="mv__des" ref="des__close">
      <div class="des__close"><span class="material-symbols-outlined" @click="des__close()">close</span></div>
      <div class="__info">
        <div class="__textBox">
          <div class="__text">SPMV에 오신것을 환영합니다</div>
          <div class="__des">최신 영화 및 TV프로그램을 확인하세요</div>
        </div>
        <div class="__img">
          <div class="first__img">
            <img src="/public/pc.PNG" alt="">
          </div>
          <div class="second__img">
            <img src="/public/mobile.PNG" alt="">
          </div>
        </div>
        <div class="scroll__text">로그인을 하시면 더 많은 기능을 이용하실 수 있습니다</div>
        <div class="login__img">
          <div class="__loginImg">
            <img src="../public/regster.PNG" alt="">
          </div>
          <div class="__loginText">
            <div class="des">테스트 로그인 정보</div>
            <div class="top">ID : yym1623</div>
            <div class="bottom">PW : xldjf0312</div>
          </div>
        </div>
      </div>
    </div>

    <Header />
    <RouterView />
    <Footer />
  </div>
</template>


<style lang="scss">
@import "./scss/main.scss";

.mv {
  background: #000;
  position: relative;
    .mv__des {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 10000;
      background: rgba(0,0,123,0.9);
      // 해당 클래스 안에 있는걸로만해서 부모요소만 클래스 다르게하고 자식은 다 똑같이해도 해당 부모안에있는것들로만 간주하겠지?
      .des__close {
        position: fixed;
        right: 30px;
        top: 30px;
        color: #fff;
        z-index: 1000;
        // 기록 - 호버로 동작을 시키고 놓을때 다시 돌아오게하고싶으면 호버전에 기본에다가도 기본값을 넣어놔야한다
        span {
          transition: .3s;
          transform: rotate(0);
          font-size: 50px;
          cursor: pointer;
          &:hover {
            transform: rotate(180deg);
            transition: .3s;
          }
        }
      }
      .__info {
        width: 80%;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        // 기록 - absolute간 걸린상태에서 그냥 margin 정렬은 안먹히는거 같다 -> position 상태에선 left right로 맞추자
        margin: auto;
        padding: 5rem;
        .__textBox {
          text-align: center;
          color: #fff;
          .__text {
            font-size: 40px;
          }
          .__des {
            padding-top: .5rem;
            font-size: 35px;
          }
        }
        .__img {
          display: flex;
          justify-self: center;
          align-items: center;
          margin-top: 5rem;
          width: 100%;
          .first__img {
            width: 58%;
            img {
              border-radius: 10px;;
              width: 100%;
              height: 50vh;;
            }
          }
          .second__img {
            margin-left: auto;
            width: 38%;
            img {
              border-radius: 10px;;
              width: 100%;
              height: 70vh;
            }
          }
        }
        .scroll__text {
          text-align: center;
          font-size: 30px;
          color: #fff;
          margin-top: 5rem;
        }
        .login__img {
          margin-top: 7rem;
          display: flex;
          // justify-content: center;
          align-items: center;
          width: 100%;
          .__loginImg {
            width: 50%;
            img {
              width: 100%;
              border-radius: 10px;
            }
          }
          .__loginText {
            width: 50%;
            margin-left: auto;
            text-align: center;
            color: #fff;
            .des {
              font-size: 40px;
            }
            .top {
              font-size: 25px;
            }
            .bottom {
              font-size: 25px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .mv {
      background: #000;
      position: relative;
      .mv__des {
        .__info {
          width: 90% !important;
        }
      }
    }
  }
  
  @media screen and (max-width: 768px) {
    .__info {
      padding: 5rem 0 0 0 !important;
      .__textBox {
        .__text {
          font-size: 29px !important;
        }
        .__des {
          font-size: 20px !important;
        }
      }
      .first__img {
        width: 100% !important;
      }
      .second__img {
        display: none;
      }
      .scroll__text {
        font-size: 20px !important;
      }
      .login__img {
        display: block !important;
        .__loginImg {
          width: 100% !important;
        }
        .__loginText {
          width: 100% !important;
          margin-top: 3rem;
        }
      }
    }
  }

</style>