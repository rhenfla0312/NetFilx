<script>
export default {
  data() {
    return {
      searchData : false,
    }
  },
  methods: {
    search() {
      this.searchData = true;
    }
  },
}
</script>

<template>
  <div class="mv__header">
    <div class="mv__menu">
      <div class="__title">SPMV</div>
      <div class="__movie">영화</div>
      <div class="__tv">TV프로그램</div>
      <div class="__searchBox">
        <input type="text" class="__searchText" :class="{ searchData }" />
        <div class="__search" :class="{ searchData }"><span @click="search()" class="material-symbols-outlined">search</span></div>
      </div>
      <div class="__myInfo">Y</div>
      <div class="mobileMenu"><span class="material-symbols-outlined">menu</span></div>
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
    }
    .mv__img {
      height: 70vh !important;
      img {
        padding-top: 3rem !important;
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
            font-size: 7vw !important;
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
        }
      }
    }
    .mv__img {
      height: 50vh !important;
      img {
        padding-top: 6rem !important;
        width: 100% !important;
      }
    }
  }
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
        right: 2.5vw;
        z-index: 200;
        color: #000;
        margin-right: 0;
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
    .mobileMenu {
      display: none;
      margin-right: 6vw;
      cursor: pointer;
      font-size: 1vw;
    }
  }
  .mv__img {
    height: 100vh;
    background-image: url('https://www.justwatch.com/appassets/img/home/bg-tiles/bg-tiles.webp');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    img {
      width: 100%;
    }
  }
}
</style>