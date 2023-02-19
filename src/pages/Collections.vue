<template>
  <div class="page-wrap" v-if="flag">
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
      <!-- hero -->
      <HeroFour
        classname="hero-title"
        :title="SectionData.breadcrumbData.breadcrumbListEight.title"
        :lists="SectionData.breadcrumbData.breadcrumbListEight.navList"
      ></HeroFour>
    </header>
    <!-- Blog  -->
    <section class="section-space-b blog-section">
      <div class="container">
        <div class="row g-gs" v-if="displayedRecords.length == 0">
          <h1 id="nodata">No Data</h1>
        </div>
        <div class="row g-gs">
          <div
            class="col-lg-4 col-md-6"
            v-for="item of displayedRecords"
            :key="item.id"
          >
            <div class="card card-full card-blog">
              <div class="d-block card-image">
                <!-- <img v-if="item.nft_mint_status" :src="avatarPrefix+item.NFT_featured" class="card-img-top" alt=""> -->
                <img
                  :src="
                    item.NFT_featured.includes(`https://`, 0)
                      ? item.NFT_featured
                      : item.NFT_featured.includes(`ipfs://`)
                      ? `https://ipfs.io/ipfs/${item.NFT_featured.substr(7)}`
                      : avatarPrefix + item.NFT_featured
                  "
                  class="card-img-top"
                  alt=""
                />
                <div class="bg-dark-transparent card-overlay">
                  <div class="d-flex align-items-center card-author">
                    <div class="flex-shrink-0 avatar avatar-2">
                      <!-- <img v-if="item.nft_mint_status" :src="avatarPrefix+item.NFT_logo" alt="" class="rounded-circle"> -->
                      <img
                        :src="
                          item.NFT_logo.includes(`https://`, 0)
                            ? item.NFT_logo
                            : item.NFT_logo.includes(`ipfs://`)
                            ? `https://ipfs.io/ipfs/${item.NFT_logo.substr(7)}`
                            : avatarPrefix + item.NFT_featured
                        "
                        alt=""
                        class="rounded-circle"
                      />
                    </div>
                    <div class="flex-grow-1 ms-2 text-white">
                      <span>
                        owned By
                        <strong>You</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body card-body-s1">
                <h4 class="card-title mb-3">{{ item.NFT_Title }}</h4>
                <p class="card-text" id="description">
                  {{ item.NFT_Description }}
                </p>
              </div>
              <!-- end card-body -->
              <div class="card-body card-body-s1">
                <span v-if="item.publicmint">
                  <strong id="PUBLICMINT">PUBLIC MINT</strong>
                  COLLECTIONS
                </span>
                <span v-if="item.isdraft">
                  THIS COLLECTION IS
                  <strong id="PUBLICMINT">DRAFT</strong>
                </span>
              </div>
              <hr class="my-0" />
              <div class="card-body card-body-s1 py-3">
                <div class="card-action-Info">
                  <span>
                    <em class="ni ni-calender-date me-1"></em>
                    {{ item.NFT_Created_date.substring(0, 10) }}
                  </span>
                  <span v-if="item.publicmint" class="me-3">
                    <em class="ni ni-heart me-1"></em>
                    <strong>{{ item.NFT_Supply }}</strong>
                    items
                  </span>
                  <span v-else class="me-3">
                    <em class="ni ni-heart me-1"></em>
                    <strong>{{ item.NFT_ITEMS.length }}</strong>
                    items
                  </span>
                </div>
                <!-- end card-action-Info -->
              </div>
              <!-- end card-body -->
              <!-- || (item.NFT_ITEMS.length != 0 && item.NFT_ITEMS[item.NFT_ITEMS.length-1].flagforsale) -->
              <router-link
                v-if="!item.isdraft"
                class="details"
                :to="{
                  name: 'ProductDetail',
                  params: {
                    id: item.NFT_Contract,
                    title: item.NFT_Title,
                    imgLogo: item.NFT_logo,
                    imgext: item.NFT_logoext,
                    imgFe: item.NFT_featured,
                    imgBa: item.NFT_banner,
                    metaText: item.NFT_Description,
                    publicmint: item.publicmint,
                    item_image: item.NFT_item_image,
                    item_title: item.NFT_item_title,
                    supply: item.NFT_Supply,
                    mintprice: item.mintprice,
                    mintdate: item.mintdate,
                    nft_mint_status: item.nft_mint_status,
                  },
                }"
              ></router-link>
              <router-link
                v-else
                class="details"
                :to="{
                  name: 'CreateSingle',
                  params: {
                    nftid: item.nftId,
                    title: item.NFT_Title,
                    description: item.NFT_Description,
                    logo: item.NFT_logo,
                    ext: item.NFT_logoext,
                    featured: item.NFT_featured,
                    banner: item.NFT_banner,
                    item: item.NFT_item_image,
                    category: item.NFT_Category,
                    royalti: item.NFT_Royalty,
                    collaborator: item.NFT_collaborators,
                    weblink: item.collections_sociallinks[0].weblink,
                    discord_link: item.collections_sociallinks[0].discord,
                    instagram_link: item.collections_sociallinks[0].instagram,
                    medium_link: item.collections_sociallinks[0].medium,
                    telegram_link: item.collections_sociallinks[0].telegram,
                    item_title: item.NFT_item_title,
                    supply: item.NFT_Supply,
                    mintprice: item.mintprice,
                  },
                }"
              ></router-link>
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>

        <div class="text-center mt-4 mt-md-5">
          <Pagination
            :records="NFTData.length"
            v-model="page"
            :per-page="perPage"
            @paginate="true"
          ></Pagination>
        </div>
      </div>
      <!-- .container -->
    </section>
    <!-- end blog-section -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
