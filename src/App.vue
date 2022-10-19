<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>


<template>
  <div class="mv">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>


<style lang="scss">
@import "./scss/main.scss";

  .mv {
    background: #000;
  }
</style>