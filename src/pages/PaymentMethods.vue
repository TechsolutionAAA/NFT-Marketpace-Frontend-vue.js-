<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
      <!-- Header main -->
      <HeaderDashboard></HeaderDashboard>
      <!-- hero -->
      <AuthorHero
          avatarSize="avatar-3"
          :coverImg="userData.header_image"
          :avatar="SectionData.authorPersonalData.img"
          :firstName="SectionData.authorPersonalData.title.split(' ')[0]"
          :lastName="SectionData.authorPersonalData.title.split(' ')[1]"
          :username="SectionData.authorPersonalData.userName"
          :btnText="SectionData.authorPersonalData.btnTextTwo"
          :btnLink="SectionData.authorPersonalData.btnLinkTwo"
      ></AuthorHero>
    </header>
    <!-- account section -->
    <section class="user-panel-section section-space">
      <div class="container">
        <div class="row">
          <!-- user sidebar -->
          <UserSidebar :title="SectionData.paymentMethodSidebarData.title"
                       :lists="SectionData.paymentMethodSidebarData.navList"
                       :navs="SectionData.paymentMethodData.paymentMethodTabNavMobile"></UserSidebar>
          <PaymentMethodSection></PaymentMethodSection>
        </div><!-- end row -->
      </div><!-- end container -->
    </section><!-- end user-panel-section -->
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div><!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'

export default {
  name: 'PaymentMethods',
  data() {
    return {
      SectionData
    }
  }
}
</script>
