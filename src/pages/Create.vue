<template>
<div class="page-wrap" v-if="flag">
    <!-- header  -->
    <header class="header-section has-header-main">
        <!-- Header main -->
        <HeaderMain></HeaderMain>
    </header>
    <!-- create -->
    <section class="create-section bg-pattern section-space-b pt-4 pt-md-5 mt-md-4">
        <div class="container">
            <div class="row">
                <div class="col-md-10 col-lg-8 col-xl-6 mx-auto">
                    <div class="create-content-box">
                        <div class="section-head-sm">
                            <router-link :to="SectionData.createData.path" class="btn-link fw-semibold"><em class="ni ni-arrow-left"></em> {{SectionData.createData.btnText }}</router-link>
                            <h1 class="mt-2 mb-3">{{SectionData.createData.title }}</h1>
                            <!-- <p v-html="SectionData.createData.content"></p> -->
                        </div>
                        <div class="row g-gs">
                            <div class="col-sm-6 col-6" v-for="item in SectionData.createData.cards" :key="item.id">
                                <router-link :to="item.path" class="card text-center card-full">
                                    <div class="card-body card-body-s1 d-block">
                                        <img class="mb-4 create-img" :src="item.img" alt="">
                                        <span class="text-black fw-bold d-block">{{item.title }}</span>
                                    </div>
                                </router-link>
                            </div><!-- enbd col -->
                        </div><!-- end row -->
                        <p class="mt-5">{{SectionData.createData.contentTwo }}</p>
                    </div><!-- end create-content-box -->
                </div><!-- end col -->
            </div><!-- row-->
        </div><!-- end container -->
    </section><!-- end create-section -->
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
</div><!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
import { useToast } from "vue-toastification";
import {NETWORKS} from "../utils/networks";
import jwt_decode from "jwt-decode";
export default {
  name: 'Create',
  data () {
    return {
      SectionData,
      flag: false,
      connected:  this.$cookies.get("connectionType") == "mt" ? this.$Web3.getProvider() != null : this.$cookies.get("connectionType") == "wc" ? this.$Web3.wc_provider().connected : false,
    }
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  mounted: async function () {
    if(sessionStorage.getItem("jwt") == null) {
      this.$router.push("/connect");
    }
    else if(jwt_decode(sessionStorage.getItem("jwt")).exp < new Date() / 1000) {
        this.$router.push("/connect");
    } else {
      if (this.$cookies.get("connectionType") == "mt") {
        this.flag = true;
        this.connectWallet()
      } else if (this.$cookies.get("connectionType") == "wc") {
        this.flag = true;
        this.wcfunc()
      }
    }
  },
  methods: {
    async connectWallet() {
      if (await this.isEthereumSupported()) {
        this.$Web3.isconnected = true;
        this.connected = true;
      }
    },
    async wcfunc() {
      if(!this.$Web3.wc_provider().connected) {
        await this.$Web3.wc_provider().enable();
      }
    },
    async isEthereumSupported() {
      // MetaMask
      const { ethereum } = window;
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
        this.toast.error("Please use a MetaMask Enabled browser!");
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
      if(this.$cookies.get("connectionType") == "mt") {
        var chainId = await this.$Web3.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId == 5) {
          return true;
        } else {
          return false;
        }
      } else if(this.$cookies.get("connectionType") == "wc") {
        var chainId_wc = await this.$Web3.wc_web3().eth.getChainId();
        if (chainId_wc == 5) {
          return true;
        } else {
          return false;
        }
      }
    },
    async change() {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code == 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x1",
                  rpcUrl:
                    "https://mainnet.infura.io/v3/9f65f2e7dc324b6fba99c874cecfbadd",
                  // "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
                },
              ],
            });
          } catch (addError) {
            console.log(addError);
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }

      window.ethereum.on("chainChanged", this.handleChainChanged);
    },
  },
}
</script>
