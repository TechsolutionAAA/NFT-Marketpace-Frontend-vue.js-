<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
    </header>
    <!-- login section -->
    <LoginSectionTwo></LoginSectionTwo>
    <!-- Blog  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div><!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
// import jwt_decode from "jwt-decode";

export default {
  name: 'Login',
  data() {
    return {
      SectionData,
    }
  },
  // mounted: function() {
  //   if(sessionStorage.getItem("jwt") != "undefined") {
  //       if (jwt_decode(sessionStorage.getItem("jwt")).exp < new Date() / 1000) {
  //          this.$emitter.emit("wallet-disconnected");
  //       }  
  //     }
  // },
}
</script>
