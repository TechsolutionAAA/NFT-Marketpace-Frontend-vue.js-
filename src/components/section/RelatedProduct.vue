<template>
  <section class="related-product-section section-space-b">
    <div
        class="container"
        v-if="flag"
    >
      <!-- section heading -->
      <SectionHeading
          classname="text-center"
          text="My Items"
      ></SectionHeading>
      <!-- product -->
      <swiper
          :slides-per-view="4"
          :breakpoints="{
          0: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }"
          :pagination="{ clickable: true }"
      >
        <swiper-slide
            v-for="item in NFTData"
            :key="item.Id"
        >
          <div class="card card-full">
            <div class="card-image">
              <img
                  :src="avatarPrefix + item.Item_logo"
                  class="card-img-top"
                  alt="art image"
              />
            </div>
            <div class="card-body p-4">
              <div
                  class="card-price-wrap d-flex align-items-center justify-content-between mb-3"
              >
                <div class="me-2">
                  <span class="card-price-title">Item</span>
                  <span class="card-price-number">{{ item.Item_title }}</span>
                </div>
                <div class="me-2">
                  <span class="card-price-title">Collection</span>
                  <span class="card-price-number">
                    {{ item.Collection_name }}
                  </span>
                </div>
              </div>
              <!-- end card-price-wrap -->
              <div
                  class="card-price-wrap d-flex align-items-center justify-content-between mb-3"
              >
                <div class="me-2 description">
                  <span class="card-price-title">Description</span>
                  <span class="card-price-number">
                    {{ item.Item_Description }}
                  </span>
                </div>
              </div>
              <!-- end card-price-wrap -->
              <div
                  class="card-price-wrap d-flex align-items-center justify-content-between mb-3"
              >
                <div class="me-2">
                  <span class="card-price-title">Created Date</span>
                  <span class="card-price-number">
                    {{ item.Item_Created_date.substring(0, 10) }}
                  </span>
                </div>
                <div
                    class="me-2"
                    v-if="item.status"
                >
                  <span
                      class="card-price-number"
                      id="listed"
                  >Listed</span>
                </div>
              </div>
              <!-- end card-price-wrap -->
            </div>
            <!-- end card-body -->
            <router-link
                class="details"
                :to="{
                name: 'itemDetails',
                params: {
                  address: this.address,
                  tokenid: item.tokenId,
                  formatedTitle: item.Item_title.replaceAll(/[ #]/g, '-'),
                  title: item.Item_title,
                },
              }"
            ></router-link>
            <!-- </div> -->
            <!-- end card -->
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- .container -->
  </section>
  <!-- end related-product-section -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
// core version + navigation, pagination modules:
import SwiperCore, { Pagination } from 'swiper';
import NFTCTR from '../../services/api/nftManagement';
// configure Swiper to use modules
SwiperCore.use([Pagination]);

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

export default {
  name: 'RelatedProduct',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['collection', 'address'],
  data() {
    return {
      SectionData,
      flag: true,
      avatarPrefix: 'https://gate.scenez.io/ipfs/',
      NFTData: null,
    };
  },
  mounted: async function () {
    console.log(this.collection, this.address);
    await NFTCTR.getNFTItemByCollection(this.collection)
        .then((res) => {
          this.NFTData = res.data.result;
        })
        .catch((err) => console.error(err));
  },
};
</script>

<style
    lang="css"
    scoped
>
.details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.author-linkm,
.card-price-wrap {
  z-index: 2;
  position: relative;
}

.card-img-top {
  max-height: 250px;
  height: 250px;
}

.description {
  overflow-y: scroll;
  height: 75px;
}

.description::-webkit-scrollbar {
  display: none;
}

#listed {
  color: red;
}
</style>
