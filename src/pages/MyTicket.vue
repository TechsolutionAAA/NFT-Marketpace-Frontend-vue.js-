<template>
  <div class="page-wrap" v-if="flag">
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
      <!-- hero -->
      <HeroFour
        classname="hero-title"
        :title="SectionData.breadcrumbData.breadcrumbListeleven.title"
        :lists="SectionData.breadcrumbData.breadcrumbListeleven.navList"
      ></HeroFour>
    </header>
    <!-- Blog  -->
    <section class="section-space-b blog-section">
      <div class="container">
        <!-- blog section -->
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
                <img :src="item.img" class="card-img-top" alt="" />
                <div class="bg-dark-transparent card-overlay">
                  <div class="d-flex align-items-center card-author">
                    <div class="flex-shrink-0 avatar avatar-2">
                      <img :src="item.img" alt="" class="rounded-circle" />
                    </div>
                    <div class="flex-grow-1 ms-2 text-white">
                      <span>
                        Owned By
                        <strong>You</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body card-body-s1">
                <h4 class="card-title mb-3">{{ item.title }}</h4>
                <p class="card-text">{{ item.description }}</p>
              </div>
              <hr class="my-0" />
              <div class="card-body card-body-s1 py-3">
                <div class="card-action-Info" v-if="item.offered">
                  <span>
                    <em class="ni ni-calender-date me-1"></em>
                    Listed
                  </span>
                  <span>{{ item.price / 1000000000000000000 }} ETH</span>
                  <Circle v-if="cancelloading"></Circle>
                  <div
                    v-else
                    class="btn btn-dark d-block"
                    @click="cancelHandler(item.offerId)"
                  >
                    Cancel
                  </div>
                </div>
                <div class="card-action-Info" v-else>
                  <input
                    type="text"
                    id="relist"
                    value="0.01"
                    class="form-control form-control-s1"
                    placeholder="e. g. 0.01"
                  />
                  <Circle v-if="listloading"></Circle>
                  <div
                    v-else
                    class="btn btn-dark d-block"
                    @click="listhandler(item.id)"
                  >
                    List
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="text-center mt-4 mt-md-5">
              <Pagination :records="Collections.filter((item) => item.owner.toLowerCase()==account.toLowerCase()).length" v-model="page" :per-page="perPage"></Pagination>
            </div> -->
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
// import Pagination from 'v-pagination-3';
import { useToast } from "vue-toastification";
import Contract from '../services/contract/contract'
import NFTCollectionABI from '../services/contract/NFTCollection.json'
import NFTMarketpalceABI from '../services/contract/NFTMarketplace.json'
import Web3 from 'web3'
import { Circle } from 'vue-loading-spinner'

