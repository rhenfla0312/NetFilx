<script>
export default {
  methods: {
    myGithub() {
      window.open('https://github.com/rhenfla0312')
    }
  }
}
</script>


<template>
  <div class="footer">
    <div class="text">© 2022 SPMV - 영화 및 TV프로그램 정보 Welcome this is a speed movie.<span @click="myGithub()"></span></div>
  </div>
</template>


<style lang="scss" scoped>
  .footer {
    width: 100%;
    height: 20vh;
    border-top: 1px solid rgb(0, 0, 0, 0.90);
    background: #060d17;
    padding: 0 25rem;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    .text {
      text-align: center;
      span {
        &::after {
          font-family: FontAwesome;
          content: "\f09b";
          font-size: 25px;
          margin-left: 1rem;
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .footer {
      padding: 0 10rem !important;
      font-size: 14px !important;
    }
  }

  @media screen and (max-width: 768px) {
    .footer {
      padding: 0 5rem !important;
      font-size: 12px !important;
    }
  }
</style>