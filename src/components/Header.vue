<script>
export default {

}
</script>

<template>
  <div class="mv__header">
    <div class="mv__menu">
      <!-- pc -->
      <div class="__title">SPMV</div>
      <div class="__movie">영화</div>
      <div class="__tv">TV프로그램</div>
      <div class="__search"><span class="material-symbols-outlined">search</span></div>
      <div class="__myInfo">Y</div>
    </div>
    <div class="mv__img"></div>
  </div>
</template>


<style lang="scss">
// font
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&family=Source+Sans+Pro:wght@600&display=swap');


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
          font-size: 3vw !important;
        }
      }
      .__myInfo {
        width: 3vw !important;
        height: 3vw !important;
        font-size: 2vw !important;
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
      .__search {
        span {
          font-size: 5vw !important;
        }
      }
      .__myInfo {
        margin-right: 7vw !important;
        width: 5vw !important;
        height: 5vw !important;
        font-size: 3vw !important;
      }
    }
    .mv__img {
      height: 30vh !important;
    }
  }
}


.mv__header {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  // height: 10vh;
  .mv__menu {
    width: 100vw;
    height: 10vh;
    border-bottom: 1px solid #101010;
    background-color: #101010;
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
      margin-right: auto;
      font-size: 1vw;
      cursor: pointer;
    }
    .__search {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 2vw;
      margin-top: 0.1vw;
      span {
        cursor: pointer;
        font-size: 2vw;
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
  }
  .mv__img {
    height: 50vh;
    background-image: url('https://assets.nflxext.com/ffe/siteui/vlv3/28b69a57-cadf-43d9-8a95-e5f2e11199de/4490a703-c009-4266-8f15-938d80811812/KR-ko-20221010-popsignuptwoweeks-perspective_alpha_website_large.jpg');
    background-repeat: no-repeat;
    // background-position: center;
    background-size: 100%;
  }
}
</style>