export default {
  name: 'MyTicket',
  components: {
    HeroFour,
    // Pagination,
    Circle,
  },
  data() {
    return {
      SectionData,
      listloading: false,
      cancelloading: false,
      page: 1,
      perPage: 9,
      account: window.ethereum.selectedAddress,
      flag: false,
      Collections: [],
      offers: [],
      totalSupply: null,
      offercount: null,
    }
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  methods: {
    listhandler: async function (_id) {
      this.listloading = true
      let priceETH = document.getElementById('relist').value
      const web3 = window.ethereum ? new Web3(window.ethereum) : null
      const MarketplaceContract = new this.$Web3.ethers.Contract(
        Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
        NFTMarketpalceABI,
        this.$Web3.getProvider()?.getSigner(),
      )
      const CollectionContract = new this.$Web3.ethers.Contract(
        Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
        NFTCollectionABI,
        this.$Web3.getProvider()?.getSigner(),
      )
      const ApproveAction = await CollectionContract.approve(
        Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
        _id,
        { from: window.ethereum.selectedAddress },
      )
      try {
        await ApproveAction.wait()
        this.toast.success('Approve Token Success!')
      } catch (error) {
        console.error(error)
        this.listloading = false
        this.toast.error('Something Went Wrong! Try Again please!')
      }
      const makeoffer = await MarketplaceContract.makeOffer(
        _id,
        web3.utils.toWei(priceETH, 'ether'),
        { from: window.ethereum.selectedAddress },
      )
      try {
        await makeoffer.wait()
        this.listloading = false
        this.toast.success('Complete Listing')
        this.$router.push('/collections')
      } catch (error) {
        console.error(error)
        this.listloading = false
        this.toast.error('Something Went Wrong! Try Again Please!')
      }
    },
    cancelHandler: async function (_id) {
      this.cancelloading = true
      const MarketplaceContract = new this.$Web3.ethers.Contract(
        Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
        NFTMarketpalceABI,
        this.$Web3.getProvider()?.getSigner(),
      )
      const cancelAction = await MarketplaceContract.cancelOffer(_id, {
        from: window.ethereum.selectedAddress,
      })
      try {
        await cancelAction.wait()
        this.toast.success('Cancel Offer Success!')
        this.cancelloading = false
        this.$router.push('/collections')
      } catch {
        this.toast.error('Cancel Offer failed!')
        this.cancelloading = false
      }
    },
  },
  mounted: async function () {
    if (!this.$Web3.isconnected) {
      this.toast.error('Please login metamask wallet!')
      this.$router.push('/connect')
    } else {
      this.flag = true
      const CollectionContract = new this.$Web3.ethers.Contract(
        Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
        NFTCollectionABI,
        this.$Web3.getProvider()?.getSigner(),
      )
      const MarketplaceContract = new this.$Web3.ethers.Contract(
        Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
        NFTMarketpalceABI,
        this.$Web3.getProvider()?.getSigner(),
      )
      try {
        await CollectionContract.totalSupply()
          .then((res) => {
            this.totalSupply = res.toString()
          })
          .catch((err) => console.error(err))
      } catch (error) {
        console.error(error)
      }
      for (let i = 0; i < this.totalSupply; i++) {
        const hash = await CollectionContract.tokenURI(i + 1)
        try {
          const response = await fetch(`https://gate.scenez.io/ipfs/${hash}`)
          const metadata = await response.json()
          const owner = await CollectionContract.ownerOf(i + 1)
          this.Collections = [
            {
              id: i + 1,
              title: metadata.name,
              img: metadata.image,
              description: metadata.description,
              collection_name: metadata.collection_name,
              owner: owner,
            },
            ...this.Collections,
          ]
        } catch {
          console.log('ipfs connection is very very very slow!')
        }
      }
      try {
        await MarketplaceContract.offerCount()
          .then((res) => {
            this.offercount = res.toString()
          })
          .catch((err) => console.error(err))
      } catch (error) {
        console.error(error)
      }
      for (let i = 0; i < this.offercount; i++) {
        const offerdata = await MarketplaceContract.offers(i + 1)
        try {
          this.offers = [
            {
              offerId: offerdata.offerId.toString(),
              id: offerdata.id.toString(),
              user: offerdata.user,
              price: offerdata.price.toString(),
              fulfilled: offerdata.fulfilled,
              cancelled: offerdata.cancelled,
            },
            ...this.offers,
          ]
        } catch (error) {
          console.log('ipfs connections is very very very slow!')
        }
      }
      this.offers = this.offers
        .map((offer) => {
          offer.offerId = parseInt(offer.offerId)
          offer.id = parseInt(offer.id)
          offer.price = parseInt(offer.price)
          return offer
        })
        .filter((offer) => offer.fulfilled == false && offer.cancelled == false)
    }
  },
  computed: {
    displayedRecords() {
      const startIndex = this.perPage * (this.page - 1)
      const endIndex = startIndex + this.perPage
      this.Collections.map((item) => {
        if (this.offers.length !== 0) {
          for (var i = 0; i < this.offers.length; i++) {
            if (item.id == this.offers[i].id) {
              const price = this.offers[i].price
              const owner = this.offers[i].user
              item.price = price
              item.owner = owner
              item.offered = true
              item.offerId = this.offers[i].offerId
            }
          }
        }
      })

      return this.Collections.filter(
        (item) => item.owner.toLowerCase() == this.account.toLowerCase(),
      ).slice(startIndex, endIndex)
    },
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
  max-height: 250px;
}
#nodata {
  text-align: center;
}
#group {
  flex: 1;
}
</style>
