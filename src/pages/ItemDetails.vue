<template>
  <div
      class="page-wrap"
      v-if="flag"
  >
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
      <AuthorHero
          avatarSize="avatar-3"
          :coverImg="imgBanner"
          :avatar="collectionImage"
          :firstName="title"
          lastName=""
          :username="!!current_owner ? current_owner : creator"
          btnText="My Collections"
          btnLink="/collections"
          :noCollectionImagePrefix="true"
          :noBannerPrefix="true"
      ></AuthorHero>
    </header>
    <section class="item-detail-section section-space">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 pe-xl-5">
            <div class="item-detail-content">
              <div class="item-detail-img-container mb-4">
                <model-gltf
                    v-if="animationUrlExt === 'gltf' || animationUrlExt === 'glb'"
                    :src="animationUrl"
                    backgroundColor="#1a1e2f"
                    :rotation="rotation"
                    :cameraPosition="cameraPosition"
                    @load="onLoad"
                    class="w-100 rounded-3"
                />
                <img
                    v-else
                    :src="itemImage"
                    :alt="title"
                    class="w-100 rounded-3"
                />
              </div>
              <div class="item-detail-tab">
                <ul
                    class="nav nav-tabs nav-tabs-s1"
                    id="myTab"
                    role="tablist"
                >
                  <li
                      class="nav-item"
                      role="presentation"
                      v-for="list in SectionData.itemDetailData.itemDetailTabNav"
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
                      {{ list.title }}
                    </button>
                  </li>
                </ul>
                <div
                    class="tab-content mt-3"
                    id="myTabContent"
                >
                  <div
                      class="tab-pane fade show active"
                      id="Properties"
                      role="tabpanel"
                      aria-labelledby="Properties-tab"
                  >
                    <div class="item-detail-tab-wrap">
                      <div
                          class="card-media card-media-s2 mb-3 trait"
                          v-for="item in NFTItemProperties"
                          :key="item.id"
                      >
                        <div class="prop-container mb-3">
                          <div class="type">{{ item.type }}</div>
                          <div class="name">{{ item.name }}</div>
                          <div class="banner">New trait</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end tab-pane -->
                  <div
                      class="tab-pane fade"
                      id="Levels"
                      role="tabpanel"
                      aria-labelledby="Levels-tab"
                  >
                    <div class="item-detail-tab-wrap">
                      <div
                          class="card-media card-media-s2 mb-3 trait"
                          v-for="item in NFTItemLevels"
                          :key="item.id"
                      >
                        <div class="level-container mb-3">
                          <div class="leveltype">{{ item.type }}</div>
                          <div class="levelname">
                            {{ item.value }} of {{ item.total }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end tab-pane -->
                  <div
                      class="tab-pane fade"
                      id="Stats"
                      role="tabpanel"
                      aria-labelledby="Stats-tab"
                  >
                    <div class="item-detail-tab-wrap">
                      <div
                          class="card-media card-media-s2 mb-3 trait"
                          v-for="item in NFTItemStats"
                          :key="item.id"
                      >
                        <div class="stats-container mb-3">
                          <div class="statstype">{{ item.type }}</div>
                          <div class="statsname">
                            {{ item.value }} of {{ item.total }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end item-detail-img-container -->
            </div>
            <!-- end item-detail-content -->
          </div>
          <!-- end col -->
          <div class="col-lg-6">
            <div class="item-detail-content mt-4 mt-lg-0">
              <h1 class="item-detail-title mb-2">{{ title }}</h1>
              <div
                  class="item-detail-meta d-flex flex-wrap align-items-center mb-3"
              >
                <span class="item-detail-text-meta">{{ desc }}</span>
              </div>

              <div class="item-credits">
                <div class="row g-4">
                  <div class="col-xl-12">
                    <div class="card-media card-media-s1">
                      <router-link
                          to="#"
                          class="card-media-img flex-shrink-0 d-block"
                      >
                        <img
                            :src="currentOwnerProfileImage"
                            alt="avatar"
                        />
                      </router-link>
                      <div class="card-media-body">
                        <router-link
                            to="#"
                            class="fw-semibold"
                        >@OWNER
                        </router-link
                        >
                        <p
                            class="fw-medium small"
                            v-if="!!current_owner"
                        >{{ current_owner }}</p>
                        <p
                            class="fw-medium small"
                            v-else
                        >{{ creator }}</p>
                      </div>
                    </div>
                    <!-- end card -->
                    <br />
                    <div class="card-media card-media-s1">
                      <router-link
                          to="#"
                          class="card-media-img flex-shrink-0 d-block"
                      >
                        <img
                            :src="collectionImage"
                            alt="avatar"
                        />
                      </router-link>
                      <div class="card-media-body">
                        <router-link
                            to="#"
                            class="fw-semibold"
                        >
                          Detail
                        </router-link>
                        <div class="me-2">
                          <span class="card-price-title fw-medium small">
                            My Collection
                          </span>
                          <br />
                          <span class="card-price-number fw-medium small">
                            {{ collection }}
                          </span>
                        </div>
                        <div>
                          <span class="card-price-title"></span>
                          <span class="card-price-number"></span>
                        </div>
                      </div>
                    </div>
                    <!-- end card -->
                  </div>
                  <!-- end col-->
                </div>
                <!-- end row -->
              </div>
              <!-- end row -->
              <div
                  class="item-detail-btns mt-4"
                  v-if="account == current_owner"
              >
                <ul
                    class="btns-group d-flex"
                    v-if="tokenid == 0"
                >
                  <li class="flex-grow-1">
                    <div
                        class="btn btn-dark d-block"
                        @click="
                        this.$router.push({
                          name: 'EditItem',
                          params: {
                            title: title,
                            collection: collection,
                          },
                        })
                      "
                    >
                      Edit Item
                    </div>
                  </li>
                  <li class="flex-grow-1">
                    <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#placeBidModal"
                        class="btn btn-dark d-block"
                    >
                      Sell
                    </a>
                  </li>
                </ul>
                <ul
                    class="btns-group d-flex"
                    v-else
                >
                  <li class="flex-grow-1">
                    <span class="item-detail-text-meta mb-2">
                      This Item Already Minted! You can buy and sell this Item
                      on Explore page.
                    </span>
                  </li>
                </ul>
              </div>
              <!-- end item-detail-btns -->
            </div>
            <!-- end item-detail-content -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- .container -->
    </section>
    <!-- end item-detail-section -->
    <!-- Related product -->
    <!-- <RelatedProduct :collection="title"></RelatedProduct> -->
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
    <!-- Modal -->
    <div
        class="modal fade"
        id="placeBidModal"
        tabindex="-1"
        aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">List this Item for sale</h4>
            <button
                type="button"
                class="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
            >
              <em class="ni ni-cross"></em>
            </button>
          </div>
          <!-- end modal-header -->

          <div class="modal-body">
            <p
                class="mb-3"
                v-html="'You are about to list this Item for sale'"
            ></p>
            <div class="mb-3">
              <label class="form-label">Price (ETH)</label>
              <input
                  type="number"
                  id="priceETH"
                  value="0.01"
                  class="form-control form-control-s1"
                  placeholder="Enter bid"
              />
            </div>

            <!-- <div class="mb-3">
                        <label class="form-label">Duration (days)</label>
                        <input type="number" class="form-control form-control-s1" value="1">
                    </div> -->
            <!-- <Circle v-if="listloading"></Circle> -->
            <div
                class="btn btn-dark d-block"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#LoadingProcess"
                aria-label="Close"
                @click="listing(collection)"
            >
              Complete Listing
            </div>
          </div>
          <!-- end modal-body -->
        </div>
        <!-- end modal-content -->
      </div>
      <!-- end modal-dialog -->
    </div>

    <!-- <div class="modal fade" id="placeBidModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">List this Item for sale</h4>
            <button type="button" class="btn-close icon-btn" data-bs-dismiss="modal" aria-label="Close">
              <em class="ni ni-cross"></em>
            </button>
          </div>
          <div class="item-detail-tab">
            <ul class="nav nav-tabs nav-tabs-s1" id="myTab" role="tablist">
              <li class="nav-item" role="presentation" v-for="list in SectionData.itemDetailData.itemDetailBidNav" :key="list.id">
                  <button class="nav-link" :class="list.isActive" :id="list.slug" data-bs-toggle="tab" :data-bs-target="list.bsTarget" type="button">{{ list.title }} </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="Fixed" role="tabpanel" aria-labelledby="fixed-tab">
                <div class="modal-body">
                  <p class="mb-3" v-html="'You are about to list this Item for sale'"></p>
                  <div class="mb-3">
                    <label class="form-label">Price (ETH)</label>
                    <input type="number" id="priceETH" value="0.01" class="form-control form-control-s1" placeholder="Enter bid" />
                  </div>
                  <div class="btn btn-dark d-block" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#LoadingProcess" aria-label="Close" @click="listing(collection)">
                    Complete Listing
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="Auction" role="tabpanel" aria-labelledby="auction-tab">
                <div class="modal-body">
                  <p class="mb-3" v-html="'You are about to auction list this Item for sale'"></p>
                  <div class="mb-3">
                    <label class="form-label">Starting Price (ETH)</label>
                    <input type="number" id="auction_priceETH" value="0.01" class="form-control form-control-s1" placeholder="Enter bid" />
                  </div>
                  <div class="mb-3">
                      <label class="form-label">Duration (days)</label>
                      <input type="number" id="auction_duration" step="1" min="0" class="form-control form-control-s1" value="1">
                  </div>
                  <div class="btn btn-dark d-block" aria-label="Close">Coming Soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- end modal-->
    <!-- LoadingProcess -->
    <div
        class="modal fade"
        id="LoadingProcess"
        tabindex="-1"
        aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Sell Item</h4>
            <button
                type="button"
                class="btn-close icon-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
            >
              <em class="ni ni-cross"></em>
            </button>
          </div>
          <div class="modal-body">
            <div class="body-contain">
              <div class="body-title">
                <Circle v-if="isinit"></Circle>
                <div
                    class="sub-title"
                    v-else
                >1
                </div>
                <div class="sub-title">Initialize your wallet</div>
              </div>
              <div class="body-content">
                <p class="mb-3 sub-content">
                  To get set up for selling on Scenez for the first time, you
                  must initialize your wallet, which requires a one-time gas
                  fee.
                </p>
                <p
                    class="mb-3 waiting"
                    id="initialization"
                >
                  Waiting for Initialization...
                </p>
              </div>
              <hr />
              <div class="body-title">
                <Circle v-if="isapprove"></Circle>
                <div
                    class="sub-title"
                    v-else
                >2
                </div>
                <div class="sub-title">Approve this item for sale</div>
              </div>
              <div class="body-content">
                <p class="mb-3 sub-content">
                  To get set up for sale listing for the fist time, you must
                  approve this item for sale, which requires a one-time gas fee.
                </p>
                <p
                    class="mb-3 waiting"
                    id="approving"
                >
                  Waiting for approve...
                </p>
              </div>
              <hr />
              <div class="body-title">
                <Circle v-if="islist"></Circle>
                <div
                    class="sub-title"
                    v-else
                >3
                </div>
                <div class="sub-title">Confirm {{ priceETH }} ETH Listing</div>
              </div>
              <div class="body-content">
                <p class="mb-3 sub-content">
                  Accept the signature request in your wallet and wait for your
                  listing to proccess.
                </p>
                <p
                    class="mb-3 waiting"
                    id="listing"
                >Waiting for list...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal-->
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import { useToast } from "vue-toastification";
import Web3 from 'web3';
import Swal from 'sweetalert2';
import NFTCtr from '../services/api/nftManagement';
import user from '../services/api/userManagement.js';
import Contract from '../services/contract/contract';
import NFTCollectionABI from '../services/contract/NFTCollection.json';
import NFTMarketpalceABI from '../services/contract/NFTMarketplace.json';
// import BetaNFTMarketplaceABI from "../services/contract/BetaNFTMarketplace.json";
import { NETWORKS } from '../utils/networks';
import { Circle } from 'vue-loading-spinner';
import jwt_decode from 'jwt-decode';
import { ModelGltf } from 'vue-3d-model';
import { mapActions, mapGetters } from 'vuex';
import { reactive } from 'vue';

export default {
  name: 'itemDetails',
  components: {
    Circle,
    ModelGltf,
  },
  data() {
    return {
      SectionData,
      animationUrl: null,
      animationUrlExt: null,
      isModalVisible: false,
      listloading: false,
      flag: false,
      account:
          this.$cookies.get('connectionType') === 'mt'
              ? window.ethereum.selectedAddress
              : this.$cookies.get('connectionType') === 'wc'
                  ? localStorage.getItem('wc_account')
                  : null,
      address: this.$route.params.address,
      tokenid: this.$route.params.tokenid,
      title: this.$route.params.title || this.$route.params.formatedTitle,
      collection: null,
      desc: null,
      itemImage: null,
      imgExt: null,
      collectionImage: null,
      imgBanner: null,
      metadata: null,
      status: null,
      creator: null,
      current_owner: null,
      currentOwnerProfileImage: null,
      NFTItemProperties: null,
      NFTItemLevels: null,
      NFTItemStats: null,
      imageUrlPrefix: 'https://gate.scenez.io/ipfs/',
      isinit: true,
      isapprove: false,
      islist: false,
      priceETH: null,
      duration: null,
    };
  },
  async mounted() {
    if (sessionStorage.getItem('jwt') == null) {
      this.flag = false;
      await this.$router.push('/connect');
    } else if (
        jwt_decode(sessionStorage.getItem('jwt')).exp <
        new Date() / 1000
    ) {
      this.flag = false;
      await this.$router.push('/connect');
    } else {
      if (this.$cookies.get('connectionType') === 'mt') {
        await this.connectWallet();
        if (this.$route.params.formatedTitle === undefined) {
          await this.$router.push(`/collections/`);
        } else {
          NFTCtr.getNFTItemProperties(this.address.toLowerCase(), this.title)
              .then((res) => {
                this.NFTItemProperties = res.data.result;
              })
              .catch((err) => console.error(err));
          NFTCtr.getNFTItemLevels(this.address.toLowerCase(), this.title)
              .then((res) => {
                this.NFTItemLevels = res.data.result;
              })
              .catch((err) => console.error(err));
          NFTCtr.getNFTItemStats(this.address.toLowerCase(), this.title)
              .then((res) => {
                this.NFTItemStats = res.data.result;
              })
              .catch((err) => console.error(err));
          NFTCtr.getNFTItemDatas(this.address.toLowerCase(), this.title)
              .then((res) => {
                if (res.data.msg === false) {
                  throw res.data;
                }
                if (res.data.status) {
                  this.getNFTMetadataFromMoralis(res.data);
                } else {
                  this.setNftItemData(res.data);
                  this.getCurrentOwnerProfileImage();
                  this.flag = true;
                }
              })
              .catch((err) => {
                if (err.msg === false) {
                  // this.toast.error('Current NFT doesn\'t exist on this network.');
                  // this.$router.push('/explore');
                  this.getNFTMetadata();

                }
                const status = err?.response?.status;
                if (status === 400) {
                  this.getNFTMetadata();
                }
              });
        }
      } else if (this.$cookies.get('connectionType') === 'wc') {
        this.wcfunc();
        if (this.$route.params.formatedTitle === undefined) {
          await this.$router.push(`/collections/${this.address}`);
        } else {
          NFTCtr.getNFTItemProperties(this.address.toLowerCase(), this.title)
              .then((res) => {
                this.NFTItemProperties = res.data.result;
              })
              .catch((err) => console.error(err));
          NFTCtr.getNFTItemLevels(this.address.toLowerCase(), this.title)
              .then((res) => {
                this.NFTItemLevels = res.data.result;
              })
              .catch((err) => console.error(err));
          NFTCtr.getNFTItemStats(this.address.toLowerCase(), this.title)
              .then((res) => {
                this.NFTItemStats = res.data.result;
              })
              .catch((err) => console.error(err));
          NFTCtr.getNFTItemDatas(this.address.toLowerCase(), this.title)
              .then((res) => {
                if (res.data.status) {
                  this.getNFTMetadataFromMoralis(res.data);
                } else {
                  this.setNftItemData(res.data);
                  this.getCurrentOwnerProfileImage();
                  this.flag = true;
                }
              })
              .catch((err) => {
                const status = err.response.status;
                if (status === 400) {
                  this.getNFTMetadata();
                }
              });
        }
      }
    }
    if (
        !Object.values(this.userData).length &&
        (this.$cookies.get('connectionType') == 'wc' ||
            this.$cookies.get('connectionType') == 'mt')
    ) {
      this.getUserData();
    }
  },
  setup() {
    const rotation = reactive({
      x: 0,
      y: Math.PI,
      z: 0,
    });

    const cameraPosition = reactive({
      x: 90,
      y: 0,
      z: 90,
    });

    function onLoad() {
      rotate();
    }

    function rotate() {
      requestAnimationFrame(rotate);
      rotation.y += 0.01;
    }

    const toast = useToast();

    return {
      toast,
      onLoad,
      rotation,
      cameraPosition
    };
  },
  computed: {
    ...mapGetters('auth', {
      userData: 'user',
    }),
  },
  methods: {
    ...mapActions('auth', {
      getUserData: 'getUserDataCookies',
    }),
    getFileExtension(path) {
      return path.substring(path.lastIndexOf('.') + 1, path.length) || path;
    },
    async getNFTMetadata() {
      try {
        const {
          data,
          status
        } = await NFTCtr.moralisGetNFTMetadata(this.address, this.tokenid);
        if (status === 200) {
          const metadata = JSON.parse(data.metadata);
          this.collection = data?.name || null;
          this.desc = metadata?.description || null;
          this.itemImage = metadata?.image.includes(`https://`, 0)
              ? metadata?.image
              : metadata?.image.includes(`ipfs://`)
                  ? metadata?.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
                  : `https://gate.scenez.io/ipfs/Qme71LKv3QcaeWJB6Fh7SH8Yo87JXDkqSsaoE3HWqk2EbB` || null;
          this.imgExt = metadata?.imageextension || null;
          this.animationUrl = metadata?.animation_url || null;
          this.animationUrlExt = metadata?.animation_url_ext
              ? metadata?.animation_url_ext
              : metadata?.animation_url
                  ? this.getFileExtension(metadata?.animation_url)
                  : null;

          this.collectionImage = require('@/images/defaults/collection.jpg');
          this.imgBanner = require('@/images/defaults/banner.jpg');
          this.metadata = metadata || null;
          this.creator = metadata?.creator || null;
          this.current_owner = data?.owner_of || null;
          this.currentOwnerProfileImage = require('@/images/defaults/avatar.jpg');

          this.flag = true;
        }
      } catch (e) {
        this.toast.error('Current NFT doesn\'t exist on selected network!');
        this.$router.push('/explore');
        console.error(e);
      }
    },
    async getNFTMetadataFromMoralis(dbResponse) {
      try {
        const {
          data,
          status
        } = await NFTCtr.moralisGetNFTMetadata(this.address, this.tokenid);
        if (status === 200) {
          const metadata = JSON.parse(data.metadata);
          this.collection = metadata?.collection_name || null;
          this.desc = metadata?.description || null;
          this.itemImage = metadata?.image || null;
          this.imgExt = metadata?.imageextension || null;
          this.animationUrl = metadata?.animation_url || null;
          this.animationUrlExt = metadata?.animation_url_ext
              ? metadata?.animation_url_ext
              : metadata?.animation_url
                  ? this.getFileExtension(metadata?.animation_url)
                  : null;

          if (dbResponse?.imgFeatured_res?.includes(`https://`, 0)) {
            this.collectionImage = dbResponse.imgFeatured_res;
          } else if (dbResponse?.imgFeatured_res?.includes(`ipfs://`)) {
            this.collectionImage = dbResponse.imgFeatured_res.replace('ipfs://', 'https://ipfs.io/ipfs/');
          } else if (dbResponse?.imgFeatured_res) {
            this.collectionImage = this.imageUrlPrefix + dbResponse.imgFeatured_res;
          } else {
            this.collectionImage = require('@/images/defaults/collection.jpg');
          }

          if (dbResponse?.imgbanner_res?.includes(`https://`, 0)) {
            this.imgBanner = dbResponse.imgbanner_res;
          } else if (dbResponse?.imgbanner_res?.includes(`ipfs://`)) {
            this.imgBanner = dbResponse.imgbanner_res.replace('ipfs://', 'https://ipfs.io/ipfs/');
          } else if (dbResponse?.imgbanner_res) {
            this.imgBanner = this.imageUrlPrefix + dbResponse.imgbanner_res;
          } else {
            this.imgBanner = require('@/images/defaults/banner.jpg');
          }
          this.metadata = metadata || null;
          this.status = dbResponse?.status || null;
          this.creator = metadata?.creator || null;
          this.current_owner = dbResponse?.current_owner || null;

          await this.getCurrentOwnerProfileImage();
          this.flag = true;
        }
      } catch (err) {
        this.toast.error('Current NFT doesn\'t exist on selected network.');
        this.$router.push('/explore');
        console.error(err);
      }
    },
    setNftItemData(data) {
      this.collection = data?.collection_res;
      this.desc = data?.description_res;
      if (data?.imgLogo_res?.includes(`https://`, 0)) {
        this.itemImage = data.imgLogo_res;
      } else if (data?.imgLogo_res?.includes(`ipfs://`)) {
        this.itemImage = data.imgLogo_res.replace('ipfs://', 'https://ipfs.io/ipfs/');
      } else if (data?.imgLogo_res) {
        this.itemImage = this.imageUrlPrefix + data.imgLogo_res;
      } else {
        this.itemImage = `https://gate.scenez.io/ipfs/Qme71LKv3QcaeWJB6Fh7SH8Yo87JXDkqSsaoE3HWqk2EbB`;
      }
      this.imgExt = data?.imgLogo_ext;

      if (data?.imgThumbnail?.includes(`https://`, 0)) {
        this.animationUrl = data.imgThumbnail;
      } else if (data?.imgThumbnail?.includes(`ipfs://`)) {
        this.animationUrl = data.imgThumbnail.replace('ipfs://', 'https://ipfs.io/ipfs/');
      } else if (data?.imgThumbnail) {
        this.animationUrl = this.imageUrlPrefix + data.imgThumbnail;
      } else {
        this.animationUrl = data?.imgThumbnail;
      }
      this.animationUrlExt = data?.imgThumbnail_ext;

      if (data?.imgFeatured_res?.includes(`https://`, 0)) {
        this.collectionImage = data.imgFeatured_res;
      } else if (data?.imgFeatured_res?.includes(`ipfs://`)) {
        this.collectionImage = data.imgFeatured_res.replace('ipfs://', 'https://ipfs.io/ipfs/');
      } else if (data?.imgFeatured_res) {
        this.collectionImage = this.imageUrlPrefix + data.imgFeatured_res;
      } else {
        this.collectionImage = require('@/images/defaults/collection.jpg');
      }

      if (data?.imgbanner_res?.includes(`https://`, 0)) {
        this.imgBanner = data.imgbanner_res;
      } else if (data?.imgbanner_res?.includes(`ipfs://`)) {
        this.imgBanner = data.imgbanner_res.replace('ipfs://', 'https://ipfs.io/ipfs/');
      } else if (data?.imgbanner_res) {
        this.imgBanner = this.imageUrlPrefix + data.imgbanner_res;
      } else {
        this.imgBanner = require('@/images/defaults/banner.jpg');
      }
      this.metadata = data?.metadata;
      this.status = data?.status;
      this.creator = data?.creator;
      this.current_owner = data?.current_owner;
    },
    async getCurrentOwnerProfileImage() {
      const profile = await user.getUserProfile(this.current_owner);
      this.currentOwnerProfileImage = this.imageUrlPrefix + profile.data.avatar;
    },
    async wcfunc() {
      if (!this.$Web3.wc_provider().connected) {
        await this.$Web3.wc_provider()
            .enable();
      }
    },
    async connectWallet() {
      if (await this.isEthereumSupported()) {
        this.$Web3.isconnected = true;
        this.connected = true;
      }
    },
    async isEthereumSupported() {
      // MetaMask
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        this.$Web3.ethereum = ethereum;
        this.$Web3.setProvider(ethereum);
        this.$Web3.ethereum.on('accountsChanged', (accs) => {
          if (accs[0] == undefined) {
            window.location.reload();
          } else {
            this.toast.success(`Account changed: ${accs[0]}`);
            window.location.reload();
          }
        });
        this.$Web3.ethereum.on('chainChanged', async (_chainId) => {
          this.toast.success(`Network changed: ${NETWORKS[parseInt(_chainId, 16)]}`);
        });
      } else {
        this.toast.error('Please use a MetaMask Enabled browser!');
        return false;
      }
      try {
        var acts = await this.$Web3.getProvider()
            .send('eth_requestAccounts');
        this.$Web3.setAccounts(acts);
        this.account = acts[0];

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async checkNetwork() {
      if (this.$cookies.get('connectionType') == 'mt') {
        var chainId = await this.$Web3.ethereum.request({
          method: 'eth_chainId',
        });
        if (chainId == Number(process.env.VUE_APP_ChainID)) {
          return true;
        } else {
          return false;
        }
      } else if (this.$cookies.get('connectionType') == 'wc') {
        var chainId_wc = await this.$Web3.wc_web3()
            .eth
            .getChainId();
        if (chainId_wc == Number(process.env.VUE_APP_ChainID)) {
          return true;
        } else {
          return false;
        }
      }
    },
    async change() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${process.env.VUE_APP_ChainID}` }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code == 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x1',
                  rpcUrl:
                      'https://mainnet.infura.io/v3/9f65f2e7dc324b6fba99c874cecfbadd',
                  // "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
                },
              ],
            });
          } catch (addError) {
            console.error({ addError });
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }

      window.ethereum.on('chainChanged', this.handleChainChanged);
    },
    handleChainChanged() {
      // We recommend reloading the page, unless you must do otherwise
      Swal.fire({
        text: `Switched to ${process.env.VUE_APP_NETWORK} network!`,
        icon: 'success',
      })
          .then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
    },
    listing: async function (collection) {
      let network = await this.checkNetwork();
      this.priceETH = document.getElementById('priceETH').value;
      if (!network) {
        Swal.fire({
          title: `Please Switch to ${process.env.VUE_APP_NETWORK} Network!`,
          text: `In order to trade items, please switch to ${process.env.VUE_APP_NETWORK} Network within your Metamask Wallet.`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, switch!',
        })
            .then(async (result) => {
              if (result.isConfirmed) {
                await this.change();
              }
            });
      } else {
        if (this.priceETH == '') {
          this.toast.error('Please set Price!');
        } else {
          var tokenId;
          const web3 = window.ethereum ? new Web3(window.ethereum) : null;
          if (this.$cookies.get('connectionType') == 'mt') {
            const CollectionContract = new this.$Web3.ethers.Contract(
                Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
                NFTCollectionABI,
                this.$Web3.getProvider()
                    ?.getSigner(),
            );
            const MarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
                NFTMarketpalceABI,
                this.$Web3.getProvider()
                    ?.getSigner(),
            );
            const mintAction = await CollectionContract.mintItem(
                collection,
                this.metadata,
                { from: this.account },
            );
            try {
              await mintAction.wait();
              this.toast.success('Initialize Success');
              this.isinit = false;
              this.isapprove = true;
              document.getElementById('initialization').innerHTML = 'Success!';
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again or contact support!');
            }
            await CollectionContract.gettokenIdByTokenURI(
                collection,
                this.metadata,
            )
                .then(async (res) => {
                  tokenId = res.toString();
                  await NFTCtr.settokenid(this.collection, this.metadata, tokenId)
                      .then((resp) => {
                        if (resp.data.result) {
                          this.toast.success('Set ID Success!');
                        } else {
                          this.toast.error('Something Went Wrong! Try Again or contact support!');
                        }
                      })
                      .catch((err) => console.error(err));

                  const ApproveAction = await CollectionContract.approve(
                      collection,
                      Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
                      tokenId,
                      { from: this.account },
                  );
                  try {
                    await ApproveAction.wait();
                    this.isapprove = false;
                    this.islist = true;
                    document.getElementById('approving').innerHTML = 'Success!';
                    this.toast.success('Item Approved!');
                  } catch (error) {
                    console.error(error);
                    this.listloading = false;
                    this.toast.error('Something Went Wrong! Try Again or contact support!');
                  }
                })
                .catch((error) => {
                  console.error(error);
                  this.listloading = false;
                  this.toast.error('Something Went Wrong! Try Again or contact support!');
                });

            const makeoffer = await MarketplaceContract.makeOffer(
                collection,
                tokenId,
                web3.utils.toWei(this.priceETH, 'ether'),
                { from: this.account },
            );
            try {
              await makeoffer.wait();
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again or contact support!');
            }
            await NFTCtr.setSaleStatus(this.collection, this.metadata)
                .then((res) => {
                  if (res.data.result) {
                    this.toast.success('Listing Completed!');
                    this.listloading = false;
                    this.islist = false;
                    document.getElementById('listing').innerHTML = 'success!';
                    this.$router.push('/explore');
                  } else {
                    this.toast.error('Something Went Wrong! Try Again or contact support!');
                    this.listloading = false;
                  }
                })
                .catch((err) => console.error(err));
          } else if (this.$cookies.get('connectionType') == 'wc') {
            const CollectionContract = new this.$Web3.ethers.Contract(
                Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
                NFTCollectionABI,
                this.$Web3.wc_web3Provider()
                    .getSigner(),
            );
            const MarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
                NFTMarketpalceABI,
                this.$Web3.wc_web3Provider()
                    .getSigner(),
            );
            const mintAction = await CollectionContract.mintItem(
                collection,
                this.metadata,
                { from: this.account },
            );
            try {
              await mintAction.wait();
              this.toast.success('Initialize Success');
              this.isinit = false;
              this.isapprove = true;
              document.getElementById('initialization').innerHTML = 'Success!';
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again or contact support!');
            }
            await CollectionContract.gettokenIdByTokenURI(
                collection,
                this.metadata,
            )
                .then(async (res) => {
                  tokenId = res.toString();
                  await NFTCtr.settokenid(this.collection, this.metadata, tokenId)
                      .then((resp) => {
                        if (resp.data.result) {
                          this.toast.success('Set ID Success!');
                        } else {
                          this.toast.error('Something Went Wrong! Try Again or contact support!');
                        }
                      })
                      .catch((err) => console.error(err));

                  const ApproveAction = await CollectionContract.approve(
                      collection,
                      Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
                      tokenId,
                      { from: this.account },
                  );
                  try {
                    await ApproveAction.wait();
                    this.isapprove = false;
                    this.islist = true;
                    document.getElementById('approving').innerHTML = 'Success!';
                    this.toast.success('Item Approved!');
                  } catch (error) {
                    console.error(error);
                    this.listloading = false;
                    this.toast.error('Something Went Wrong! Try Again or contact support!');
                  }
                })
                .catch((error) => {
                  console.error(error);
                  this.listloading = false;
                  this.toast.error('Something Went Wrong! Try Again or contact support!');
                });

            const makeoffer = await MarketplaceContract.makeOffer(
                collection,
                tokenId,
                web3.utils.toWei(this.priceETH, 'ether'),
                { from: this.account },
            );
            try {
              await makeoffer.wait();
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again or contact support!');
            }
            await NFTCtr.setSaleStatus(this.collection, this.metadata)
                .then((res) => {
                  if (res.data.result) {
                    this.toast.success('Listing Completed!');
                    this.listloading = false;
                    this.islist = false;
                    document.getElementById('listing').innerHTML = 'success!';
                    this.$router.push('/explore');
                  } else {
                    this.toast.error('Something Went Wrong! Try Again or contact support!');
                    this.listloading = false;
                  }
                })
                .catch((err) => console.error(err));
          }
        }
      }
    },
    // auctionlisting: async function(collection) {
    //   let network = await this.checkNetwork();
    //   this.priceETH = document.getElementById("auction_priceETH").value;
    //   this.duration = document.getElementById("auction_duration").value;
    //   if (!network) {
    //     Swal.fire({
    //       title: `<h3 style='color: #25BE40'>Please Switch to ${process.env.VUE_APP_NETWORK} Network!</h3>`,
    //       text: `In order to trade items, please switch to ${process.env.VUE_APP_NETWORK} Network within your Metamask Wallet.`,
    //       icon: "question",
    //       showCancelButton: true,
    //       confirmButtonColor: "#3085d6",
    //       cancelButtonColor: "#d33",
    //       confirmButtonText: "Yes, switch!",
    //     }).then(async (result) => {
    //       if (result.isConfirmed) {
    //         await this.change();
    //       }
    //     });
    //   } else {
    //     if (this.priceETH == "") {
    //       this.toast.error("Please set Price!");
    //     } else if(this.duration == "") {
    //       this.toast.error("Please set Auction Duration!");
    //     } else {
    //       var tokenId;
    //       var contract;
    //       const web3 = window.ethereum ? new Web3(window.ethereum) : null;
    //       if(this.$cookies.get("connectionType") == "mt") {
    //         const CollectionContract = new this.$Web3.ethers.Contract(Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],NFTCollectionABI,this.$Web3.getProvider()?.getSigner());
    //         const betaMarketplaceContract = new this.$Web3.ethers.Contract(Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],BetaNFTMarketplaceABI,this.$Web3.getProvider()?.getSigner());
    //         const mintAction = await CollectionContract.mintItem(collection,this.metadata,{ from: this.account });
    //         try {
    //           await mintAction.wait();
    //           this.toast.success("Initialize Success");
    //           this.isinit = false;
    //           this.isapprove = true;
    //           document.getElementById("initialization").innerHTML = "Success!"
    //         } catch (error) {
    //           console.error(error);
    //           this.listloading = false;
    //           this.toast.error("Something Went Wrong! Try Again please!");
    //         }
    //         await CollectionContract.gettokenIdByTokenURI(collection,this.metadata).then(async (res) => {
    //           tokenId = res.toString();
    //           await NFTCtr.settokenid(this.collection, this.metadata, tokenId).then((resp) => {
    //             if (resp.data.result) {
    //               this.toast.success( "Set Id Success!");
    //               contract = resp.data.contract;
    //             } else {
    //               this.toast.error("Something went wrong!");
    //             }
    //           }).catch((err) => console.error(err));

    //           const ApproveAction = await CollectionContract.approve(collection,Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],tokenId,{ from: this.account });
    //           try {
    //             await ApproveAction.wait();
    //             this.isapprove = false;
    //             this.islist = true;
    //             document.getElementById("approving").innerHTML = "Success!";
    //             this.toast.success("Item Approved!");
    //           } catch (error) {
    //             console.error(error);
    //             this.listloading = false;
    //             this.toast.error("Something Went Wrong! Try Again please!");
    //           }
    //         }).catch ((error) => {
    //           console.error(error);
    //           this.listloading = false;
    //           this.toast.error("Something Went Wrong! Try Again please!");
    //         });
    //         console.log(contract, tokenId, String(this.duration*86400) ,web3.utils.toWei(this.priceETH, "ether"), this.account)
    //         const makeoffer = await betaMarketplaceContract.createAuction(contract,tokenId, String(this.duration*86400) ,web3.utils.toWei(this.priceETH, "ether"),{ from: this.account });
    //         try {
    //           await makeoffer.wait();
    //         } catch (error) {
    //           console.error(error);
    //           this.listloading = false;
    //           this.toast.error("Something Went Wrong! Try Again Please!");
    //         }

    //         await NFTCtr.setAuctionData(this.collection, this.metadata, Math.floor((new Date()).getTime() / 1000)+this.duration*86400).then((res) => {
    //           if (res.data.result) {
    //             this.toast.success("Complete Listing");
    //             this.listloading = false;
    //             this.islist = false;
    //             document.getElementById("listing").innerHTML = "success!"
    //             this.$router.push("/explore");
    //           } else {
    //             this.toast.error("Something went wrong!");
    //             this.listloading = false;
    //           }
    //         }).catch((err) => console.error(err));
    //       }
    //     }
    //   }
    // },
  },
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.swal2-title {
  color: black !important;
}

.trait {
  display: block !important;
}

.prop-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid blue;
  padding: 10px;
  border-radius: 10px;
  background: lightblue;
}

.type,
.banner {
  color: blue;
  font-size: 15px;
}

.name {
  color: black;
  font-size: 18px;
  font-weight: bold;
}

.level {
  display: flex;
  align-items: center;
}

.level-container {
  display: flex;
  flex-direction: row;
  text-align: center;
  border: 1px solid blue;
  padding: 10px;
  border-radius: 10px;
  background: lightblue;
}

.leveltype {
  color: blue;
  font-size: 15px;
  flex: 0.8;
}

.levelname {
  color: black;
  font-size: 18px;
  font-weight: bold;
  flex: 0.2;
}

.stats {
  display: flex;
  align-items: center;
}

.stats-container {
  display: flex;
  flex-direction: row;
  text-align: center;
  border: 1px solid blue;
  padding: 10px;
  border-radius: 10px;
  background: lightblue;
}

.statstype {
  color: blue;
  font-size: 15px;
  flex: 0.8;
}

.statsname {
  color: black;
  font-size: 18px;
  font-weight: bold;
  flex: 0.2;
}

.body-contain {
  display: flex;
  flex-direction: column;
}

.body-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sub-title {
  margin-left: 15px;
  font-size: 20px;
  font-weight: bold;
}

.waiting {
  font-size: 10px;
  font-weight: bold;
}
</style>
