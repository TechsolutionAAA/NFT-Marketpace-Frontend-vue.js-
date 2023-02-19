<template>
  <section class="login-section section-space-b pt-4 pt-md-5 mt-md-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-xl-6 mx-auto">
          <ul
            class="row g-gs nav nav-tabs nav-tabs-s2 justify-content-center"
            id="myTab"
            role="tablist"
          >
            <li
              class="nav-item col-sm-6 col-6"
              role="presentation"
              v-for="list in SectionData.loginTabNav"
              :key="list.id"
            >
              <button
                class="nav-link"
                :class="list.isActive"
                :id="list.slug"
                data-bs-toggle="tab"
                :data-bs-target="list.bsTarget"
                type="button"
              >
                <img :src="list.img" alt="" class="icon icon-svg" />
                <span class="nav-link-title mt-2 mt-sm-3 d-block">
                  {{ list.title }}
                </span>
              </button>
            </li>
          </ul>
          <div class="gap-2x"></div>
          <!-- end gap -->
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="meta-mask"
              role="tabpanel"
              aria-labelledby="meta-mask-tab"
            >
              <div class="card-media card-media-s3 text-center">
                <div class="card-media-body">
                  <h3 class="mb-4">
                    {{
                      connected
                        ? SectionData.loginDataTwo.titleFinal
                        : SectionData.loginDataTwo.title
                    }}
                  </h3>
                  <div class="btn btn-dark" @click="connectMetamask">
                    {{
                      connected
                        ? 'Connected!'
                        : SectionData.loginDataTwo.btnText
                    }}
                  </div>
                </div>
              </div>
              <!-- end card-media -->
            </div>
            <!-- end tab-pane -->
            <div
              class="tab-pane fade"
              id="wallet-connect"
              role="tabpanel"
              aria-labelledby="wallet-connect-tab"
            >
              <div class="card-media card-media-s3 text-center">
                <div class="card-media-body">
                  <h3 class="mb-4">
                    {{
                      connected
                        ? SectionData.loginDataTwo.titleFinal
                        : SectionData.loginDataTwo.titleTwo
                    }}
                  </h3>
                  <div class="btn btn-dark" @click="walletconnection">
                    {{
                      connected
                        ? 'Connected!'
                        : SectionData.loginDataTwo.btnText
                    }}
                  </div>
                </div>
              </div>
              <!-- end card-media -->
            </div>
            <!-- end tab-pane -->
            <div
              class="tab-pane fade"
              id="magic-connect"
              role="tabpanel"
              aria-labelledby="magic-connect-tab"
            >
              <div class="card-media card-media-s3 text-center">
                <div class="card-media-body">
                  <h3 class="mb-4">
                    {{
                      connected
                        ? SectionData.loginDataTwo.titleFinal
                        : SectionData.loginDataTwo.titleThree
                    }}
                  </h3>
                  <div class="btn btn-dark" @click="MagicConnection">
                    {{
                      connected
                        ? 'Connected!'
                        : SectionData.loginDataTwo.btnText
                    }}
                  </div>
                </div>
              </div>
              <!-- end card-media -->
            </div>
            <!-- end tab-pane -->
          </div>
          <!-- end tab-content -->
        </div>
        <!-- end col-lg-7 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end login-section -->
</template>

<script>
import SectionData from '@/store/store.js'
import jwt_decode from 'jwt-decode'
// import axios from 'axios';
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      SectionData,
      connected:
        this.$cookies.get('connectionType') == 'mt'
          ? this.$Web3.getProvider() != null
          : this.$cookies.get('connectionType') == 'wc'
          ? this.$Web3.wc_provider().connected
          : false,
      account:
        this.$cookies.get('connectionType') == 'mt'
          ? window.ethereum.selectedAddress
          : this.$cookies.get('connectionType') == 'wc'
          ? localStorage.getItem('wc_account')
          : null,
    }
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  async created() {
    this.$emitter.on('accounts-change', (accounts) =>
      this.walletConnected(accounts),
    )
    this.$emitter.on('wc-connect', (accounts) => {
      this.wc_connect(accounts)
    })
    this.$emitter.on('wc-disconnect', () => {
      this.wc_disconnect()
    })
  },
  unmounted() {
    this.$emitter.off('accounts-change')
  },
  mounted() {
    if (sessionStorage.getItem('jwt') == null) {
      this.toast.error("Wallet must be connected!");
      this.$router.push('/connect')
    } else if (
      jwt_decode(sessionStorage.getItem('jwt')).exp <
      new Date() / 1000
    ) {
      this.toast.error("Wallet must be connected!");

      this.$router.push('/connect')
    } else {
      this.connected = true
    }
  },
  methods: {
    walletConnected(accounts) {
      this.connected = true
      this.account = accounts[0]
      this.$emitter.emit('wallet-connected', accounts)
    },

    wc_connect(account) {
      this.connected = true
      this.account = account[0]
      this.$emitter.emit('wc-connected', account)
    },

    wc_disconnect() {
      this.connected = false
      this.account = null
      this.$emitter.emit('wc-disconnected', {})
    },

    async connectMetamask() {
      if (!this.connected) {
        await this.$emitter.emit('connect', {})
        this.connected = !!this.$Web3.getProvider()
      }
    },

    walletconnection: async function () {
      if (!this.connected) {
        await this.$emitter.emit('wc', {})
        // this.connected = !!this.$Web3.wc_provider()
      }
    },

    MagicConnection: async function () {
      if (!this.connected) {
        await this.$emitter.emit('magicConnect', {})
        this.connected = !!this.$Web3.magic_provider();
      }
    },
  },
}
</script>
