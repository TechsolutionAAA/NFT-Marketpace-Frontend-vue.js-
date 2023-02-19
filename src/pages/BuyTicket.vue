<template>
  <div class="page-wrap" v-if="flag">
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
      <!-- hero -->
      <HeroFour
        classname="hero-title"
        :title="SectionData.breadcrumbData.breadcrumbListten.title"
        :lists="SectionData.breadcrumbData.breadcrumbListten.navList"
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
                <img
                  :src="avatarPrefix + item.NFT_banner"
                  class="card-img-top"
                  alt=""
                />
                <div class="bg-dark-transparent card-overlay">
                  <div class="d-flex align-items-center card-author">
                    <div class="flex-shrink-0 avatar avatar-2">
                      <img
                        :src="avatarPrefix + item.NFT_logo"
                        alt=""
                        class="rounded-circle"
                      />
                    </div>
                    <div class="flex-grow-1 ms-2 text-white">
                      <span>
                        Created By
                        <strong>
                          {{ item.creator.substring(0, 5) }}...{{
                            item.creator.substring(37, 42)
                          }}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body card-body-s1">
                <h4 class="card-title mb-3">{{ item.NFT_Title }}</h4>
                <p class="card-text">{{ item.NFT_Description }}</p>
              </div>
              <div class="card-body card-body-s1">
                <span v-if="item.publicmint" id="special">
                  <strong>Scenez Official</strong>
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
              </div>
              <router-link
                class="details"
                :to="{
                  name: 'ProductDetail',
                  params: {
                    id: item.NFT_Contract,
                    title: item.NFT_Title,
                    imgLogo: item.NFT_logo,
                    imgFe: item.NFT_featured,
                    imgBa: item.NFT_banner,
                    metaText: item.NFT_Description,
                    publicmint: item.publicmint,
                    item_image: item.NFT_item_image,
                    supply: item.NFT_Supply,
                    mintprice: item.mintprice,
                    mintdate: item.mintdate,
                    nft_mint_status: item.nft_mint_status,
                  },
                }"
              ></router-link>
            </div>
          </div>
        </div>

        <div class="text-center mt-4 mt-md-5">
          <Pagination
            :records="Collections.length"
            v-model="page"
            :per-page="perPage"
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
import jwt_decode from 'jwt-decode'
import NFTCTR from '../services/api/nftManagement'

export default {
  name: 'BuyTicket',
  components: {
    HeroFour,
    Pagination,
  },
  data() {
    return {
      SectionData,
      page: 1,
      perPage: 9,
      flag: false,
      avatarPrefix: 'https://gate.scenez.io/ipfs/',
      Collections: [],
    }
  },
  mounted: async function () {
    console.log(sessionStorage.getItem('jwt'))
    if (sessionStorage.getItem('jwt') == null) {
      this.flag = false
      this.$router.push('/connect')
    } else if (
      jwt_decode(sessionStorage.getItem('jwt')).exp <
      new Date() / 1000
    ) {
      this.flag = false
      this.$router.push('/connect')
    } else {
      this.flag = true
      await NFTCTR.getPublicOrGeneralTickets(true)
        .then((res) => {
          this.Collections = res.data.result
        })
        .catch((err) => console.error(err))
    }
  },
  computed: {
    displayedRecords() {
      const startIndex = this.perPage * (this.page - 1)
      const endIndex = startIndex + this.perPage
      return this.Collections.slice(startIndex, endIndex)
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
  max-height: 200px;
}
#nodata {
  text-align: center;
}
#group {
  flex: 1;
}
#special {
  color: red;
}
</style>
