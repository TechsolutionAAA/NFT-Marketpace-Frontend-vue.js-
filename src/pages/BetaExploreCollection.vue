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
          :coverImg="imgBanner"
          :avatar="logo"
          :firstName="collectionname"
          lastName=""
          :username="description"
          :btnText="`Explore/` + this.collectionname"
          btnLink="/explore"
          :status="status"
          :noCollectionImagePrefix="true"
          :noBannerPrefix="true"
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
                  @click="gotodetail(item.contract, item.tokenId, item.title)"
              >
                <img
                    id="background"
                    :src="
                    item.img.includes(`https://`, 0)
                      ? item.img
                      : item.img.includes(`ipfs://`)
                      ? `https://ipfs.io/ipfs/${item.img.substr(7)}`
                      : avatarPrefix + item.img
                  "
                    class="card-img-top"
                    alt=""
                />
                <div class="bg-dark-transparent card-overlay">
                  <div class="d-flex align-items-center card-author">
                    <div class="flex-shrink-0 avatar avatar-2">
                      <img
                          :src="item.ownerProfileImage"
                          alt=""
                          class="rounded-circle"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body card-body-s1">
                <h4 class="card-title mb-3">{{ item.title }}</h4>
                <p
                    class="card-text"
                    id="description"
                >{{ item.description }}</p>
              </div>

              <hr class="my-0" />

              <div v-if="item.status">
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
                        @click="
                        cancelHandler(
                          item.offerId,
                          item.tokenId,
                          item.flagforsale,
                        )
                      "
                    >
                      Cancel
                    </div>
                  </div>
                  <div
                      class="card-action-Info"
                      v-else
                  >
                    <input
                        type="number"
                        min="0"
                        step="0.0001"
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
                        @click="
                        listhandler(
                          item.tokenId,
                          item.flagforsale,
                          item.collection_name,
                        )
                      "
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
                        @click="
                        buyHandler(
                          item.offerId,
                          item.price,
                          item.tokenId,
                          item.flagforsale,
                        )
                      "
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
              <div v-else>
                <div
                    class="card-body card-body-s1 py-3"
                    v-if="item.owner.toLowerCase() == account.toLowerCase()"
                >
                  <div class="card-action-Info">
                    <input
                        type="number"
                        :id="`relist-${item.tokenId}`"
                        value="0.01"
                        class="form-control form-control-s1"
                        min="0"
                        step="0.0001"
                        placeholder="e. g. 0.01"
                    />
                    <Circle v-if="listloading"></Circle>
                    <div
                        v-else
                        class="btn btn-dark d-block"
                        data-bs-toggle="modal"
                        data-bs-target="#Listingprocess"
                        @click="
                        listhandler(
                          item.tokenId,
                          item.flagforsale,
                          item.collection_name,
                        )
                      "
                    >
                      List
                    </div>
                  </div>
                </div>
                <div
                    class="card-body card-body-s1 py-3"
                    v-else
                >
                  <div class="card-action-Info">
                    <span>Item's owner didn't offer yet</span>
                  </div>
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
import Pagination from 'vue-pagination-2';
import { useToast } from 'vue-toastification';
import Contract from '../services/contract/contract';
import BetaNFTMarketplaceABI from '../services/contract/BetaNFTMarketplace.json';
import NFTABI from '../services/contract/NFT.json';
import ERC721ABI from '../services/contract/ERC721.json';
import NFTMarketpalceABI from '../services/contract/NFTMarketplace.json';
import NFTCollectionABI from '@/services/contract/NFTCollection.json';
import NFTCtr from '../services/api/nftManagement';
import Web3 from 'web3';
import { Circle } from 'vue-loading-spinner';
import { NETWORKS } from '../utils/networks';
import jwt_decode from 'jwt-decode';
import user from '@/services/api/userManagement.js';

