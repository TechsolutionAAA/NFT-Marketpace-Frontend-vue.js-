<template>
  <div class="page-wrap" v-if="flag">
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
      <!-- Header main -->
      <HeaderDashboard></HeaderDashboard>
      <!-- hero -->
      <AuthorHero
          avatarSize="avatar-3"
          :coverImg="userData.header_image"
          :avatar="avatar"
          :firstName="fname"
          :lastName="lname"
          :username="uname"
          :btnText="SectionData.authorPersonalData.btnTextTwo"
          :btnLink="SectionData.authorPersonalData.btnLinkTwo"
      ></AuthorHero>
    </header>
    <!-- offer section -->
    <section class="user-panel-section section-space">
      <div class="container">
        <div class="row">
          <!-- user sidebar -->
          <UserSidebar :title="SectionData.MyOfferSidebarData.title" :lists="SectionData.MyOfferSidebarData.navList"
                       :navs="SectionData.offerTabNavMobile"></UserSidebar>
          <!-- offer -->
          <OfferSection></OfferSection>
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
import user from "../services/api/userManagement";

export default {
  name: 'Offers',
  data() {
    return {
      SectionData,
      flag: false,
      avatar: "",
      fname: "",
      lname: "",
      uname: "",
    }
  },
  methods: {
    getData: async function () {
      const tx = await user.getUserInfo(
          window.ethereum.selectedAddress.toLowerCase(),
          sessionStorage.getItem("vrcode")
      );
      this.avatar = tx.data.avatar;
      this.fname = tx.data.firstname;
      this.lname = tx.data.lastname;
      this.uname = tx.data.username;
    },
  },
  mounted: function () {
    if (!this.$Web3.isconnected) {
      this.$router.push("/connect");
    } else {
      this.flag = true;
      this.getData();
    }
  },
}
</script>
