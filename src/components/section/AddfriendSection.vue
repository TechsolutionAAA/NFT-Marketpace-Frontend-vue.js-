<template>
  <div class="col-lg-8">
    <div class="user-panel-title-box">
      <h3>{{ SectionData.addfriendData.mainTitle }}</h3>
    </div><!-- end user-panel-title-box -->
    <div class="profile-setting-panel-wrap">
      <h5 class="mb-3">{{ SectionData.addfriendData.titleThree }}</h5>
      <p class="fs-14 mt-2">{{ SectionData.addfriendData.contentTwo }}</p>
      <p>My Code is <strong>{{ mycode }}</strong></p>
      <hr class="my-4">
      <div class="row g-4">
        <div class="col-md-4 col-sm-6">
          <input type="text" id="fcode" class="form-control form-control-s1" placeholder="Display code i.e. 56709233" :value="code"
                 @input="changecode($event.target.value)"/>
        </div>
        <div class="col-md-4 col-sm-6">
          <button class="btn btn-dark" @click="Addfriendrequest">{{ SectionData.addfriendData.btnText }}</button>
        </div>
      </div>
    </div><!-- end profile-setting-panel-wrap-->
  </div><!-- end col-lg-8 -->
</template>
<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import friendCtr from "../../services/api/friendList";
import { useToast } from "vue-toastification";

export default {
  name: 'DisplaySection',
  data() {
    return {
      SectionData,
      code: "",
      mycode: "",
      account: this.$cookies.get("connectionType") == "mt" ? window.ethereum.selectedAddress : this.$cookies.get("connectionType") == "wc" ? localStorage.getItem("wc_account") : null,
    }
  },
  mounted: async function () {
    if (sessionStorage.getItem("vrcode")) {
      if(this.$cookies.get("connectionType") == "mt") {
        await friendCtr.getCode(this.account.toLowerCase(), sessionStorage.getItem("vrcode")).then((res) => {
          this.mycode = res.data.friendcode;
          sessionStorage.setItem('friend_code', res.data.friendcode);
        }).catch((err) => console.error(err));
      } else if(this.$cookies.get("connectionType") == "wc") {
        await friendCtr.getCode(this.account.toLowerCase(), sessionStorage.getItem("vrcode")).then((res) => {
          this.mycode = res.data.friendcode;
          sessionStorage.setItem('friend_code', res.data.friendcode);
        }).catch((err) => console.error(err));
      }
    }
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },

  methods: {
    changecode: async function (val) {
      this.code = val;
    },
    Addfriendrequest: function () {
      if (this.code == "") {
        this.toast.error("Input the users friend code!");
        document.getElementById("fcode").focus();
      } else {
        friendCtr.checkFriend(this.code).then((res) => {
          if (res.data.msg) {
            friendCtr.setFriendSentRequest(this.account.toLowerCase(), res.data.account.toLowerCase(), this.code).then(() => {
              this.toast.success("Friend request has been sent!");
            }).catch(err => console.error(err));
            friendCtr.setFriendRequest(res.data.account.toLowerCase(), this.account.toLowerCase(), sessionStorage.getItem("friend_code")).then(() => {
              this.toast.info("Please wait for the user to respond!");
            }).catch(err => console.error(err));
            this.$router.push("/request");
          } else {
            this.toast.error("The code you entered does not exist or the code format is incorrect!");
          }
        }).catch(err => console.error(err));
      }
    }
  }
}
</script>
