<template>
  <div
      class="page-wrap"
      v-if="flag && userData"
  >
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
      <!-- hero -->
      <AuthorHero
          avatarSize="avatar-3"
          :coverImg="userData.header_image"
          :avatar="userData.avatar"
          :firstName="userData.firstname"
          :lastName="userData.lastname"
          :username="userData.username"
          :btnText="SectionData.authorPersonalData.btnTextTwo"
          :btnLink="SectionData.authorPersonalData.btnLinkTwo"
          isAccountSettings
      ></AuthorHero>
    </header>
    <!-- account section -->
    <section class="user-panel-section section-space">
      <div class="container">
        <div class="row">
          <!-- user sidebar -->
          <UserSidebar
              :title="SectionData.accountSidebarData.title"
              :lists="SectionData.accountSidebarData.navList"
              :navs="SectionData.editProfileData.editProfileTabNavMobile"
          ></UserSidebar>
          <AccountSection></AccountSection>
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
import SectionData from '@/store/store.js';
import { mapGetters, mapActions } from 'vuex';
import jwt_decode from 'jwt-decode';

export default {
  name: 'Account',
  data() {
    return {
      SectionData,
      flag: false,
      connected: this.$cookies.get('connectionType') === 'mt' ? this.$Web3.getProvider() != null : this.$cookies.get('connectionType') === 'wc' ? this.$Web3.wc_provider().connected : false,
    };
  },
  async mounted() {
    if (sessionStorage.getItem('jwt') == null) {
      this.$router.push('/connect');
    } else if (jwt_decode(sessionStorage.getItem('jwt')).exp < new Date() / 1000) {
      this.$router.push('/connect');
    } else if (
        this.$cookies.get('connectionType') === 'mt' ||
        this.$cookies.get('connectionType') === 'wc'
    ) {
      this.getUserData();
      this.flag = true;
    }
  },
  computed: {
    ...mapGetters('auth', {
      userData: 'user',
    }),
  },
  methods: {
    ...mapActions('auth', {
      getUserData: 'getUserDataCookies',
    }),
  }
};
</script>
