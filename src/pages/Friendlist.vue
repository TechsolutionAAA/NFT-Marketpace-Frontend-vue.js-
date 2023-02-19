<template>
  <div class="page-wrap" v-if="flag">
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
      <!-- Header main -->
      <HeaderDashboard></HeaderDashboard>
      <!-- hero -->
      <AuthorHero
        avatarSize="avatar-3"
        :coverImg="
          userData.header_image != undefined
            ? userData.header_image
            : userData_cookie.header_image
        "
        :avatar="
          userData.avatar != undefined
            ? userData.avatar
            : userData_cookie.avatar
        "
        :firstName="
          userData.firstname != undefined
            ? userData.firstname
            : userData_cookie.firstname
        "
        :lastName="
          userData.lastname != undefined
            ? userData.lastname
            : userData_cookie.lastname
        "
        :username="
          userData.username != undefined
            ? userData.username
            : userData_cookie.username
        "
        :btnText="SectionData.authorPersonalData.btnTextTwo"
        :btnLink="SectionData.authorPersonalData.btnLinkTwo"
      ></AuthorHero>
    </header>
    <!-- offer section -->
    <section class="user-panel-section section-space">
      <div class="container">
        <div class="row">
          <!-- user sidebar -->
          <UserSidebar
            :title="SectionData.FriendlistSidebarData.title"
            :lists="SectionData.FriendlistSidebarData.navList"
          ></UserSidebar>
          <!-- offer -->
          <FriendlistSection class="mt-4 mt-lg-0"></FriendlistSection>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </section>
    <!-- end user-panel-section -->
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
import { mapGetters } from "vuex";
import jwt_decode from "jwt-decode";

export default {
  name: "Friendlist",
  data() {
    return {
      SectionData,
      flag: false,
      userData_cookie: null,
      connected: this.$Web3.getProvider() != null,
    };
  },
  mounted: async function () {
    if (sessionStorage.getItem("jwt") == null) {
      this.$router.push("/connect");
    } else if (
      jwt_decode(sessionStorage.getItem("jwt")).exp <
      new Date() / 1000
    ) {
      this.$router.push("/connect");
    } else {
      if (this.$cookies.get("connectionType") == "mt") {
        this.flag = true;
        this.userData_cookie = this.$cookies.get("user");
      } else if (this.$cookies.get("connectionType") == "wc") {
        this.flag = true;
        this.userData_cookie = this.$cookies.get("user");
      }
    }
  },
  computed: {
    ...mapGetters("auth", {
      userData: "user",
    }),
  },
};
</script>
