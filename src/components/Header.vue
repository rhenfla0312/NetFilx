<script>
export default {

}
</script>

<template>
  <div class="mv__logo">
    <span class="__logo">SPMV</span>
  </div>
</template>


<style lang="scss">
// font
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

@media screen and (max-width: 1024px) {
  .mv__logo {
    span {
      font-size: 7vw !important;
    }
  }
}

@media screen and (max-width: 768px) {
  .mv__logo {
    height: 20vh !important;
    span {
      font-size: 10vw !important;
    }
  }
}


  .mv__logo {
    height: 40vh;
    background-image: url('https://assets.nflxext.com/ffe/siteui/vlv3/28b69a57-cadf-43d9-8a95-e5f2e11199de/4490a703-c009-4266-8f15-938d80811812/KR-ko-20221010-popsignuptwoweeks-perspective_alpha_website_large.jpg');
    background-repeat: no-repeat;
    // background-position: center;
    background-size: 100%;
    font-family: 'Bebas Neue', cursive;
    span {
      font-size: 4vw;
      color: red;
      padding: 30px;
      cursor: pointer;
    }
  }
</style>