import HeroFour from '@/components/section/HeroFour.vue'
import Pagination from 'vue-pagination-2'
import NFTCTR from '../services/api/nftManagement'
import { useToast } from "vue-toastification";
import { NETWORKS } from '../utils/networks'
import jwt_decode from 'jwt-decode'
export default {
  name: 'Collections',
  components: {
    HeroFour,
    Pagination,
  },
  data() {
    return {
      SectionData,
      page: 1,
      perPage: 6,
      flag: false,
      avatarPrefix: 'https://gate.scenez.io/ipfs/',
      linkPrefix: '/collections/',
      account:
        this.$cookies.get('connectionType') == 'mt'
          ? window.ethereum.selectedAddress
          : this.$cookies.get('connectionType') == 'wc'
          ? localStorage.getItem('wc_account')
          : null,
      vrcode: sessionStorage.getItem('vrcode'),
      NFTData: [],
      connected:
        this.$cookies.get('connectionType') == 'mt'
          ? this.$Web3.getProvider() != null
          : this.$cookies.get('connectionType') == 'wc'
          ? this.$Web3.wc_provider().connected
          : false,
    }
  },
  computed: {
    displayedRecords() {
      const startIndex = this.perPage * (this.page - 1)
      const endIndex = startIndex + this.perPage
      return this.NFTData.slice(startIndex, endIndex)
    },
  },
  methods: {
    async connectWallet() {
      if (await this.isEthereumSupported()) {
        this.$Web3.isconnected = true
        this.connected = true
      }
    },
    async isEthereumSupported() {
      // MetaMask
      const { ethereum } = window
      if (ethereum && ethereum.isMetaMask) {
        this.$Web3.ethereum = ethereum
        this.$Web3.setProvider(ethereum)
        this.$Web3.ethereum.on('accountsChanged', (accs) => {
          if (accs[0] == undefined) {
            window.location.reload()
          } else {
            this.toast.success(`Account changed: ${accs[0]}`)
            window.location.reload()
          }
        })
        this.$Web3.ethereum.on('chainChanged', async (_chainId) => {
          this.toast.success(`Network changed: ${NETWORKS[parseInt(_chainId, 16)]}`)
        })
      } else {
        this.toast.error('Please install MetaMask to your browser!')
        return false
      }
      try {
        var acts = await this.$Web3.getProvider().send('eth_requestAccounts')
        this.$Web3.setAccounts(acts)
        this.account = acts[0]

        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    async checkNetwork() {
      var chainId = await this.$Web3.ethereum.request({
        method: 'eth_chainId',
      })
      if (chainId == 5) {
        return true
      } else {
        this.toast.error('Please change Network to Goerili')
        return false
      }
    },
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  mounted: async function () {
    if (sessionStorage.getItem('jwt') == null) {
      this.$router.push('/connect')
    } else if (
      jwt_decode(sessionStorage.getItem('jwt')).exp <
      new Date() / 1000
    ) {
      this.$router.push('/connect')
    } else {
      if (this.$cookies.get('connectionType') == 'mt') {
        this.flag = true
        await this.connectWallet()
        await NFTCTR.getNFTsByOwnerfromdb(
          this.account.toLowerCase(),
          this.vrcode,
        )
          .then((res) => {
            this.NFTData = res.data.result
            console.log(res.data.result)
          })
          .catch((err) => console.error(err))
      } else if (this.$cookies.get('connectionType') == 'wc') {
        this.flag = true
        await NFTCTR.getNFTsByOwnerfromdb(
          this.account.toLowerCase(),
          this.vrcode,
        )
          .then((res) => {
            this.NFTData = res.data.result
            console.log(res.data.result)
          })
          .catch((err) => console.error(err))
      }
    }
  },
}
</script>

<style lang="css" scoped>
.details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.btn {
  z-index: 2;
  position: relative;
}
.card-img-top {
  max-height: 200px;
}
#nodata {
  text-align: center;
}
#PUBLICMINT {
  color: red;
}
#description {
  overflow-y: scroll;
  height: 100px;
}
#description::-webkit-scrollbar {
  display: none;
}
</style>
