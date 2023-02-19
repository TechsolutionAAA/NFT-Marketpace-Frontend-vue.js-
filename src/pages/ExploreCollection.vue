<template>
  <div
      class="page-wrap"
      v-if="flag"
  >
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
      <!-- hero -->
      <AuthorHero
          avatarSize="avatar-3"
          :coverImg="banner"
          :avatar="logo"
          :firstName="collectionname"
          lastName=""
          :username="description"
          :btnText="`Explore/` + this.collectionname"
          btnLink="/explore"
      ></AuthorHero>
      <!-- hero -->
      <div></div>
    </header>
    <!-- Blog  -->
    <section class="section-space-b blog-section">
      <div class="container">
        <div
            class="row g-gs"
            v-if="displayedRecords.length == 0"
        >
          <h1 id="nodata">No Data</h1>
        </div>
        <div
            class="row g-gs"
            v-else
        >
          <div
              class="col-lg-4 col-md-6"
              v-for="item of displayedRecords"
              :key="item.id"
          >
            <div class="card card-full card-blog">
              <div
                  class="d-block card-image"
                  @click="gotodetail(item.id, item.title)"
              >
                <img
                    :src="item.img"
                    class="card-img-top"
                    alt=""
                />
                <div class="bg-dark-transparent card-overlay">
                  <div class="d-flex align-items-center card-author">
                    <div class="flex-shrink-0 avatar avatar-2">
                      <img
                          :src="avatarPrefix + logo"
                          alt=""
                          class="rounded-circle"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body card-body-s1">
                <h4
                    class="card-title mb-3"
                    @click="gotodetail(item.id, item.title)"
                >
                  {{ item.title }}
                </h4>
                <p class="card-text">{{ item.description }}</p>
              </div>

              <hr class="my-0" />

              <div
                  class="card-body card-body-s1 py-3"
                  v-if="item.owner.toLowerCase() == account.toLowerCase()"
              >
                <div
                    class="card-action-Info"
                    v-if="item.offered"
                >
                  <span>
                    <em class="ni ni-calender-date me-1"></em>
                    Listed
                  </span>
                  <span>{{ item.price / 1000000000000000000 }} ETH</span>
                  <Circle v-if="cancelloading"></Circle>
                  <div
                      v-else
                      class="btn btn-dark d-block"
                      @click="cancelHandler(item.offerId, item.id)"
                  >
                    Cancel
                  </div>
                </div>
                <div
                    class="card-action-Info"
                    v-else
                >
                  <input
                      type="text"
                      :id="`relist-${item.id}`"
                      value="0.01"
                      class="form-control form-control-s1"
                      placeholder="e. g. 0.01"
                  />
                  <Circle v-if="listloading"></Circle>
                  <div
                      v-else
                      class="btn btn-dark d-block"
                      data-bs-toggle="modal"
                      data-bs-target="#Listingprocess"
                      @click="listhandler(item.id)"
                  >
                    List
                  </div>
                </div>
              </div>
              <div
                  class="card-body card-body-s1 py-3"
                  v-else
              >
                <div
                    class="card-action-Info"
                    v-if="item.offered"
                >
                  <span>
                    <em class="ni ni-calender-date me-1"></em>
                    Listed
                  </span>
                  <span>{{ item.price / 1000000000000000000 }} ETH</span>
                  <Circle v-if="buyloading"></Circle>
                  <div
                      v-else
                      class="btn btn-dark d-block"
                      data-bs-toggle="modal"
                      data-bs-target="#buyprocess"
                      @click="buyHandler(item.offerId, item.price, item.id)"
                  >
                    Buy Item
                  </div>
                </div>
                <div
                    class="card-action-Info"
                    v-else
                >
                  <span>Item's owner didn't offer yet</span>
                </div>
              </div>
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
    <!-- Listing Process -->
    <div
        class="modal fade"
        id="Listingprocess"
        tabindex="-1"
        aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">List Item</h4>
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
                <Circle v-if="isapprove"></Circle>
                <div
                    class="sub-title"
                    v-else
                >1
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
                >2
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
    <!-- Buy Processing -->
    <div
        class="modal fade"
        id="buyprocess"
        tabindex="-1"
        aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Buy Item</h4>
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
                <Circle></Circle>
                <div class="sub-title">Buy this item</div>
              </div>
              <div class="body-content">
                <p class="mb-3 sub-content">
                  To get set up for buying, you must pay funds to buy this item.
                </p>
                <p
                    class="mb-3 waiting"
                    id="approving"
                >
                  Waiting for approve...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end Modal -->
  </div>
  <!-- end page-wrap -->
