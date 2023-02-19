<template>
  <div class="page-wrap">
    <!-- header  -->
    <header class="header-section has-header-main">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
      <AuthorHero
        avatarSize="avatar-3"
        :coverImg="imgBa.includes(`ipfs://`) ? imgBa.substr(7) : imgBa"
        :avatar="imgLogo.includes(`ipfs://`) ? imgLogo.substr(7) : imgLogo"
        :firstName="title"
        lastName=""
        :username="metaText"
        btnText="My Collections"
        btnLink="/collections"
        :status="status"
      ></AuthorHero>
    </header>
    <section class="item-detail-section section-space">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 pe-xl-5">
            <div class="item-detail-content">
              <div class="item-detail-img-container mb-4">
                <img
                  :src="
                    itemimage.includes(`https://`, 0)
                      ? itemimage
                      : itemimage.includes(`ipfs://`)
                      ? `https://ipfs.io/ipfs/${itemimage.substr(7)}`
                      : avatarPrefix + itemimage
                  "
                  alt=""
                  class="w-100 rounded-3"
                />
              </div>
            </div>
          </div>
          <div
            class="col-lg-6"
            v-if="publicmint == `true` || publicmint == true"
          >
            <Countdown
              v-if="!this.ismintable"
              id="countdown"
              :deadline="this.mintabledate"
              @timeElapsed="timeElapsedHandler"
            />

            <div class="item-detail-content mt-4 mt-lg-0" id="publicmint">
              <h1 class="item-detail-title mb-2">{{ title }}</h1>
              <div
                class="item-detail-meta d-flex flex-wrap align-items-center mb-3"
              >
                <span class="item-detail-text-meta">{{ metaText }}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <h3>
                  <strong>{{ mintprice }}&nbsp;&nbsp;ETH</strong>
                  per Ticket
                </h3>
              </div>
              <h1>
                <strong># {{ balance }}</strong>
                &nbsp;/&nbsp;
                <strong># {{ supply }}</strong>
              </h1>
              <div class="item-detail-btns mt-4">
                <ul class="btns-group d-flex">
                  <li class="flex-grow-1">
                    <div v-if="!this.ismintable" class="btn btn-dark d-block">
                      <span>
                        Locked!!! After release the lock you can list item for
                        sale!
                      </span>
                    </div>
                    <div v-else class="btn btn-dark d-block" @click="mint()">
                      <Circle v-if="mintload"></Circle>
                      <span v-else>MINT ITEM</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="col-lg-6"
            v-if="publicmint == `false` || publicmint == false"
          >
            <div class="item-detail-content mt-4 mt-lg-0">
              <h1 class="item-detail-title mb-2">{{ title }}</h1>
              <div
                class="item-detail-meta d-flex flex-wrap align-items-center mb-3"
              >
                <span class="item-detail-text-meta">{{ metaText }}</span>
              </div>
              <div class="item-credits">
                <div class="row g-4">
                  <div class="col-xl-12">
                    <div class="card-media card-media-s1">
                      <router-link
                        to="/"
                        class="card-media-img flex-shrink-0 d-block"
                      >
                        <img
                          :src="
                            imgLogo.includes(`https://`, 0)
                              ? imgLogo
                              : imgLogo.includes(`ipfs://`)
                              ? `https://ipfs.io/ipfs/${imgLogo.substr(7)}`
                              : avatarPrefix + imgLogo
                          "
                          alt=""
                          class="w-100 rounded-3"
                        />
                      </router-link>
                      <div class="card-media-body">
                        <router-link to="/" class="fw-semibold">
                          @OWNER
                        </router-link>
                        <p class="fw-medium small">Creator</p>
                      </div>
                    </div>
                    <br />
                    <div class="card-media card-media-s1">
                      <router-link
                        to="/"
                        class="card-media-img flex-shrink-0 d-block"
                      >
                        <img
                          :src="
                            imgBa.includes(`https://`, 0)
                              ? imgBa
                              : imgBa.includes(`ipfs://`)
                              ? `https://ipfs.io/ipfs/${imgBa.substr(7)}`
                              : avatarPrefix + imgBa
                          "
                          alt=""
                          class="w-100 rounded-3"
                        />
                      </router-link>
                      <div class="card-media-body">
                        <router-link to="/" class="fw-semibold">
                          @Collections
                        </router-link>
                        <p class="fw-medium small">
                          {{ this.$route.params.id }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="item-detail-btns mt-4"
                v-if="this.$route.params.nft_mint_status == `true`"
              >
                <ul class="btns-group d-flex">
                  <li class="flex-grow-1">
                    <div
                      class="btn btn-dark d-block"
                      @click="this.$router.push(`/collections/create-single`)"
                    >
                      Add New Collection
                    </div>
                  </li>
                  <li class="flex-grow-1">
                    <div
                      class="btn btn-dark d-block"
                      @click="this.$router.push('/assets/create')"
                    >
                      Add Item
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end item-detail-section -->
    <!-- Related product -->
    <RelatedProduct
      :collection="title"
      :address="id"
      v-if="
        publicmint == `false` && this.$route.params.nft_mint_status == `true`
      "
    ></RelatedProduct>
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
import { Circle } from 'vue-loading-spinner'
import NFTCTR from '../services/api/nftManagement'
import { useToast } from "vue-toastification";
import { Countdown } from 'vue3-flip-countdown'
import Swal from 'sweetalert2'
import Contract from '../services/contract/contract'
import NFTCollectionABI from '../services/contract/NFTCollection.json'
import { NETWORKS } from '../utils/networks'
import jwt_decode from 'jwt-decode'
import Web3 from 'web3'
import axios from 'axios'

export default {
  name: 'ProductDetail',
  components: {
    Circle,
    Countdown,
  },
  data() {
    return {
      SectionData,
      item_title: this.$route.params.item_title,
      mintabledate: this.$route.params.mintdate,
      ismintable:
        new Date(this.$route.params.mintdate) < new Date() ? true : false,
      id: this.$route.params.id,
      itemimage: this.$route.params.item_image
        ? this.$route.params.item_image
        : '',
      title: this.$route.params.title,
      imgLogo: this.$route.params.imgLogo ? this.$route.params.imgLogo : '',
      logoext: this.$route.params.imgext,
      imgFe: this.$route.params.imgFe ? this.$route.params.imgFe : '',
      imgBa: this.$route.params.imgBa ? this.$route.params.imgBa : '',
      metaText: this.$route.params.metaText,
      publicmint: this.$route.params.publicmint,
      supply: this.$route.params.supply,
      mintprice: this.$route.params.mintprice,
      mintload: false,
      balance: null,
      avatarPrefix: 'https://gate.scenez.io/ipfs/',
      mintprefix: 'ipfs://',
      myETHBalance: null,
      status: this.$route.params.nft_mint_status,
    }
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  created: async function () {
    if (sessionStorage.getItem('jwt') == null) {
      this.$router.push('/connect')
    } else if (
      jwt_decode(sessionStorage.getItem('jwt')).exp <
      new Date() / 1000
    ) {
      this.flag = false
      this.$router.push('/connect')
    } else {
      if (this.$route.params.nft_mint_status == `true`) {
        var urlParams = new URL(location.href)
        var contract_address = urlParams.pathname.substring(13, 55)
        if (this.$cookies.get('connectionType') == 'mt') {
          this.connectWallet()
          const web = new Web3(window.ethereum)
          this.myETHBalance =
            (await web.eth.getBalance(window.ethereum.selectedAddress)) /
            1000000000000000000
          const CollectionContract = new this.$Web3.ethers.Contract(
            Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
            NFTCollectionABI,
            this.$Web3.getProvider()?.getSigner(),
          )
          if (this.item_title == undefined || this.title == undefined) {
            if (contract_address.indexOf('0x') == -1) {
              this.$router.push('/collections')
            } else {
              NFTCTR.getNFTSByCollection(contract_address)
                .then(async (res) => {
                  if (res.data.msg) {
                    var datas = res.data.result
                    this.item_title = datas.NFT_item_title
                    this.mintabledate = datas.mintdate
                    this.ismintable =
                      new Date(datas.mintdate) < new Date() ? true : false
                    this.id = datas.NFT_Contract
                    this.title = datas.NFT_Title
                    this.imgLogo = datas.NFT_logo
                    this.logoext = datas.NFT_logoext
                    this.imgFe = datas.NFT_featured
                    this.imgBa = datas.NFT_banner
                    this.metaText = datas.NFT_Description
                    this.publicmint = datas.publicmint
                    this.supply = datas.NFT_Supply
                    this.mintprice = datas.mintprice

                    await CollectionContract.totalSupply(this.title)
                      .then((resp) => {
                        this.balance = resp.toString()
                      })
                      .catch((err) => console.error(err))
                  } else if (!res.data.msg) {
                    this.$router.push('/collections')
                  }
                })
                .catch((err) => console.error(err))
            }
          } else {
            await CollectionContract.totalSupply(this.title)
              .then((res) => {
                this.balance = res.toString()
              })
              .catch((err) => console.error(err))
          }
        } else if (this.$cookies.get('connectionType') == 'wc') {
          this.wcfunc()
          const web = new Web3(window.ethereum)
          this.myETHBalance =
            (await web.eth.getBalance(localStorage.getItem('wc_account'))) /
            1000000000000000000
          const CollectionContract = new this.$Web3.ethers.Contract(
            Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
            NFTCollectionABI,
            this.$Web3.wc_web3Provider().getSigner(),
          )
          if (this.item_title == undefined || this.title == undefined) {
            if (contract_address.indexOf('0x') == -1) {
              this.$router.push('/collections')
            } else {
              NFTCTR.getNFTSByCollection(contract_address)
                .then(async (res) => {
                  console.log(res.data.msg)
                  if (res.data.msg) {
                    var datas = res.data.result
                    this.item_title = datas.NFT_item_title
                    this.mintabledate = datas.mintdate
                    this.ismintable =
                      new Date(datas.mintdate) < new Date() ? true : false
                    this.id = datas.NFT_Contract
                    this.title = datas.NFT_Title
                    this.imgLogo = datas.NFT_logo
                    this.logoext = datas.NFT_logoext
                    this.imgFe = datas.NFT_featured
                    this.imgBa = datas.NFT_banner
                    this.metaText = datas.NFT_Description
                    this.publicmint = datas.publicmint
                    this.supply = datas.NFT_Supply
                    this.mintprice = datas.mintprice
                    await CollectionContract.totalSupply(datas.NFT_Title)
                      .then((resp) => {
                        this.balance = resp.toString()
                      })
                      .catch((err) => console.error(err))
                  } else if (!res.data.msg) {
                    this.$router.push('/collections')
                  }
                })
                .catch((err) => console.error(err))
            }
          } else {
            await CollectionContract.totalSupply(this.title)
              .then((res) => {
                this.balance = res.toString()
              })
              .catch((err) => console.error(err))
          }
        }
      } else {
        this.$router.push('/collections/')
      }
    }
  },
  methods: {
    timeElapsedHandler: function () {
      this.ismintable = true
    },
    async wcfunc() {
      if (!this.$Web3.wc_provider().connected) {
        await this.$Web3.wc_provider().enable()
      }
    },
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
          this.toast.success(`Network changed. ${NETWORKS[parseInt(_chainId, 16)]}`)
        })
      } else {
        this.toast.error('Please install Metamask on your browser.')
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
      if (this.$cookies.get('connectionType') == 'mt') {
        var chainId = await this.$Web3.ethereum.request({
          method: 'eth_chainId',
        })
        if (chainId == Number(process.env.VUE_APP_ChainID)) {
          return true
        } else {
          return false
        }
      } else if (this.$cookies.get('connectionType') == 'wc') {
        var chainId_wc = await this.$Web3.wc_web3().eth.getChainId()
        if (chainId_wc == Number(process.env.VUE_APP_ChainID)) {
          return true
        } else {
          return false
        }
      }
    },
    async change() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${process.env.VUE_APP_ChainID}` }],
        })
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
            })
          } catch (addError) {
            console.log(addError)
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }

      window.ethereum.on('chainChanged', this.handleChainChanged)
    },
    handleChainChanged(_chainId) {
      // We recommend reloading the page, unless you must do otherwise
      console.log(_chainId)
      Swal.fire({
        text: `Switched to ${process.env.VUE_APP_NETWORK} network!`,
        icon: 'success',
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.reload()
        }
      })
    },
    mint: async function () {
      let network = await this.checkNetwork()
      if (!network) {
        Swal.fire({
          title: `<h3 style='color: #25BE40'>Please Switch to ${process.env.VUE_APP_NETWORK} Network!</h3>`,
          text: `In order to trade items, please switch to ${process.env.VUE_APP_NETWORK} Network within your Metamask Wallet.`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, switch!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.change()
          }
        })
      } else if (this.myETHBalance < this.mintprice) {
        this.toast.error("You don't have enough ETH!")
      } else {
        var tokenId
        await NFTCTR.getpublicmintstatus(this.title)
          .then(async (res) => {
            if (res.data.status) {
              this.toast.info('Another user is already on hold. Please retry later !')
            } else {
              await NFTCTR.getlatestItem(this.title).then(async (respo) => {
                if (respo.data.msg) {
                  if (respo.data.tokenId == Number(this.balance) + 1) {
                    Swal.fire({
                      title:
                        "<h3 style='color: #25BE40'>Get the latest data before clicking on mint.</h3>",
                      text: 'Are you sure ?',
                      icon: 'info',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'Do It!',
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        this.$router.push('/buyticket')
                      }
                    })
                  } else {
                    console.log('here')
                    if (this.$cookies.get('connectionType') == 'mt') {
                      console.log(this.title)
                      await NFTCTR.setpublicmintstatus(
                        window.ethereum.selectedAddress.toLowerCase(),
                        sessionStorage.getItem('vrcode'),
                        true,
                        this.title,
                      )
                        .then(async (response) => {
                          if (response.data.msg) {
                            this.mintload = true
                            const CollectionContract = new this.$Web3.ethers.Contract(
                              Contract.NFTCollection[
                                Number(process.env.VUE_APP_ChainID)
                              ],
                              NFTCollectionABI,
                              this.$Web3.getProvider()?.getSigner(),
                            )
                            console.log(
                              this.item_title,
                              Number(this.balance) + 1,
                            )
                            const metadata = {
                              name: `${this.item_title}#${
                                Number(this.balance) + 1
                              }`,
                              description: this.metaText,
                              image: `https://gate.scenez.io/ipfs/${this.itemimage}`,
                              imageextension: this.logoext,
                              collection_name: this.title,
                              creator: window.ethereum.selectedAddress,
                            }
                            const pinataJSONBody = {
                              pinataContent: metadata,
                            }
                            await axios
                              .post(
                                'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                                pinataJSONBody,
                                {
                                  headers: {
                                    'Content-Type': 'application/json',
                                    pinata_api_key: '90e0a50e9a348f1417d2',
                                    pinata_secret_api_key:
                                      '252a6d1b20e500d8acfc141c3dd433aa014b8864dbfab8912dcade976716b45d',
                                  },
                                },
                              )
                              .then(async (resp) => {
                                if (
                                  Number(this.balance) < Number(this.supply)
                                ) {
                                  const mintAction = await CollectionContract.publicmint(
                                    this.title,
                                    this.mintprefix + resp.data.IpfsHash,
                                    {
                                      from: window.ethereum.selectedAddress,
                                      value: this.$Web3.ethers.utils.parseUnits(
                                        this.mintprice.toString(),
                                        18,
                                      ),
                                    },
                                  )
                                  try {
                                    await mintAction.wait()
                                  } catch (error) {
                                    this.mintload = false
                                    console.error(error)
                                    this.isModalVisible = false
                                    await NFTCTR.setpublicmintstatus(
                                      window.ethereum.selectedAddress.toLowerCase(),
                                      sessionStorage.getItem('vrcode'),
                                      false,
                                      this.title,
                                    )
                                    this.toast.error('You rejected mint process!')
                                  }
                                  try {
                                    await CollectionContract.gettokenIdByTokenURI(
                                      this.title,
                                      this.mintprefix + resp.data.IpfsHash,
                                    ).then((id) => {
                                      tokenId = id.toString()
                                    })
                                  } catch (error) {
                                    this.mintload = false
                                    console.error(error)
                                    this.isModalVisible = false
                                    await NFTCTR.setpublicmintstatus(
                                      window.ethereum.selectedAddress.toLowerCase(),
                                      sessionStorage.getItem('vrcode'),
                                      false,
                                      this.title,
                                    )
                                    this.toast.error('Something Went Wrong! Try Again please!')
                                  }
                                  await NFTCTR.setItem(
                                    true,
                                    false,
                                    metadata.collection_name,
                                    metadata.name,
                                    metadata.description,
                                    metadata.image,
                                    metadata.imageextension,
                                    null,
                                    null,
                                    this.mintprefix + resp.data.IpfsHash,
                                    metadata.creator.toLowerCase(),
                                    tokenId,
                                    [],
                                    [],
                                    [],
                                  )
                                    .then(async (res1) => {
                                      if (res1.data.msg) {
                                        this.toast.success('Success mint Item!')
                                        await NFTCTR.setpublicmintstatus(
                                          window.ethereum.selectedAddress.toLowerCase(),
                                          sessionStorage.getItem('vrcode'),
                                          false,
                                          this.title,
                                        )
                                        this.$router.push('/explore')
                                        this.mintload = false
                                      } else {
                                        await NFTCTR.setpublicmintstatus(
                                          window.ethereum.selectedAddress.toLowerCase(),
                                          sessionStorage.getItem('vrcode'),
                                          false,
                                          this.title,
                                        )
                                        this.toast.error('Something Went Wrong! Please Try again!')
                                        this.mintload = false
                                      }
                                    })
                                    .catch((err) => console.error(err))
                                } else {
                                  await NFTCTR.setpublicmintstatus(
                                    window.ethereum.selectedAddress.toLowerCase(),
                                    sessionStorage.getItem('vrcode'),
                                    false,
                                    this.title,
                                  )
                                  this.mintload = false
                                  this.toast.error('Full Minted!')
                                }
                              })
                              .catch(async (err) => {
                                console.error(err)
                                this.mintload = false
                                await NFTCTR.setpublicmintstatus(
                                  window.ethereum.selectedAddress.toLowerCase(),
                                  sessionStorage.getItem('vrcode'),
                                  false,
                                  this.title,
                                )
                                this.toast.error('Something Went Wrong! Try Again please!')
                              })
                          } else {
                            this.toast.info('Another user is already on hold. Please retry later !')
                          }
                        })
                        .catch((err) => console.log(err))
                    } else if (this.$cookies.get('connectionType') == 'wc') {
                      await NFTCTR.setpublicmintstatus(
                        localStorage.getItem('wc_account').toLowerCase(),
                        sessionStorage.getItem('vrcode'),
                        true,
                        this.title,
                      )
                        .then(async (response1) => {
                          if (response1.data.msg) {
                            this.mintload = true
                            const CollectionContract = new this.$Web3.ethers.Contract(
                              Contract.NFTCollection[
                                Number(process.env.VUE_APP_ChainID)
                              ],
                              NFTCollectionABI,
                              this.$Web3.wc_web3Provider().getSigner(),
                            )
                            const metadata = {
                              name: `${this.item_title}#${
                                Number(this.balance) + 1
                              }`,
                              description: this.metaText,
                              image: `https://gate.scenez.io/ipfs/${this.itemimage}`,
                              imageextension: this.logoext,
                              collection_name: this.title,
                              creator: localStorage.getItem('wc_account'),
                            }
                            const pinataJSONBody = {
                              pinataContent: metadata,
                            }
                            await axios
                              .post(
                                'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                                pinataJSONBody,
                                {
                                  headers: {
                                    'Content-Type': 'application/json',
                                    pinata_api_key: '90e0a50e9a348f1417d2',
                                    pinata_secret_api_key:
                                      '252a6d1b20e500d8acfc141c3dd433aa014b8864dbfab8912dcade976716b45d',
                                  },
                                },
                              )
                              .then(async (resp) => {
                                if (
                                  Number(this.balance) < Number(this.supply)
                                ) {
                                  const mintAction = await CollectionContract.publicmint(
                                    this.title,
                                    this.mintprefix + resp.data.IpfsHash,
                                    {
                                      from: localStorage.getItem('wc_account'),
                                      value: this.$Web3.ethers.utils.parseUnits(
                                        this.mintprice.toString(),
                                        18,
                                      ),
                                    },
                                  )
                                  try {
                                    await mintAction.wait()
                                  } catch (error) {
                                    this.mintload = false
                                    console.error(error)
                                    this.isModalVisible = false
                                    await NFTCTR.setpublicmintstatus(
                                      localStorage
                                        .getItem('wc_account')
                                        .toLowerCase(),
                                      sessionStorage.getItem('vrcode'),
                                      false,
                                      this.title,
                                    )
                                    this.toast.error('You rejected mint process!')
                                  }
                                  try {
                                    await CollectionContract.gettokenIdByTokenURI(
                                      this.title,
                                      this.mintprefix + resp.data.IpfsHash,
                                    ).then((id) => {
                                      tokenId = id.toString()
                                    })
                                  } catch (error) {
                                    this.mintload = false
                                    console.error(error)
                                    this.isModalVisible = false
                                    await NFTCTR.setpublicmintstatus(
                                      localStorage
                                        .getItem('wc_account')
                                        .toLowerCase(),
                                      sessionStorage.getItem('vrcode'),
                                      false,
                                      this.title,
                                    )
                                    this.toast.error('Something Went Wrong! Try Again please!')
                                  }
                                  await NFTCTR.setItem(
                                    true,
                                    false,
                                    metadata.collection_name,
                                    metadata.name,
                                    metadata.description,
                                    metadata.image,
                                    metadata.imageextension,
                                    null,
                                    null,
                                    this.mintprefix + resp.data.IpfsHash,
                                    metadata.creator.toLowerCase(),
                                    tokenId,
                                    [],
                                    [],
                                    [],
                                  )
                                    .then(async (res2) => {
                                      if (res2.data.msg) {
                                        this.toast.success('Success mint Item!')
                                        await NFTCTR.setpublicmintstatus(
                                          localStorage
                                            .getItem('wc_account')
                                            .toLowerCase(),
                                          sessionStorage.getItem('vrcode'),
                                          false,
                                          this.title,
                                        )
                                        this.$router.push('/explore')
                                        this.mintload = false
                                      } else {
                                        await NFTCTR.setpublicmintstatus(
                                          localStorage
                                            .getItem('wc_account')
                                            .toLowerCase(),
                                          sessionStorage.getItem('vrcode'),
                                          false,
                                          this.title,
                                        )
                                        this.toast.error('Something Went Wrong! Please Try again!')
                                        this.mintload = false
                                      }
                                    })
                                    .catch((err) => console.error(err))
                                } else {
                                  this.mintload = false
                                  await NFTCTR.setpublicmintstatus(
                                    localStorage
                                      .getItem('wc_account')
                                      .toLowerCase(),
                                    sessionStorage.getItem('vrcode'),
                                    false,
                                    this.title,
                                  )
                                  this.toast.error('Full Minted!')
                                }
                              })
                              .catch(async (err) => {
                                console.error(err)
                                this.mintload = false
                                await NFTCTR.setpublicmintstatus(
                                  localStorage
                                    .getItem('wc_account')
                                    .toLowerCase(),
                                  sessionStorage.getItem('vrcode'),
                                  false,
                                  this.title,
                                )
                                this.toast.error('Something Went Wrong! Try Again please!')
                              })
                          } else {
                            this.toast.info('Another user is already on hold. Please retry later !')
                          }
                        })
                        .catch((err) => console.log(err))
                    }
                  }
                }
              })
            }
          })
          .catch((err) => console.log(err))
      }
    },
  },
}
</script>
<style scoped>
.swal2-title {
  color: black !important;
}
#placeholder {
  background: white;
}
</style>
