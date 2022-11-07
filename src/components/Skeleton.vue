<script>
export default {
  data() {
    return {
      displaySize : 0,
    }
  },
  computed: {
    displayWidthSize() {
      return window.onresize  = ((e) => {
        return this.displaySize = window.innerWidth;
      })
    },
  },
  watch: {
    displayWidthSize(e) {
      e = window.innerWidth;
    },
  },
  mounted() {
    this.displaySize = window.innerWidth;
  }
}
</script>


<template>
  <!-- pc -> 18(3줄)-->
  <div class="skeleton" v-if="displaySize > 1024">
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
  </div>
  <!-- tablet -> 16(4줄) -->
  <div class="skeleton" v-if="displaySize > 768">
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>

  </div>
  <!-- mobile -> 9(3줄) -->
  <div class="skeleton" v-if="displaySize <= 768">
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
    <div class="__skeleton"></div>
  </div>
</template>


<style lang="scss" scoped>
  .skeleton {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    justify-items: center;

    .__skeleton {
      width: 11vw;
      height: 14vw;
      border-radius: 10px;
      // margin-bottom: .5rem;
      background-color: rgba(165, 165, 165, 0.1);
      animation: pulse-bg 1s infinite;
      @keyframes pulse-bg {
        0% {
        background-color: rgba(165, 165, 165, 0.1);
        }
        50% {
            background-color: rgba(165, 165, 165, 0.3);
        }
        100% {
            background-color: rgba(165, 165, 165, 0.1);
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {  
    .skeleton {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      .__skeleton {
        width: 17vw;
        height: 20vw;
        border-radius: 10px;
        background-color: rgba(165, 165, 165, 0.1);
        animation: pulse-bg 1s infinite;
        @keyframes pulse-bg {
          0% {
            background-color: rgba(165, 165, 165, 0.1);
          }
          50% {
            background-color: rgba(165, 165, 165, 0.3);
          }
          100% {
            background-color: rgba(165, 165, 165, 0.1);
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .skeleton {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: center;
      .__skeleton {
        width: 28vw !important;
        height: 25vh !important;
      }
    }
  }

</style>

