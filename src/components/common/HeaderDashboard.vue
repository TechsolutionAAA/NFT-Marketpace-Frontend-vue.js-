<template>
  <div class="header-main is-sticky" :class="isTransparent">
    <div class="container">
      <div class="row header-wrap">
        <!-- logo -->
        <div class="col col-auto">
          <Logo></Logo>
        </div>
        <!-- mobile action -->
        <MobileActionTwo class="col col-auto"></MobileActionTwo>
        <!-- heder search -->
        <HeaderSearch class="col"></HeaderSearch>
        <!-- Menu -->
        <MenuTwo
            class="col col-auto"
            classname="btn-primary"
        >
        </MenuTwo>
        <div class="header-overlay"></div>
      </div><!-- .header-warp-->
    </div><!-- .container-->
  </div><!-- .header-main-->
</template>
<script>
// @ is an alias to /src
import Logo from '@/components/common/Logo.vue'
import MobileActionTwo from '@/components/common/MobileActionTwo.vue'
import HeaderSearch from '@/components/common/HeaderSearch.vue'
import MenuTwo from '@/components/common/MenuTwo.vue'

export default {
  name: 'HeaderDashboard',
  props: ['isTransparent'],
  components: {
    Logo,
    MobileActionTwo,
    HeaderSearch,
    MenuTwo
  }
}
</script>