</template>

<script>
import SectionData from '@/store/store.js';
import Swal from 'sweetalert2';
import { useToast } from "vue-toastification";
import Pagination from 'vue-pagination-2';
import Contract from '../services/contract/contract';
import NFTCollectionABI from '../services/contract/NFTCollection.json';
import NFTMarketpalceABI from '../services/contract/NFTMarketplace.json';
import NFTCtr from '../services/api/nftManagement';
import Web3 from 'web3';
import { Circle } from 'vue-loading-spinner';
import { NETWORKS } from '../utils/networks';
import jwt_decode from 'jwt-decode';

export default {
  name: 'ExploreCollection',
  components: {
    Circle,
    Pagination,
  },
  data() {
    return {
      SectionData,
      listloading: false,
      cancelloading: false,
      buyloading: false,
      page: 1,
      perPage: 9,
      account:
          this.$cookies.get('connectionType') == 'mt'
              ? window.ethereum.selectedAddress
              : this.$cookies.get('connectionType') == 'wc'
                  ? localStorage.getItem('wc_account')
                  : null,
      flag: false,
      Collections: [],
      offers: [],
      totalSupply: null,
      offercount: null,
      offerId: null,
      collectionname: this.$route.params.title,
      logo: this.$route.params.logo,
      featured: this.$route.params.featured,
      banner: this.$route.params.banner,
      description: this.$route.params.description,
      contractaddress: null,
      priceETH: null,
      isapprove: true,
      islist: false,
      avatarPrefix: 'https://gate.scenez.io/ipfs/',
    };
  },
  created: async function () {
    if (this.collectionname == undefined) {
      this.$router.push('/explore');
    } else {
      if (this.$cookies.get('connectionType') == 'mt') {
        const CollectionContract = new this.$Web3.ethers.Contract(
            Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
            NFTCollectionABI,
            this.$Web3.getProvider()
                ?.getSigner(),
        );
        await CollectionContract.nftcollectionsbyname(this.collectionname)
            .then((res) => {
              this.contractaddress = res.toString();
            })
            .catch((err) => console.error(err));
      } else if (this.$cookies.get('connectionType') == 'wc') {
        const CollectionContract = new this.$Web3.ethers.Contract(
            Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
            NFTCollectionABI,
            this.$Web3.wc_web3Provider()
                .getSigner(),
        );
        await CollectionContract.nftcollectionsbyname(this.collectionname)
            .then((res) => {
              this.contractaddress = res.toString();
            })
            .catch((err) => console.error(err));
      }
    }
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  methods: {
    gotodetail(id, title) {
      this.$router.push({
        name: 'itemDetails',
        params: {
          address: this.contractaddress,
          tokenid: id,
          formatedTitle: title.replaceAll(/[ #]/g, '_'),
          title: title,
        },
      });
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
          this.toast.success(`Network changed. ${NETWORKS[parseInt(_chainId, 16)]}`);
        });
      } else {
        this.toast.error('Please install Metamask on your browser.');
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
            console.log(addError);
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }

      window.ethereum.on('chainChanged', this.handleChainChanged);
    },
    handleChainChanged(_chainId) {
      // We recommend reloading the page, unless you must do otherwise
      console.log(_chainId);
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
    cancelHandler: async function (_id, tokenid) {
      let network = await this.checkNetwork();
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
        if (this.$cookies.get('connectionType') == 'mt') {
          this.cancelloading = true;
          const MarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              NFTMarketpalceABI,
              this.$Web3.getProvider()
                  ?.getSigner(),
          );
          const cancelAction = await MarketplaceContract.cancelOffer(
              this.collectionname,
              _id,
              { from: window.ethereum.selectedAddress },
          );
          try {
            await cancelAction.wait();
          } catch {
            this.toast.error('Cancel Offer failed!');
            this.cancelloading = false;
          }
          await NFTCtr.toggle_sale_status(
              this.collectionname,
              tokenid,
              false,
          )
              .then((res) => {
                if (res.data.result) {
                  this.toast.success('Cancel Offer Success!');
                  this.cancelloading = false;
                  this.$router.push('/explore');
                } else {
                  this.toast.error('Cancel Offer failed!');
                  this.cancelloading = false;
                }
              });
        } else if (this.$cookies.get('connectionType') == 'wc') {
          this.cancelloading = true;
          const MarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              NFTMarketpalceABI,
              this.$Web3.wc_web3Provider()
                  .getSigner(),
          );
          const cancelAction = await MarketplaceContract.cancelOffer(
              this.collectionname,
              _id,
              { from: localStorage.getItem('wc_account') },
          );
          try {
            await cancelAction.wait();
          } catch {
            this.toast.error('Cancel Offer failed!');
            this.cancelloading = false;
          }
          await NFTCtr.toggle_sale_status(
              this.collectionname,
              tokenid,
              false,
          )
              .then((res) => {
                if (res.data.result) {
                  this.toast.success('Cancel Offer Success!');
                  this.cancelloading = false;
                  this.$router.push('/explore');
                } else {
                  this.toast.error('Cancel Offer failed!');
                  this.cancelloading = false;
                }
              });
        }
      }
    },
    buyHandler: async function (_id, _price, _tokenid) {
      let network = await this.checkNetwork();

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
        if (this.$cookies.get('connectionType') == 'mt') {
          this.buyloading = true;
          const MarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              NFTMarketpalceABI,
              this.$Web3.getProvider()
                  ?.getSigner(),
          );
          const buyAction = await MarketplaceContract.fillOffer(
              this.collectionname,
              _id,
              {
                from: window.ethereum.selectedAddress,
                value: this.$Web3.ethers.utils.parseUnits(
                    (_price / 1000000000000000000).toString(),
                    18,
                ),
              },
          );
          try {
            await buyAction.wait();
          } catch {
            this.toast.error('Buy Item failed!');
            this.buyloading = false;
          }
          await NFTCtr.setTrack(
              this.collectionname,
              _tokenid,
              window.ethereum.selectedAddress.toLowerCase(),
          );
          await NFTCtr.toggle_sale_status(
              this.collectionname,
              _tokenid,
              false,
          )
              .then((res) => {
                if (res.data.result) {
                  this.toast.success('Buy Item Success!');
                  this.$router.push('/explore');
                  this.buyloading = false;
                  window.location.reload();
                } else {
                  this.toast.error('Buy Item failed!');
                  this.buyloading = false;
                }
              });
        } else if (this.$cookies.get('connectionType') == 'wc') {
          this.buyloading = true;
          const MarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              NFTMarketpalceABI,
              this.$Web3.wc_web3Provider()
                  .getSigner(),
          );
          const buyAction = await MarketplaceContract.fillOffer(
              this.collectionname,
              _id,
              {
                from: localStorage.getItem('wc_account'),
                value: this.$Web3.ethers.utils.parseUnits(
                    (_price / 1000000000000000000).toString(),
                    18,
                ),
              },
          );
          try {
            await buyAction.wait();
          } catch {
            this.toast.error('Buy Item failed!');
            this.buyloading = false;
          }
          await NFTCtr.setTrack(
              this.collectionname,
              _tokenid,
              localStorage.getItem('wc_account')
                  .toLowerCase(),
          );
          await NFTCtr.toggle_sale_status(
              this.collectionname,
              _tokenid,
              false,
          )
              .then((res) => {
                if (res.data.result) {
                  this.toast.success('Buy Item Success!');
                  this.$router.push('/explore');
                  this.buyloading = false;
                  window.location.reload();
                } else {
                  this.toast.error('Buy Item failed!');
                  this.buyloading = false;
                }
              });
        }
      }
    },
    listhandler: async function (_id) {
      let network = await this.checkNetwork();
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
        this.priceETH = document.getElementById(`relist-${_id}`).value;
        const web3 = window.ethereum ? new Web3(window.ethereum) : null;
        if (this.$cookies.get('connectionType') == 'mt') {
          const MarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              NFTMarketpalceABI,
              this.$Web3.getProvider()
                  ?.getSigner(),
          );
          const CollectionContract = new this.$Web3.ethers.Contract(
              Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
              NFTCollectionABI,
              this.$Web3.getProvider()
                  ?.getSigner(),
          );
          const ApproveAction = await CollectionContract.approve(
              this.collectionname,
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              _id,
              { from: window.ethereum.selectedAddress },
          );
          try {
            await ApproveAction.wait();
            this.toast.success('Approve Token Success!');
            this.isapprove = false;
            this.islist = true;
            document.getElementById('approving').innerHTML = 'Success!';
          } catch (error) {
            console.error(error);
            this.listloading = false;
            this.toast.error('Something Went Wrong! Try Again please!');
          }
          const makeoffer = await MarketplaceContract.makeOffer(
              this.collectionname,
              _id,
              web3.utils.toWei(this.priceETH, 'ether'),
              { from: window.ethereum.selectedAddress },
          );
          try {
            await makeoffer.wait();
          } catch (error) {
            console.error(error);
            this.listloading = false;
            this.toast.error('Something Went Wrong! Try Again Please!');
          }
          await NFTCtr.toggle_sale_status(this.collectionname, _id, true)
              .then(
                  (res) => {
                    if (res.data.result) {
                      this.toast.success('Complete Listing');
                      this.listloading = false;
                      this.islist = false;
                      document.getElementById('listing').innerHTML = 'success!';
                      this.$router.push('/explore');
                      window.location.reload();
                    } else {
                      this.toast.error('Making Offer failed!');
                      this.listloading = false;
                    }
                  },
              );
        } else if (this.$cookies.get('connectionType') == 'wc') {
          const MarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              NFTMarketpalceABI,
              this.$Web3.wc_web3Provider()
                  .getSigner(),
          );
          const CollectionContract = new this.$Web3.ethers.Contract(
              Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
              NFTCollectionABI,
              this.$Web3.wc_web3Provider()
                  .getSigner(),
          );
          const ApproveAction = await CollectionContract.approve(
              this.collectionname,
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              _id,
              { from: localStorage.getItem('wc_account') },
          );
          try {
            await ApproveAction.wait();
            this.toast.success('Approve Token Success!');
            this.isapprove = false;
            this.islist = true;
            document.getElementById('approving').innerHTML = 'Success!';
          } catch (error) {
            console.error(error);
            this.listloading = false;
            this.toast.error('Something Went Wrong! Try Again please!');
          }
          const makeoffer = await MarketplaceContract.makeOffer(
              this.collectionname,
              _id,
              web3.utils.toWei(this.priceETH, 'ether'),
              { from: localStorage.getItem('wc_account') },
          );
          try {
            await makeoffer.wait();
          } catch (error) {
            console.error(error);
            this.listloading = false;
            this.toast.error('Something Went Wrong! Try Again Please!');
          }
          await NFTCtr.toggle_sale_status(this.collectionname, _id, true)
              .then(
                  (res) => {
                    if (res.data.result) {
                      this.toast.success('Complete Listing');
                      this.listloading = false;
                      this.islist = false;
                      document.getElementById('listing').innerHTML = 'success!';
                      this.$router.push('/explore');
                      window.location.reload();
                    } else {
                      this.toast.error('Making Offer failed!');
                      this.listloading = false;
                    }
                  },
              );
        }
      }
    },
  },
  mounted: async function () {
    if (sessionStorage.getItem('jwt') == null) {
      this.flag = false;
      this.$router.push('/connect');
    } else if (
        jwt_decode(sessionStorage.getItem('jwt')).exp <
        new Date() / 1000
    ) {
      this.flag = false;
      this.$router.push('/connect');
    } else {
      if (this.$cookies.get('connectionType') == 'mt') {
        this.connectWallet();
        if (this.collectionname == undefined) {
          this.$router.push('/explore');
        } else {
          this.flag = true;
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
          try {
            await CollectionContract.totalSupply(this.collectionname)
                .then((res) => {
                  this.totalSupply = res.toString();
                })
                .catch((err) => console.error(err));
          } catch (error) {
            console.error(error);
          }
          for (let i = 0; i < this.totalSupply; i++) {
            const hash = await CollectionContract.tokenURI(
                this.collectionname,
                i + 1,
            );
            try {
              const response = await fetch(
                  `https://gate.scenez.io/ipfs/${hash.substring(7, 53)}`,
              );
              const metadata = await response.json();
              const owner = await CollectionContract.ownerOf(
                  this.collectionname,
                  i + 1,
              );
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
              ];
              console.log(this.Collections);
            } catch {
              console.log('ipfs connection is very very very slow!');
            }
          }
          try {
            await MarketplaceContract.offerCount()
                .then((res) => {
                  this.offercount = res.toString();
                })
                .catch((err) => console.error(err));
          } catch (error) {
            console.error(error);
          }
          for (let i = 0; i < this.offercount; i++) {
            const offerdata = await MarketplaceContract.offers(
                this.collectionname,
                i + 1,
            );
            if (
                offerdata.fulfilled == false &&
                offerdata.cancelled == false &&
                offerdata.offerId != 0
            ) {
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
              ];
            }
          }
          this.offers = this.offers
              .map((offer) => {
                offer.offerId = parseInt(offer.offerId);
                offer.id = parseInt(offer.id);
                offer.price = parseInt(offer.price);
                return offer;
              })
              .filter(
                  (offer) =>
                      offer.fulfilled == false &&
                      offer.cancelled == false &&
                      offer.offerId !== 0,
              );
        }
      } else if (this.$cookies.get('connectionType') == 'wc') {
        this.wcfunc();
        if (this.collectionname == undefined) {
          this.$router.push('/explore');
        } else {
          this.flag = true;
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
          try {
            await CollectionContract.totalSupply(this.collectionname)
                .then((res) => {
                  this.totalSupply = res.toString();
                })
                .catch((err) => console.error(err));
          } catch (error) {
            console.error(error);
          }
          for (let i = 0; i < this.totalSupply; i++) {
            const hash = await CollectionContract.tokenURI(
                this.collectionname,
                i + 1,
            );
            try {
              const response = await fetch(
                  `https://gate.scenez.io/ipfs/${hash.substring(7, 53)}`,
              );
              const metadata = await response.json();
              const owner = await CollectionContract.ownerOf(
                  this.collectionname,
                  i + 1,
              );
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
              ];
              console.log(this.Collections);
            } catch {
              console.log('ipfs connection is very very very slow!');
            }
          }
          try {
            await MarketplaceContract.offerCount()
                .then((res) => {
                  this.offercount = res.toString();
                })
                .catch((err) => console.error(err));
          } catch (error) {
            console.error(error);
          }
          for (let i = 0; i < this.offercount; i++) {
            const offerdata = await MarketplaceContract.offers(
                this.collectionname,
                i + 1,
            );
            if (
                offerdata.fulfilled == false &&
                offerdata.cancelled == false &&
                offerdata.offerId != 0
            ) {
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
              ];
            }
          }
          this.offers = this.offers
              .map((offer) => {
                offer.offerId = parseInt(offer.offerId);
                offer.id = parseInt(offer.id);
                offer.price = parseInt(offer.price);
                return offer;
              })
              .filter(
                  (offer) =>
                      offer.fulfilled == false &&
                      offer.cancelled == false &&
                      offer.offerId !== 0,
              );
        }
      }
    }
  },
  computed: {
    displayedRecords() {
      const startIndex = this.perPage * (this.page - 1);
      const endIndex = startIndex + this.perPage;
      this.Collections.map((item) => {
        if (this.offers.length !== 0) {
          for (var i = 0; i < this.offers.length; i++) {
            if (item.id == this.offers[i].id) {
              const price = this.offers[i].price;
              const owner = this.offers[i].user;
              item.price = price;
              item.owner = owner;
              item.offered = true;
              item.offerId = this.offers[i].offerId;
            }
          }
        }
      });
      return this.Collections.slice(startIndex, endIndex);
    },
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

.swal2-title {
  color: black !important;
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

.g-gs {
  margin-top: 1%;
}

.card-image {
  cursor: pointer;
}
</style>
