<template>
  <div class="col-lg-9 ps-xl-5">
    <div class="user-panel-title-box">
      <h3>{{ SectionData.securityData.title }}</h3>
    </div>
    <!-- end user-panel-title-box -->
    <div class="profile-setting-panel-wrap">
      <h5 class="mb-2">{{ SectionData.securityData.titleTwo }}</h5>
      <p class="fs-14 mb-4" v-html="SectionData.securityData.content"></p>
      <p class="fs-14 my-3">
        Your current <strong>VR CODE</strong> is displayed here.
        <strong>{{ vrcode }}</strong>
      </p>
      <h6 class="mb-3 fw-semibold">
        Also you can get <strong>VR CODE</strong> again.
      </h6>
      <ul class="btns-group">
        <li>
          <button class="btn btn-dark w-100" type="button" @click="getvrcode">
            GET <strong>VR CODE</strong>
          </button>
        </li>
      </ul>
    </div>
    <!-- end profile-setting-panel-wrap-->
  </div>
  <!-- end col-lg-8 -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
import { useToast } from "vue-toastification";

export default {
  name: "SecuritySection",
  data() {
    return {
      SectionData,
      vrcode: sessionStorage.getItem("vrcode"),
    };
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  methods: {
    async getRandomString() {
      let randomChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let results = "";

      for (let i = 0; i < 6; i++) {
        results += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }

      return results;
    },
    getvrcode: async function () {
      await this.getRandomString()
        .then(async (vr) => {
          sessionStorage.setItem("vrcode", vr);
          this.vrcode = vr;
          await this.$store
            .dispatch("auth/setVrCode", {
              vrCode: vr,
              walletAddress: this.$cookies.get("connectionType") == "mt" ? window.ethereum.selectedAddress.toLowerCase() : this.$cookies.get("connectionType") == "wc" ? localStorage.getItem("wc_account").toLowerCase() : null,
            })
            .then((res) => {
              if (res) {
                this.toast.success(`Success! Your new security code is ${vr}`);
              }
            })
                .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
    },
  },
};
</script>
