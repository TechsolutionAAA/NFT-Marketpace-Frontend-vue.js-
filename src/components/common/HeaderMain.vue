<template>
  <div class="header-main is-sticky" :class="isTransparent">
    <div class="container">
      <div class="row header-wrap">
        <!-- logo -->
        <div class="col col-auto">
          <Logo></Logo>
        </div>
        <!-- mobile action -->
        <MobileAction class="col col-auto"></MobileAction>
        <!-- heder search -->
        <!-- <HeaderSearch class="col"></HeaderSearch> -->
        <!-- Menu -->
        <Menu class="col col-auto" classname="btn-dark"></Menu>
        <div class="header-overlay"></div>
      </div>
      <!-- .header-warp-->
    </div>
    <!-- .container-->
  </div>
  <!-- .header-main-->
</template>
<script>
// @ is an alias to /src
import Logo from '@/components/common/Logo.vue'
import MobileAction from '@/components/common/MobileAction.vue'
// import HeaderSearch from '@/components/common/HeaderSearch.vue'
import Menu from '@/components/common/Menu.vue'

export default {
  name: 'HeaderMain',
  props: ['isTransparent'],
  components: {
    Logo,
    MobileAction,
    // HeaderSearch,
    Menu,
  },
}
</script>
