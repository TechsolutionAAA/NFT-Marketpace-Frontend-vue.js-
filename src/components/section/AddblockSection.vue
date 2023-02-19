<template>
  <div class="col-lg-8">
    <div class="user-panel-title-box">
      <h3>{{ SectionData.addblockData.mainTitle }}</h3>
    </div><!-- end user-panel-title-box -->
    <div class="profile-setting-panel-wrap">
      <h5 class="mb-3">{{ SectionData.addblockData.titleThree }}</h5>
      <p class="fs-14 mt-2">{{ SectionData.addblockData.contentTwo }}</p>
      <hr class="my-4">
      <div class="row g-4">
        <div class="col-md-4 col-sm-6">
          <input type="text" id="block_code" class="form-control form-control-s1" placeholder="Display code i.e. 56709233" :value="code"
                 @input="changecode($event.target.value)"/>
        </div>
        <div class="col-md-4 col-sm-6">
          <button class="btn btn-dark" @click="Addblock">{{ SectionData.addblockData.btnText }}</button>
        </div>
      </div>
    </div><!-- end profile-setting-panel-wrap-->
  </div><!-- end col-lg-8 -->
</template>
<script>
// Import component data. You can change the data in the store to reflect in all component
import friendCtr from "../../services/api/friendList";
import SectionData from '@/store/store.js';
import { useToast } from "vue-toastification";

export default {
  name: 'DisplaySection',
  data() {
    return {
      SectionData,
      code: "",
      account: this.$cookies.get("connectionType") == "mt" ? window.ethereum.selectedAddress : this.$cookies.get("connectionType") == "wc" ? localStorage.getItem("wc_account") : null,
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
    Addblock: function () {
      alert(this.account);
      if (this.code == "") {
        this.toast.error("Input the users code to block!");
        document.getElementById("block_code").focus();
      } else {
        friendCtr.checkFriend(this.code).then((res) => {
          if (res.data.msg) {
            friendCtr.makeBlockCode(this.account.toLowerCase(), this.code).then(() => {
              this.toast.success("This user has been blocked!");
            }).catch(err => console.error(err));
          } else {
            this.toast.error("The code you entered does not exist or the code format is incorrect!");
          }
        }).catch(err => console.error(err));
      }
    }
  }
}
</script>