export default {
  name: 'BetaExploreCollection',
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
      totalSupply: null,
      offerId: null,
      featured: this.$route.params.featured,
      banner: this.$route.params.banner,
      priceETH: null,
      isapprove: true,
      islist: false,
      avatarPrefix: 'https://gate.scenez.io/ipfs/',
      account:
          this.$cookies.get('connectionType') == 'mt'
              ? window.ethereum.selectedAddress
              : this.$cookies.get('connectionType') == 'wc'
                  ? localStorage.getItem('wc_account')
                  : null,
      flag: false,
      collectionAddress: this.$route.params.collection,
      collectionname: this.$route.params.title,
      description: this.$route.params.description,
      logo: this.$route.params.logo,
      imgBanner: null,
      status: this.$route.params.nft_mint_status,
      Collections: [],
      offers: [],
      offercount: null,
      page: 1,
      perPage: 9,
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    // Make it available inside methods
    return { toast };
  },
  methods: {
    gotodetail(token_address, token_id, metadataname) {
      this.$router.push({
        name: 'itemDetails',
        params: {
          address: token_address,
          tokenid: token_id,
          formatedTitle: metadataname.replaceAll(/[ #]/g, '-'),
          title: metadataname,
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
          this.toast.success(`Network changed: ${NETWORKS[parseInt(_chainId, 16)]}`);
        });
      } else {
        this.toast.error('Please install MetaMask to your browser!');
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
            console.info(addError);
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
    cancelHandler: async function (_id, tokenid, flagforsale) {
      let network = await this.checkNetwork();
      if (!network) {
        Swal.fire({
          title: `<h3 style='color: #25BE40'>Please Switch to ${process.env.VUE_APP_NETWORK} Network!</h3>`,
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
          if (flagforsale) {
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
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
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
          } else {
            this.cancelloading = true;
            const BetaMarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                BetaNFTMarketplaceABI,
                this.$Web3.getProvider()
                    ?.getSigner(),
            );
            const cancelAction = await BetaMarketplaceContract.cancelMarketItem(
                this.collectionAddress,
                _id,
                { from: window.ethereum.selectedAddress },
            );
            try {
              await cancelAction.wait();
            } catch {
              this.toast.error('Cancel Offer failed!');
              this.cancelloading = false;
            }
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
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
        } else if (this.$cookies.get('connectionType') == 'wc') {
          if (flagforsale) {
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
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
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
          } else {
            this.cancelloading = true;
            const BetaMarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                BetaNFTMarketplaceABI,
                this.$Web3.wc_web3Provider()
                    .getSigner(),
            );
            const cancelAction = await BetaMarketplaceContract.cancelMarketItem(
                this.collectionAddress,
                _id,
                { from: localStorage.getItem('wc_account') },
            );
            try {
              await cancelAction.wait();
            } catch {
              this.toast.error('Cancel Offer failed!');
              this.cancelloading = false;
            }
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
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
      }
    },
    buyHandler: async function (_id, _price, _tokenid, flagforsale) {
      let network = await this.checkNetwork();

      if (!network) {
        Swal.fire({
          title: `<h3 style='color: #25BE40'>Please Switch to ${process.env.VUE_APP_NETWORK} Network!</h3>`,
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
          if (flagforsale) {
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
              this.toast.error('Buy Item failed! If you keep seeing this, contact support!');
              this.buyloading = false;
            }
            await NFTCtr.setTrack(
                this.collectionname,
                _tokenid,
                window.ethereum.selectedAddress.toLowerCase(),
            );
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
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
          } else {
            this.buyloading = true;
            const BetaMarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                BetaNFTMarketplaceABI,
                this.$Web3.getProvider()
                    ?.getSigner(),
            );
            const buyAction = await BetaMarketplaceContract.createMarketSale(
                this.collectionAddress,
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
              this.toast.error('Buy Item failed! If you keep seeing this, contact support!');
              this.buyloading = false;
            }
            await NFTCtr.setTrack_Contract(
                this.collectionAddress,
                _tokenid,
                window.ethereum.selectedAddress.toLowerCase(),
            );
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
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
                    this.toast.error('Buy Item failed! If you keep seeing this, contact support!');
                    this.buyloading = false;
                  }
                });
          }
        } else if (this.$cookies.get('connectionType') == 'wc') {
          if (flagforsale) {
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
                  from: this.account,
                  value: this.$Web3.ethers.utils.parseUnits(
                      (_price / 1000000000000000000).toString(),
                      18,
                  ),
                },
            );
            try {
              await buyAction.wait();
            } catch {
              this.toast.error('Buy Item failed! If you keep seeing this, contact support!');
              this.buyloading = false;
            }
            await NFTCtr.setTrack(
                this.collectionname,
                _tokenid,
                this.account.toLowerCase(),
            );
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
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
                    this.toast.error('Buy Item failed! If you keep seeing this, contact support!');
                    this.buyloading = false;
                  }
                });
          } else {
            this.buyloading = true;
            const BetaMarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                BetaNFTMarketplaceABI,
                this.$Web3.getProvider()
                    ?.getSigner(),
            );
            const buyAction = await BetaMarketplaceContract.createMarketSale(
                this.collectionAddress,
                _id,
                {
                  from: this.account,
                  value: this.$Web3.ethers.utils.parseUnits(
                      (_price / 1000000000000000000).toString(),
                      18,
                  ),
                },
            );
            try {
              await buyAction.wait();
            } catch {
              this.toast.error('Buy Item failed! If you keep seeing this, contact support!');
              this.buyloading = false;
            }
            await NFTCtr.setTrack_Contract(
                this.collectionAddress,
                _tokenid,
                this.account.toLowerCase(),
            );
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
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
                    this.toast.error('Buy Item failed! If you keep seeing this, contact support!');
                    this.buyloading = false;
                  }
                });
          }
        }
      }
    },
    listhandler: async function (_id, flagforsale, name) {
      let network = await this.checkNetwork();
      if (!network) {
        Swal.fire({
          title: `<h3 style='color: #25BE40'>Please Switch to ${process.env.VUE_APP_NETWORK} Network!</h3>`,
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
          const BetaMarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
              BetaNFTMarketplaceABI,
              this.$Web3.getProvider()
                  ?.getSigner(),
          );
          const NFTContract = new this.$Web3.ethers.Contract(
              this.collectionAddress,
              ERC721ABI,
              this.$Web3.getProvider()
                  ?.getSigner(),
          );
          const NFTs = new this.$Web3.ethers.Contract(
              this.collectionAddress,
              NFTABI,
              this.$Web3.getProvider()
                  ?.getSigner(),
          );
          const MarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              NFTMarketpalceABI,
              this.$Web3.getProvider()
                  ?.getSigner(),
          );
          if (flagforsale) {
            const CollectionContract = new this.$Web3.ethers.Contract(
                Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
                NFTCollectionABI,
                this.$Web3.getProvider()
                    ?.getSigner(),
            );
            const importAction = await CollectionContract.importnft(
                this.collectionAddress,
                this.collectionname,
            );
            try {
              await importAction.wait();
              this.toast.success('Imported your NFT Successfully!');
            } catch (err) {
              console.info(err);
              this.toast.error('Something Went Wrong! Try Again please!');
            }

            const ApproveAction = await NFTs.approve(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                _id,
                this.account,
            );
            try {
              await ApproveAction.wait();
              this.toast.success('NFT has been successfully approved!');
              this.isapprove = false;
              this.islist = true;
              document.getElementById('approving').innerHTML = 'Success!';
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again please!');
            }
            const makeoffer = await MarketplaceContract.makeOffer(
                name,
                _id,
                web3.utils.toWei(this.priceETH, 'ether'),
                { from: this.account },
            );
            try {
              await makeoffer.wait();
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again Please!');
            }
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
                _id,
                true,
            )
                .then((res) => {
                  if (res.data.result) {
                    this.toast.success('Listing Completed!');
                    this.listloading = false;
                    this.islist = false;
                    document.getElementById('listing').innerHTML = 'success!';
                    this.$router.push('/explore');
                    window.location.reload();
                  } else {
                    this.toast.error('Making Offer failed!');
                    this.listloading = false;
                  }
                });
          } else {
            const ApproveAction = await NFTContract.approve(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                _id,
            );
            try {
              await ApproveAction.wait();
              this.toast.success('NFT has been successfully approved!');
              this.isapprove = false;
              this.islist = true;
              document.getElementById('approving').innerHTML = 'Success!';
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again please!');
            }
            const makeoffer = await BetaMarketplaceContract.createMarketItem(
                this.collectionAddress,
                _id,
                web3.utils.toWei(this.priceETH, 'ether'),
                { from: this.account },
            );
            try {
              await makeoffer.wait();
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again Please!');
            }
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
                _id,
                true,
            )
                .then((res) => {
                  if (res.data.result) {
                    this.toast.success('Listing Completed!');
                    this.listloading = false;
                    this.islist = false;
                    document.getElementById('listing').innerHTML = 'success!';
                    this.$router.push('/explore');
                    window.location.reload();
                  } else {
                    this.toast.error('Making Offer failed!');
                    this.listloading = false;
                  }
                });
          }
        } else if (this.$cookies.get('connectionType') == 'wc') {
          const BetaMarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
              BetaNFTMarketplaceABI,
              this.$Web3.wc_web3Provider()
                  .getSigner(),
          );
          const NFTContract = new this.$Web3.ethers.Contract(
              this.collectionAddress,
              ERC721ABI,
              this.$Web3.wc_web3Provider()
                  .getSigner(),
          );
          const NFTs = new this.$Web3.ethers.Contract(
              this.collectionAddress,
              NFTABI,
              this.$Web3.wc_web3Provider()
                  .getSigner(),
          );
          const MarketplaceContract = new this.$Web3.ethers.Contract(
              Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
              NFTMarketpalceABI,
              this.$Web3.wc_web3Provider()
                  .getSigner(),
          );
          if (flagforsale) {
            const ApproveAction = await NFTs.approve(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                _id,
                this.account,
            );
            try {
              await ApproveAction.wait();
              this.toast.success('NFT has been successfully approved!');
              this.isapprove = false;
              this.islist = true;
              document.getElementById('approving').innerHTML = 'Success!';
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again please!');
            }
            const makeoffer = await MarketplaceContract.makeOffer(
                name,
                _id,
                web3.utils.toWei(this.priceETH, 'ether'),
                { from: this.account },
            );
            try {
              await makeoffer.wait();
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again Please!');
            }
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
                _id,
                true,
            )
                .then((res) => {
                  if (res.data.result) {
                    this.toast.success('Listing Completed!');
                    this.listloading = false;
                    this.islist = false;
                    document.getElementById('listing').innerHTML = 'success!';
                    this.$router.push('/explore');
                    window.location.reload();
                  } else {
                    this.toast.error('Making Offer failed!');
                    this.listloading = false;
                  }
                });
          } else {
            const ApproveAction = await NFTContract.approve(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                _id,
            );
            try {
              await ApproveAction.wait();
              this.toast.success('NFT has been successfully approved!');
              this.isapprove = false;
              this.islist = true;
              document.getElementById('approving').innerHTML = 'Success!';
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again please!');
            }
            const makeoffer = await BetaMarketplaceContract.createMarketItem(
                this.collectionAddress,
                _id,
                web3.utils.toWei(this.priceETH, 'ether'),
                { from: this.account },
            );
            try {
              await makeoffer.wait();
            } catch (error) {
              console.error(error);
              this.listloading = false;
              this.toast.error('Something Went Wrong! Try Again Please!');
            }
            await NFTCtr.toggle_sale_status_Contract(
                this.collectionAddress,
                _id,
                true,
            )
                .then((res) => {
                  if (res.data.result) {
                    this.toast.success('Listing Completed!');
                    this.listloading = false;
                    this.islist = false;
                    document.getElementById('listing').innerHTML = 'success!';
                    this.$router.push('/explore');
                    window.location.reload();
                  } else {
                    this.toast.error('Making Offer failed!');
                    this.listloading = false;
                  }
                });
          }
        }
      }
    },
    setCollectionData(data) {
      const collectionImage = data?.NFT_featured || this.$route.params.logo;
      const banner = data?.NFT_banner || this.$route.params.logo;
      this.logo = collectionImage?.includes(`https://`, 0)
          ? collectionImage
          : collectionImage?.includes(`ipfs://`)
              ? collectionImage.replace('ipfs://', 'https://ipfs.io/ipfs/')
              : collectionImage
                  ? this.avatarPrefix + collectionImage
                  : require('@/images/defaults/collection.jpg');

      this.imgBanner = banner?.includes(`https://`, 0)
          ? banner
          : banner?.includes(`ipfs://`)
              ? banner.replace('ipfs://', 'https://ipfs.io/ipfs/')
              : banner
                  ? this.avatarPrefix + banner
                  : require('@/images/defaults/banner.jpg');
    },
    async getCurrentOwnerProfileImage(owner) {
      const profile = await user.getUserProfile(owner);
      return this.avatarPrefix + profile?.data?.avatar;
    },
  },
  async mounted() {
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
        if (this.collectionAddress == undefined) {
          this.$router.push('/explore');
        } else {
          this.flag = true;
          let flags = false;
          await NFTCtr.getNFTItemByContractAddress(
              this.collectionAddress.toLowerCase(),
          )
              .then(async (res) => {
                for (let i = 0; i < res.data.result.length; i++) {
                  if (res.data.result[i].flagforsale) {
                    flags = true;
                  }
                  try {
                    const owner = res.data.result[i].owners.length == 0
                        ? res.data.result[i].creator
                        : res.data.result[i].owners[
                        res.data.result[i].owners.length - 1
                            ].current_address;
                    this.Collections = [
                      {
                        id: i + 1,
                        flagforsale: res.data.result[i].flagforsale,
                        tokenId: res.data.result[i].tokenId,
                        title: res.data.result[i].Item_title,
                        img: res.data.result[i].Item_logo,
                        description: res.data.result[i].Item_Description,
                        collection_name: res.data.result[i].Collection_name,
                        owner,
                        contract: this.collectionAddress,
                        ownerProfileImage: await this.getCurrentOwnerProfileImage(owner)
                      },
                      ...this.Collections,
                    ];
                  } catch (error) {
                    console.error(error);
                  }
                }
              });
          const { data } = await NFTCtr.getNFTSByCollection(this.collectionAddress);
          await this.setCollectionData(data.result);

          if (flags) {
            const MarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
                NFTMarketpalceABI,
                this.$Web3.getProvider()
                    ?.getSigner(),
            );
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
                ];
              } catch (error) {
                console.info('ipfs connections is very very very slow!', error);
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
          } else {
            const BetaMarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                BetaNFTMarketplaceABI,
                this.$Web3.getProvider()
                    ?.getSigner(),
            );
            try {
              await BetaMarketplaceContract.offerCount()
                  .then((res) => {
                    this.offercount = res.toString();
                  })
                  .catch((err) => console.error(err));
            } catch (error) {
              console.error(error);
            }

            for (let i = 0; i < this.offercount; i++) {
              const offerdata = await BetaMarketplaceContract.offers(
                  this.collectionAddress,
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
                    contract: offerdata.nftcontract,
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
      } else if (this.$cookies.get('connectionType') == 'wc') {
        this.wcfunc();
        if (this.collectionname == undefined) {
          this.$router.push('/explore');
        } else {
          this.flag = true;
          let flags = false;
          NFTCtr.getNFTItemByContractAddress(
              this.collectionAddress.toLowerCase(),
          )
              .then(async (res) => {
                for (let i = 0; i < res.data.result.length; i++) {
                  if (res.data.result[i].flagforsale) {
                    flags = true;
                  }
                  try {
                    this.Collections = [
                      {
                        id: i + 1,
                        flagforsale: res.data.result[i].flagforsale,
                        tokenId: res.data.result[i].tokenId,
                        title: res.data.result[i].Item_title,
                        img: res.data.result[i].Item_logo,
                        description: res.data.result[i].Item_Description,
                        collection_name: res.data.result[i].Collection_name,
                        owner:
                            res.data.result[i].owners.length == 0
                                ? res.data.result[i].creator
                                : res.data.result[i].owners[
                                res.data.result[i].owners.length - 1
                                    ].current_address,
                        contract: this.collectionAddress,
                      },
                      ...this.Collections,
                    ];
                  } catch (error) {
                    console.error(error);
                  }
                }
              });
          if (flags) {
            const MarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.NFTMarketaplace[Number(process.env.VUE_APP_ChainID)],
                NFTMarketpalceABI,
                this.$Web3.wc_web3Provider()
                    .getSigner(),
            );
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
                ];
              } catch (error) {
                console.info('ipfs connections is very very very slow!', error);
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
          } else {
            const BetaMarketplaceContract = new this.$Web3.ethers.Contract(
                Contract.BetaNFTMarketplace[Number(process.env.VUE_APP_ChainID)],
                BetaNFTMarketplaceABI,
                this.$Web3.wc_web3Provider()
                    .getSigner(),
            );
            try {
              await BetaMarketplaceContract.offerCount()
                  .then((res) => {
                    this.offercount = res.toString();
                  })
                  .catch((err) => console.error(err));
            } catch (error) {
              console.error(error);
            }
            for (let i = 0; i < this.offercount; i++) {
              const offerdata = await BetaMarketplaceContract.offers(
                  this.collectionAddress,
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
                    contract: offerdata.nftcontract.toString(),
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
    }
  },
  computed: {
    displayedRecords() {
      const startIndex = this.perPage * (this.page - 1);
      const endIndex = startIndex + this.perPage;
      this.Collections.map((item) => {
        if (this.offers.length !== 0) {
          for (var i = 0; i < this.offers.length; i++) {
            if (
                item.tokenId == this.offers[i].id &&
                !this.offers[i].cancelled &&
                !this.offers[i].fulfilled
            ) {
              item.price = this.offers[i].price;
              item.owner = this.offers[i].user;
              item.offered = true;
              item.offerId = this.offers[i].offerId;
              item.status = true;
            }
          }
        } else {
          item.status = false;
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

#description {
  overflow-y: scroll;
  height: 100px;
}

#description::-webkit-scrollbar {
  display: none;
}

#background {
  min-height: 200px;
}
</style>
