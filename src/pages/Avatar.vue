<template>
  <div class="page-wrap" v-if="flag">
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
    </header>
    <!-- create -->
    <section
        class="create-section bg-pattern section-space-b pt-4 pt-md-5 mt-md-4"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-10 col-lg-8 col-xl-6">
            <div class="create-content-box">
              <iframe
                  id="frame"
                  title="UnityAvatar"
                  class="frame"
                  allow="camera *; microphone *"
                  src="https://4dfun.readyplayer.me/avatar?frameApi"
              ></iframe>
            </div>
            <!-- end create-content-box -->
          </div>
          <!-- end col -->
        </div>
        <!-- row-->
      </div>
      <!-- end container -->
    </section>
    <!-- end create-section -->
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
import User from "../services/api/userManagement";
import { useToast } from "vue-toastification";
import {NETWORKS} from "../utils/networks";
import jwt_decode from "jwt-decode";

export default {
  name: "Create",
  data() {
    return {
      SectionData,
      flag: false,
      connected: this.$Web3.getProvider() != null,
    };
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  methods: {
    async connectWallet() {
      if (await this.isEthereumSupported()) {
        this.$Web3.isconnected = true;
        this.connected = true;
      }
    },
    async isEthereumSupported() {
      // MetaMask
      const {ethereum} = window;
      if (ethereum && ethereum.isMetaMask) {
        this.$Web3.ethereum = ethereum;
        this.$Web3.setProvider(ethereum);
        this.$Web3.ethereum.on("accountsChanged", (accs) => {
          if (accs[0] == undefined) {
            window.location.reload();
          } else {
            this.toast.success(`Account changed: ${accs[0]}`);
            window.location.reload();
          }
        });
        this.$Web3.ethereum.on("chainChanged", async (_chainId) => {
          this.toast.success(`Network changed: ${NETWORKS[parseInt(_chainId, 16)]}`);
        });
      } else {
        this.toast.error("Please install MetaMask to your browser!");
        return false;
      }
      try {
        var acts = await this.$Web3.getProvider().send("eth_requestAccounts");
        this.$Web3.setAccounts(acts);
        this.account = acts[0];

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async checkNetwork() {
      var chainId = await this.$Web3.ethereum.request({
        method: "eth_chainId",
      });
      if (chainId == 5) {
        return true;
      } else {
        this.toast.error("Please change Network to Goerili");
        return false;
      }
    },
    subscribe: async function (event) {
      const json = this.parse(event);

      if (json?.source !== "readyplayerme") {
        return;
      }

      // Subscribe to all events sent from Ready Player Me once frame is ready
      if (json.eventName == "v1.frame.ready") {
        const frame = document.getElementById("frame");
        frame.contentWindow.postMessage(
            JSON.stringify({
              target: "readyplayerme",
              type: "subscribe",
              eventName: "v1.**",
            }),
            "*"
        );
      }

      // Get Avatar GLB URL
      if (json.eventName == "v1.avatar.exported") {
        const account = this.$cookies.get("connectionType") == "mt" ? window.ethereum.selectedAddress : this.$cookies.get("connectionType") == "wc" ? localStorage.getItem("wc_account") : null;
        const vrcode = sessionStorage.getItem("vrcode");
        await User.addUnityAvatar(account.toLowerCase(), vrcode, json.data.url)
            .then(() => {
              this.toast.success("Success!");
              setTimeout(() => {
                this.$router.push("/profile");
              }, 2000);
            })
            .catch((err) => console.error(err));
      }
    },
    parse: function (event) {
      try {
        return JSON.parse(event.data);
      } catch (error) {
        return null;
      }
    },
  },
  mounted: async function () {

    if(sessionStorage.getItem("jwt") == null) {
      this.$router.push("/connect");
    }
    else if (jwt_decode(sessionStorage.getItem("jwt")).exp < new Date() / 1000) {
      this.$router.push("/connect");
    } else {
      if(this.$cookies.get("connectionType") == "mt") {
        await this.connectWallet()
        this.flag = true;
        window.addEventListener("message", this.subscribe);
        document.addEventListener("message", this.subscribe);
      } else if (this.$cookies.get("connectionType") == "wc") {
        this.flag = true;
        window.addEventListener("message", this.subscribe);
        document.addEventListener("message", this.subscribe);
      }
    }
  },
};
</script>

<style>
.frame {
  width: 200% !important;
  height: 800px !important;
  margin: 0 !important;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
  Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  padding: 20px !important;
  font-size: 14px !important;
  border: none !important;
}

iframe {
  border: 0;
}
</style>
