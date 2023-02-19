<template>
  <div class="page-wrap" v-if="flag && userData">
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
      <!-- Header main -->
      <HeaderDashboard></HeaderDashboard>
      <!-- hero -->

      <AuthorHero
        avatarSize="avatar-3"
        :coverImg="userData.header_image"
        :avatar="userData.avatar"
        :firstName="userData.firstname"
        :lastName="userData.lastname"
        :username="userData.username"
        :walletAddress="userData.account"
        btnText="Edit Profile"
        btnLink="account"
      ></AuthorHero>
    </header>
    <!-- Author section  -->
    <ProfileSection :user="userData" />
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
import ProfileSection from '@/components/section/ProfileSection'
import { mapGetters, mapActions } from 'vuex'
import jwt_decode from 'jwt-decode'


export default {
  name: 'Profile',
  components: {
    ProfileSection,
  },
  data: () => ({
    flag: false,
  }),
  async created() {
    if (sessionStorage.getItem('jwt') == null) {
      await this.$router.push('/connect')
    } else if (
      jwt_decode(sessionStorage.getItem('jwt')).exp <
      new Date() / 1000
    ) {
      await this.$router.push('/connect')
    } else if (
      !Object.values(this.userData).length &&
      (this.$cookies.get('connectionType') == 'wc' ||
        this.$cookies.get('connectionType') == 'mt')
    ) {
      await this.getUserData()
    }
    this.flag = true
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
  },
}
</script>
