<template>
  <div
      v-if="flag"
      class="page-wrap"
  >
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
      <!-- hero -->
      <AuthorHero
          avatarSize="avatar-3"
          :avatar="userInfo.avatar"
          :coverImg="userInfo.banner"
          :isDropdown="isOwnPublicProfile ? false : true"
          :isCopyInput="true"
          :firstName="userInfo.firstname"
          :lastName="userInfo.lastname"
          :username="userInfo.username"
          :walletAddress="userInfo.account"
          :btnText="isOwnPublicProfile ? 'Profile' : 'Follow'"
          :btnLink="isOwnPublicProfile ? '/profile' : $route.fullPath"
      ></AuthorHero>
    </header>
    <!-- Author section  -->
    <AuthorSection :user="userInfo" />
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import user from '@/services/api/userManagement';
import AuthorSection from '@/components/section/AuthorSection';
import { useToast } from "vue-toastification";
import jwt_decode from 'jwt-decode';

export default {
  name: 'Author',
  components: {
    AuthorSection
  },
  data: () => ({
    flag: false,
    userInfo: null,
  }),
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  mounted() {
    if (sessionStorage.getItem('jwt') == null) {
      this.$router.push('/connect');
    } else if (jwt_decode(sessionStorage.getItem('jwt')).exp < new Date() / 1000) {
      this.flag = false;
      this.$router.push('/connect');
    }
  },
  async created() {
    const { data: { msg } } = await user.checkuserexist(this.$route.params.walletAddress.toLowerCase());
    if (!msg) {
      this.toast.error('Current wallet address is not registered');
      await this.$router.push({
        name: 'NotFound',
        // preserve current path and remove the first char to avoid the target URL starting with `//`
        params: {
          pathMatch: this.$route.path.substring(1)
              .split('/')
        },
        // preserve existing query and hash if any
        query: this.$route.query,
        hash: this.$route.hash,
      });
    } else {
      await this.init();
    }
  },
  computed: {
    isOwnPublicProfile() {
      if ((this.$cookies.get('connectionType') == 'mt' ? window.ethereum.selectedAddress : this.$cookies.get('connectionType') == 'wc' ? localStorage.getItem('wc_account') : null) != null) {
        return this.$route.params.walletAddress.toLocaleLowerCase() == (this.$cookies.get('connectionType') == 'mt' ? window.ethereum.selectedAddress : this.$cookies.get('connectionType') == 'wc' ? localStorage.getItem('wc_account') : null).toLocaleLowerCase()
            .toLocaleLowerCase();
      } else {
        return false;
      }
    }
  },
  methods: {
    async init() {
      try {
        const {
          data,
          status
        } = await user.getUserProfile(this.$route.params.walletAddress.toLowerCase());
        if (status == 200) {
          this.userInfo = Object.assign({}, data);
        }
      } catch (e) {
        console.error(e);
        this.toast.error(e);
      }
      this.flag = true;
    }
  }
};
</script>
