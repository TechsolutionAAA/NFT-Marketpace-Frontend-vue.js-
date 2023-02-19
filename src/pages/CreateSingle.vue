<template>
  <div class="page-wrap" v-if="flag">
    <!-- header  -->
    <header class="header-section has-header-main bg-pattern-3">
      <!-- Header main -->
      <HeaderMain></HeaderMain>
    </header>
    <!-- create -->
    <section class="create-section section-space-b pt-4 pt-md-5 mt-md-4">
      <div class="container">
        <div class="row justify-content-center">
          <Modal v-show="isModalVisible" />
          <div class="col-lg-8">
            <div class="section-head-sm">
              <router-link
                :to="SectionData.createSingleData.path"
                class="btn-link fw-semibold"
              >
                <em class="ni ni-arrow-left"></em>
                {{ SectionData.createSingleData.btnText }}
              </router-link>
              <h1 class="mt-2">{{ SectionData.createSingleData.title }}</h1>
            </div>
          </div>
          <!-- end col -->
          <div class="col-lg-8">
            <form action="#" class="form-create mb-5 mb-lg-0">
              <div class="form-item mb-4">
                <h4 class="mb-3">Logo image</h4>
                <p class="mb-3">
                  This image will also be used for navigation. 350 x 350
                  recommended.
                </p>
                <div class="file-upload-wrap logo">
                  <p class="file-name-logo mb-4" id="file-name-logo">
                    logo Image
                  </p>
                  <input
                    id="file-upload-logo"
                    class="file-upload-input-logo"
                    data-target="file-name-logo"
                    type="file"
                    hidden
                  />
                  <label
                    for="file-upload-logo"
                    class="input-label btn btn-dark"
                  >
                    Choose File
                  </label>
                </div>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-4">
                <h4 class="mb-3">Featured image</h4>
                <p class="mb-3">
                  This image will be used for featuring your collection on the
                  homepage, explore pages, or other promotional areas of Scenez.
                  600 x 400 recommended.
                </p>
                <div class="file-upload-wrap featured">
                  <p class="file-name-featured mb-4" id="file-name-featured">
                    Featured Image
                  </p>
                  <input
                    id="file-upload-featured"
                    class="file-upload-input-featured"
                    data-target="file-name-featured"
                    type="file"
                    hidden
                  />
                  <label
                    for="file-upload-featured"
                    class="input-label btn btn-dark"
                  >
                    Choose File
                  </label>
                </div>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-4">
                <h4 class="mb-3">Banner image</h4>
                <p class="mb-3">
                  This image will appear at the top of your collection page.
                  Avoid including too much text in this banner image, as the
                  dimensions change on different devices. 1400 x 400
                  recommended.
                </p>
                <div class="file-upload-wrap banner">
                  <p class="file-name-banner mb-4" id="file-name-banner">
                    Banner Image
                  </p>
                  <input
                    id="file-upload-banner"
                    class="file-upload-input-banner"
                    data-target="file-name-banner"
                    type="file"
                    hidden
                  />
                  <label
                    for="file-upload-banner"
                    class="input-label btn btn-dark"
                  >
                    Choose File
                  </label>
                </div>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-4">
                <div class="mb-4">
                  <label class="mb-2 form-label">Title</label>
                  <input
                    type="text"
                    v-model.trim="NFTTitle"
                    class="form-control form-control-s1"
                    placeholder="e. g. Redeemable T-Shirt with logo"
                  />
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label">Symbol</label>
                  <input
                    type="text"
                    v-model.trim="NFTSymbol"
                    class="form-control form-control-s1"
                    placeholder="Only 4 characters are allowed."
                    maxlength="4"
                    size="4"
                  />
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label">Description</label>
                  <textarea
                    name="message"
                    v-model.trim="NFTDescription"
                    class="form-control form-control-s1"
                    placeholder="e. g. After purchasing you'll be able to get the real T-Shirt"
                  ></textarea>
                </div>
                <div class="form-item mb-4">
                  <h5 class="mb-1">Choose category</h5>
                  <p class="form-text mb-3">
                    Adding a category will help make your item discoverable on
                    Scenez.
                  </p>
                  <v-select
                    class="generic-select"
                    id="nftcategory"
                    v-model="selected"
                    :options="options"
                  ></v-select>
                </div>
                <div class="form-item mb-3">
                  <div class="switch-wrap">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="me-2">
                        <h5 class="mb-1" id="PublicMint">
                          TICKETS WILL BE PUBLIC MINTED
                        </h5>
                        <p class="form-text">
                          To mint your specific ticket NFT.
                        </p>
                      </div>
                      <div class="form-check form-switch form-switch-s1">
                        <input
                          class="form-check-input checkbox-switcher"
                          id="nftaccesskey"
                          data-target="switch-content-unlock"
                          type="checkbox"
                        />
                      </div>
                      <!-- end form-check -->
                    </div>
                    <!-- end d-flex -->
                    <div
                      class="switch-content-unlock mt-4"
                      id="switch-content-unlock"
                    >
                      <label class="mb-2 form-label">Item Image</label>
                      <div class="file-upload-wrap item">
                        <p class="file-name-item mb-4" id="file-name-item">
                          Item Image
                        </p>
                        <input
                          id="file-upload-item"
                          class="file-upload-input-item"
                          data-target="file-name-item"
                          type="file"
                          hidden
                        />
                        <label
                          for="file-upload-item"
                          class="input-label btn btn-dark"
                        >
                          Choose File
                        </label>
                      </div>
                      <label class="mb-2 form-label">Item Title</label>
                      <input
                        type="text"
                        name="item_title"
                        class="form-control form-control-s1"
                        id="item_title"
                        placeholder="Enter Item Title"
                      />
                      <label class="mb-2 form-label">TOTAL SUPPLY</label>
                      <input
                        type="number"
                        name="number"
                        class="form-control form-control-s1"
                        id="supply"
                        min="0"
                        required="true"
                        placeholder="Enter total supply"
                      />
                      <label class="mb-2 form-label">
                        Mint Price per Ticket
                      </label>
                      <input
                        type="number"
                        name="number"
                        class="form-control form-control-s1"
                        id="priceperticket"
                        placeholder="Enter Mint Price Per Ticket"
                        min="0"
                        step="any"
                        required="true"
                      />
                      <label class="mb-2 form-label">
                        Please select available sale date.
                      </label>

                      <input
                        type="date"
                        name="date"
                        class="form-control form-control-s1 mb-3"
                        id="mintdate"
                      />
                    </div>
                  </div>
                  <!-- end switch-wrap -->
                </div>
                <!-- end form-item -->
                <div class="mb-3">
                  <label class="mb-2 form-label">Royalties</label>
                  <input
                    type="number"
                    id="nftroyalties"
                    class="form-control form-control-s1"
                    placeholder="e. g. 10%"
                    required="true"
                    min="0"
                    max="10"
                    step="1"
                  />
                  <p class="form-text mt-1">
                    Suggested: Range is 0 ~ 10% (0%, 1%, 2%, 5%, etc..)
                  </p>
                </div>

                <div
                  class="d-flex align-items-center justify-content-between mb-3"
                >
                  <div class="me-2" id="collaborator-container">
                    <h5 class="mb-1">Collaborators</h5>
                    <div class="d-flex">
                      <input
                        class="form-control form-control-s1"
                        id="nftCollaborators"
                        placeholder="e. g. 0xaaaffAb7763fB811f3d4C692BdA070A8474BcE93"
                        type="text"
                      />
                      <input
                        class="form-control form-control-s1"
                        id="CollaboratorRate"
                        required="true"
                        placeholder="e. g. 30"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                      />
                    </div>
                  </div>
                  <div class="form-check form-switch form-switch-s1">
                    <div id="btn_left">
                      <button
                        class="btn btn-dark"
                        type="button"
                        @click="add_collaborator()"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <!-- end form-check -->
                </div>
                <div
                  class="treasury-container collaboratoritem-container mb-3"
                  v-if="this.ischecked"
                >
                  <div class="collaborator_member">
                    Scenez Platform
                  </div>
                  <div>{{ this.creator_rate }}</div>
                </div>
                <div
                  v-for="collaboratoritem in collaborators"
                  :key="collaboratoritem.id"
                >
                  <div class="sub-container" :id="collaboratoritem.id">
                    <div
                      class="collaboratoritem-container mb-3"
                      v-html="collaboratoritem.content"
                    ></div>
                    <div
                      class="btn btn-dark d-block mb-3"
                      id="remove_handle"
                      v-on:click="this.remove_handle(collaboratoritem.id)"
                    >
                      <em class="ni ni-cross"></em>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-4" id="socials_container">
                <div class="mb-4">
                  <label class="mb-2 form-label">WebSite</label>
                  <input
                    type="text"
                    v-model.trim="weblink"
                    class="form-control form-control-s1"
                    placeholder="e. g. yoursite.io"
                  />
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label">Discord Link</label>
                  <input
                    type="text"
                    v-model.trim="discord_link"
                    class="form-control form-control-s1"
                    placeholder="e. g. https://discord.gg/abcdef"
                  />
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label">Instagram Link</label>
                  <input
                    type="text"
                    v-model.trim="instagram_link"
                    class="form-control form-control-s1"
                    placeholder="e. g. https://www.instagram.com/Yourinstagramhandle"
                  />
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label">Medium Link</label>
                  <input
                    type="text"
                    v-model.trim="medium_link"
                    class="form-control form-control-s1"
                    placeholder="e. g. https://www.medium.com/@YourMediumHandle"
                  />
                </div>
                <div class="mb-4">
                  <label class="mb-2 form-label">Telegram Link</label>
                  <input
                    type="text"
                    v-model.trim="telegram_link"
                    class="form-control form-control-s1"
                    placeholder="e. g. https://t.me/abcdef"
                  />
                </div>
              </div>
              <!-- end form-item -->
              <div class="mb-4" id="btn_group">
                <div id="btn_left">
                  <button
                    id="btn_right_clear"
                    class="btn btn-dark"
                    type="button"
                    @click="clear_item()"
                  >
                    Clear
                  </button>
                </div>
                <div id="btn_right">
                  <button
                    id="btn_right_save"
                    class="btn btn-dark"
                    type="button"
                    @click="save_item()"
                  >
                    Save Draft
                  </button>
                  <button
                    id="btn_right_publish"
                    data-bs-toggle="modal"
                    data-bs-target="#LoadingProcess"
                    class="btn btn-dark"
                    type="button"
                    @click="create_item()"
                  >
                    instant Publish
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- endn col -->
        </div>

        <!-- row-->
      </div>
      <!-- container -->
    </section>
    <!-- create-section -->
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
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
            <h4 class="modal-title">Create Collection</h4>
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
                <div class="sub-title">Create Your Collection</div>
              </div>
              <div class="body-content">
                <p class="mb-3 sub-content">
                  To get set up for creating your NFT collection on Scenez for
                  the first time, you must initialize your wallet, which
                  requires a one-time gas fee.
                </p>
                <p class="mb-3 waiting">Waiting for creation...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'
import { useToast } from "vue-toastification";
import Modal from '../components/common/Modal.vue'
import nft from '../services/api/nftManagement'
import Swal from 'sweetalert2'
import Contract from '../services/contract/contract'
import NFTCollectionABI from '../services/contract/NFTCollection.json'
import { NETWORKS } from '../utils/networks'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Circle } from 'vue-loading-spinner'
import userManagement from '../services/api/userManagement'

export default {
  name: 'CreateSingle',
  components: {
    Modal,
    Circle,
  },
  data() {
    return {
      SectionData,
      flag: true,
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
      ischecked: false,
      vrcode: sessionStorage.getItem('vrcode'),
      options: ['Art', 'Music', 'Video', 'Image', '3D', '4D'],
      selected: 'Select Category',
      isModalVisible: false,
      logouploadedfile: this.$route.params.logo
        ? this.$route.params.logo
        : null,
      logouploadedfileExt: this.$route.params.ext
        ? this.$route.params.ext
        : null,
      featureduploadedfile: this.$route.params.featured
        ? this.$route.params.featured
        : null,
      banneruploadedfile: this.$route.params.banner
        ? this.$route.params.banner
        : null,
      itemuploadedfile: this.$route.params.item
        ? this.$route.params.banner
        : null,
      nftid: this.$route.params.nftid,
      NFTTitle: this.$route.params.title ? this.$route.params.title : null,
      NFTDescription: this.$route.params.description
        ? this.$route.params.description
        : null,
      NFTCategory: this.$route.params.category
        ? this.$route.params.category
        : null,
      NFTRoyalties: this.$route.params.royalti ? this.$route.params.royalti : 0,
      weblink: this.$route.params.weblink ? this.$route.params.weblink : null,
      discord_link: this.$route.params.discord_link
        ? this.$route.params.discord_link
        : null,
      instagram_link: this.$route.params.instagram_link
        ? this.$route.params.instagram_link
        : null,
      medium_link: this.$route.params.medium_link
        ? this.$route.params.medium_link
        : null,
      telegram_link: this.$route.params.telegram_link
        ? this.$route.params.telegram_link
        : null,
      item_title: this.$route.params.item_title
        ? this.$route.params.item_title
        : null,
      public_supply: this.$route.params.supply
        ? this.$route.params.supply
        : null,
      priceperticket: this.$route.params.mintprice
        ? this.$route.params.mintprice
        : null,
      NFTContract: null,
      mintdate: null,
      collaborators: [],
      finalcollaborators: this.$route.params.collaborator
        ? this.$route.params.collaborator
        : [],
      rates: [],
      userRole: '',
      creator_rate: '',
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
    async connectWallet() {
      if (await this.isEthereumSupported()) {
        this.$Web3.isconnected = true
        this.connected = true
      }
    },
    async wcfunc() {
      if (!this.$Web3.wc_provider().connected) {
        await this.$Web3.wc_provider().enable()
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
        this.toast.error('Please use a MetaMask Enabled browser!')
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
    remove_handle(id) {
      if (this.finalcollaborators.length == id + 1) {
        this.collaborators = this.collaborators.filter((data) => data.id !== id)
        this.finalcollaborators = this.finalcollaborators.filter(
          (data) => data != this.finalcollaborators[id],
        )
        this.rates = this.rates.filter((data) => data != this.rates[id])
      } else {
        this.toast.info('Remove last added collaborator first!')
      }
    },
    add_collaborator() {
      let newCollaborator = document.getElementById('nftCollaborators').value
      let newRate = document.getElementById('CollaboratorRate').value
      let hundredrate = 100
      let currentrate = 0
      if (this.rates.length != 0) {
        for (let i = 0; i < this.rates.length; i++) {
          currentrate += Number(this.rates[i])
        }
      }

      if (newCollaborator == '') {
        this.toast.info("Input collaborator's address!")
      } else if (newRate == '') {
        this.toast.info("Input collaborator's Rate Value!")
      } else if (newCollaborator != '' && newCollaborator.indexOf('0x') != 0) {
        this.toast.info('Wallet Address seems invalid. Check again!')
        document.getElementById('nftCollaborators').focus()
      } else if (newCollaborator != '' && newCollaborator.length != 42) {
        this.toast.info('Wallet Address seems invalid. Check again!')
        document.getElementById('nftCollaborators').focus()
      } else if (this.finalcollaborators.includes(newCollaborator)) {
        this.toast.info('Already Added!')
        document.getElementById('nftCollaborators').innerHTML = ''
        document.getElementById('nftCollaborators').value = ''
      } else if (
        newRate != '' &&
        Number(newRate) + Number(currentrate) > hundredrate
      ) {
        this.toast.info('The sum of the percentages distributed to each collaborator must not exceed 100.')
        document.getElementById('CollaboratorRate').focus()
      } else if (newRate > 100 || newRate <= 0) {
        this.toast.info('Available value is in range 1 ~ 100!')
        document.getElementById('CollaboratorRate').focus()
      } else if (currentrate == hundredrate) {
        this.toast.info('This has already been minted!')
        document.getElementById('nftCollaborators').value = ''
        document.getElementById('CollaboratorRate').value = ''
      } else if (!this.finalcollaborators.includes(newCollaborator)) {
        this.collaborators.push({
          id: this.finalcollaborators.length,
          content: `
            <div class="collaborator_member">${
              document.getElementById('nftCollaborators').value
            }</div>
            <div>${document.getElementById('CollaboratorRate').value}</div>`,
        })
        this.finalcollaborators.push(newCollaborator)
        this.rates.push(newRate)
        document.getElementById('nftCollaborators').value = ''
        document.getElementById('CollaboratorRate').value = ''
      }
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
    clear_item: async function () {
      document.getElementById('file-name-logo').value = 'logo Image'
      document.getElementById('file-name-featured').value = 'Featured Image'
      document.getElementById('file-name-banner').value = 'Banner Image'
      document.getElementById('file-name-item').value = 'Item Image'
      document.getElementById('nftroyalties').value = ''
      document.getElementById('item_title').value = ''
      document.getElementById('supply').value = ''
      document.getElementById('priceperticket').value = ''
      document.getElementById('nftCollaborators').value = ''
      document.getElementById('CollaboratorRate').value = ''

      this.collaborators = []
      this.finalcollaborators = []
      this.rates = []
      this.ischecked = false
      this.isModalVisible = false
      this.logouploadedfile = null
      this.featureduploadedfile = null
      this.banneruploadedfile = null
      this.itemuploadedfile = null
      this.NFTTitle = null
      this.NFTSymbol = null
      this.NFTDescription = null
      this.NFTCategory = null
      this.NFTRoyalties = null
      this.weblink = null
      this.discord_link = null
      this.instagram_link = null
      this.medium_link = null
      this.telegram_link = null
      this.item_title = null
      this.public_supply = null
      this.priceperticket = null
      this.NFTContract = null
      this.mintdate = null

      this.$router.push('/collections/create-single')
      this.toast.success('Draft has been saved!')
    },
    save_item: async function () {
      let network = await this.checkNetwork()
      this.NFTCategory = document.getElementById('nftcategory').outerText
      this.NFTRoyalties = document.getElementById('nftroyalties').value
      this.public_supply = document.getElementById('supply').value
      this.priceperticket = document.getElementById('priceperticket').value
      this.mintdate = document.getElementById('mintdate').value

      let newColla = document.getElementById('nftCollaborators').value
      let deltaAddress = []
      let deltaRate = []

      for (let i = 0; i < this.finalcollaborators.length; i++) {
        deltaAddress.push(this.finalcollaborators[i])
        deltaRate.push(this.rates[i])
      }

      // Validation handle

      if (this.NFTRoyalties % 1) {
        this.toast.info('Decimal points are not allowed!')
        document.getElementById('nftroyalties').focus()
      } else if (this.NFTRoyalties > 10 || this.NFTRoyalties < 0) {
        this.toast.info('Only between 0 and 10')
        document.getElementById('nftroyalties').focus()
      } else if (newColla != '') {
        this.toast.info('Please confirm you added your OWN wallet address!')
        document.getElementById('nftCollaborators').focus()
      } else {
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
        } else {
          if (this.account == null || this.vrcode == null) {
            this.toast.error('Please login!')
            this.$router.push('/connect')
            this.closeModal()
          } else if (this.ischecked) {
            if (this.NFTTitle == '') {
              this.toast.error('Please enter title!')
            } else {
              this.showModal()
              await nft
                .saveNftdata(
                  this.account,
                  this.vrcode,
                  this.nftid,
                  true,
                  this.logouploadedfile,
                  this.logouploadedfileExt,
                  this.featureduploadedfile,
                  this.banneruploadedfile,
                  this.itemuploadedfile,
                  true,
                  true,
                  this.NFTTitle,
                  this.NFTDescription,
                  this.NFTContract,
                  this.NFTCategory,
                  this.NFTRoyalties,
                  deltaAddress,
                  deltaRate,
                  this.item_title,
                  this.public_supply,
                  new Date(this.mintdate).getFullYear() +
                    '/' +
                    (new Date(this.mintdate).getMonth() + 1) +
                    '/' +
                    new Date(this.mintdate).getDate(),
                  this.priceperticket,
                  this.weblink,
                  this.discord_link,
                  this.instagram_link,
                  this.medium_link,
                  this.telegram_link,
                )
                .then((res) => {
                  if (res.data.msg) {
                    this.toast.success('Saved one NFT Collection')
                    this.closeModal()
                    this.$router.push('/collections')
                    window.location.reload()
                  } else {
                    this.toast.error('Something Went Wrong! Please Try again!')
                  }
                })
            }
          } else {
            if (this.NFTTitle == '') {
              this.toast.error('Please enter title!')
            } else {
              this.showModal()
              await nft
                .saveNftdata(
                  this.account,
                  this.vrcode,
                  this.nftid,
                  true,
                  this.logouploadedfile,
                  this.logouploadedfileExt,
                  this.featureduploadedfile,
                  this.banneruploadedfile,
                  this.itemuploadedfile,
                  false,
                  true,
                  this.NFTTitle,
                  this.NFTDescription,
                  this.NFTContract,
                  this.NFTCategory,
                  this.NFTRoyalties,
                  deltaAddress,
                  deltaRate,
                  null,
                  1,
                  0,
                  0,
                  this.weblink,
                  this.discord_link,
                  this.instagram_link,
                  this.medium_link,
                  this.telegram_link,
                )
                .then((res) => {
                  if (res.data.msg) {
                    this.toast.success('Saved one NFT Collection')
                    this.closeModal()
                    this.$router.push('/collections')
                    window.location.reload()
                  } else {
                    this.toast.error('Something Went Wrong! Please Try again!')
                    this.closeModal()
                  }
                })
            }
          }
        }
      }
    },
    create_item: async function () {
      let network = await this.checkNetwork()
      this.NFTCategory = document.getElementById('nftcategory').outerText
      this.NFTRoyalties = document.getElementById('nftroyalties').value
      this.public_supply = document.getElementById('supply').value
      this.priceperticket = document.getElementById('priceperticket').value
      this.mintdate = document.getElementById('mintdate').value
      let deltaAddress = []
      let deltaRate = []
      let newColla = document.getElementById('nftCollaborators').value

      for (let i = 0; i < this.finalcollaborators.length; i++) {
        deltaAddress.push(this.finalcollaborators[i])
        deltaRate.push(this.rates[i])
      }

      // Validation
      if (this.NFTRoyalties % 1) {
        this.toast.info('Decimal points are not allowed!')
        document.getElementById('nftroyalties').focus()
      } else if (this.NFTRoyalties > 10 || this.NFTRoyalties < 0) {
        this.toast.info('Only between 0 and 10')
        document.getElementById('nftroyalties').focus()
      } else if (newColla != '') {
        this.toast.info('Please confirm your added your OWN wallet address!')
        document.getElementById('nftCollaborators').focus()
      } else {
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
        } else {
          if (this.account == null || this.vrcode == null) {
            this.toast.error('Please login!')
            this.$router.push('/connect')
            this.closeModal()
          } else if (this.logouploadedfile == null) {
            this.toast.error('Please upload logo again!')
            this.closeModal()
          } else if (this.featureduploadedfile == null) {
            this.toast.error('Please upload featured image again!')
            this.closeModal()
          } else if (this.banneruploadedfile == null) {
            this.toast.error('Please upload banner image again!')
            this.closeModal()
          } else if (
            this.NFTCategory == 'Select Category' ||
            this.NFTCategory == ''
          ) {
            this.toast.error('You have to input Category!')
            this.closeModal()
          } else if (this.NFTTitle == '') {
            this.toast.error('You have to input NFT Title!')
            this.closeModal()
          } else if (
            await nft.checkcollection(this.NFTTitle).then((res) => {
              return res.data.result
            })
          ) {
            this.toast.error('Collection name already Exists! Please rename your collection!')
            this.closeModal()
          } else if (this.NFTSymbol == '') {
            this.toast.error('You have to input the Collection Symbol!')
            this.closeModal()
          } else if (this.NFTDescription == '') {
            this.toast.error('You have to input Collection Description!')
            this.closeModal()
          } else if (this.ischecked && this.NFTRoyalties == '') {
            this.toast.error('You have to input Collection Royalties!')
            this.closeModal()
          } else if (this.ischecked) {
            if (
              this.item_title !== '' &&
              this.public_supply !== '' &&
              this.priceperticket !== '' &&
              this.mintdate !== ''
            ) {
              if (this.$cookies.get('connectionType') == 'mt') {
                const CollectionContract = new this.$Web3.ethers.Contract(
                  Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
                  NFTCollectionABI,
                  this.$Web3.getProvider()?.getSigner(),
                )
                const createcollectionaction = await CollectionContract.creatcollection(
                  this.NFTTitle,
                  this.NFTSymbol,
                  this.$Web3.ethers.utils.parseUnits(
                    this.priceperticket.toString(),
                    18,
                  ),
                  this.NFTRoyalties,
                  deltaAddress,
                  deltaRate,
                )
                try {
                  await createcollectionaction.wait()
                } catch (error) {
                  console.log(error)
                  this.toast.error('Something went wrong! Try again or contact support!')
                }
                try {
                  await CollectionContract.Ex_nftcollectionsbyname(
                    this.NFTTitle,
                  )
                    .then((res) => {
                      this.NFTContract = res.toString()
                    })
                    .catch((err) => console.error(err))
                } catch (error) {
                  console.log(error)
                  this.toast.error('Something went wrong! Try again or contact support!')
                }
                console.log(this.itemuploadedfile)
                await nft
                  .saveNftdata(
                    this.account.toLowerCase(),
                    this.vrcode,
                    this.nftid,
                    true,
                    this.logouploadedfile,
                    this.logouploadedfileExt,
                    this.featureduploadedfile,
                    this.banneruploadedfile,
                    this.itemuploadedfile,
                    true,
                    false,
                    this.NFTTitle,
                    this.NFTDescription,
                    this.NFTContract.toLowerCase(),
                    this.NFTCategory,
                    this.NFTRoyalties,
                    deltaAddress,
                    deltaRate,
                    this.item_title,
                    this.public_supply,
                    new Date(this.mintdate).getFullYear() +
                      '/' +
                      (new Date(this.mintdate).getMonth() + 1) +
                      '/' +
                      new Date(this.mintdate).getDate(),
                    this.priceperticket,
                    this.weblink,
                    this.discord_link,
                    this.instagram_link,
                    this.medium_link,
                    this.telegram_link,
                  )
                  .then((res) => {
                    if (res.data.msg) {
                      this.toast.success('Created New Collection!')
                      this.$router.push('/collections')
                      window.location.reload()
                    } else {
                      this.toast.error('Something Went Wrong! Please Try again!')
                    }
                  })
              } else if (this.$cookies.get('connectionType') == 'wc') {
                const CollectionContract = new this.$Web3.ethers.Contract(
                  Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
                  NFTCollectionABI,
                  this.$Web3.wc_web3Provider().getSigner(),
                )
                const createcollectionaction = await CollectionContract.creatcollection(
                  this.NFTTitle,
                  this.NFTSymbol,
                  this.$Web3.ethers.utils.parseUnits(
                    this.priceperticket.toString(),
                    18,
                  ),
                  this.NFTRoyalties,
                  deltaAddress,
                  deltaRate,
                )
                try {
                  await createcollectionaction.wait()
                } catch (error) {
                  console.log(error)
                  this.toast.error('Something went wrong! Try again or contact support!')
                }
                try {
                  await CollectionContract.Ex_nftcollectionsbyname(
                    this.NFTTitle,
                  )
                    .then((res) => {
                      this.NFTContract = res.toString()
                    })
                    .catch((err) => console.error(err))
                } catch (error) {
                  console.log(error)
                  this.toast.error('Something went wrong! Try again or contact support!')
                }
                await nft
                  .saveNftdata(
                    this.account.toLowerCase(),
                    this.vrcode,
                    this.nftid,
                    true,
                    this.logouploadedfile,
                    this.logouploadedfileExt,
                    this.featureduploadedfile,
                    this.banneruploadedfile,
                    this.itemuploadedfile,
                    true,
                    false,
                    this.NFTTitle,
                    this.NFTDescription,
                    this.NFTContract.toLowerCase(),
                    this.NFTCategory,
                    this.NFTRoyalties,
                    deltaAddress,
                    deltaRate,
                    this.item_title,
                    this.public_supply,
                    new Date(this.mintdate).getFullYear() +
                      '/' +
                      (new Date(this.mintdate).getMonth() + 1) +
                      '/' +
                      new Date(this.mintdate).getDate(),
                    this.priceperticket,
                    this.weblink,
                    this.discord_link,
                    this.instagram_link,
                    this.medium_link,
                    this.telegram_link,
                  )
                  .then((res) => {
                    if (res.data.msg) {
                      this.toast.success('Created New Collection!')
                      this.$router.push('/collections')
                      window.location.reload()
                    } else {
                      this.toast.error('Something Went Wrong! Please Try again!')
                    }
                  })
              }
            } else {
              this.toast.error('Please enter the correct `totalSupply`, `price` and `date`!')
            }
          } else {
            if (this.$cookies.get('connectionType') == 'mt') {
              const CollectionContract = new this.$Web3.ethers.Contract(
                Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
                NFTCollectionABI,
                this.$Web3.getProvider()?.getSigner(),
              )
              const createcollectionaction = await CollectionContract.creatcollection(
                this.NFTTitle,
                this.NFTSymbol,
                0,
                this.NFTRoyalties,
                deltaAddress,
                deltaRate,
              )
              try {
                await createcollectionaction.wait()
              } catch (error) {
                this.toast.error('Something Went Wrong! Please Try again!')
              }
              try {
                await CollectionContract.Ex_nftcollectionsbyname(this.NFTTitle)
                  .then((res) => {
                    this.NFTContract = res.toString()
                  })
                  .catch((err) => console.error(err))
              } catch (error) {
                console.log(error)
                this.toast.error('Something went wrong!')
              }
              await nft
                .saveNftdata(
                  this.account.toLowerCase(),
                  this.vrcode,
                  this.nftid,
                  true,
                  this.logouploadedfile,
                  this.logouploadedfileExt,
                  this.featureduploadedfile,
                  this.banneruploadedfile,
                  this.itemuploadedfile,
                  false,
                  false,
                  this.NFTTitle,
                  this.NFTDescription,
                  this.NFTContract.toLowerCase(),
                  this.NFTCategory,
                  this.NFTRoyalties,
                  deltaAddress,
                  deltaRate,
                  null,
                  1,
                  0,
                  0,
                  this.weblink,
                  this.discord_link,
                  this.instagram_link,
                  this.medium_link,
                  this.telegram_link,
                )
                .then((res) => {
                  if (res.data.msg) {
                    this.toast.success('Created New Collection!')
                    this.$router.push('/collections')
                    window.location.reload()
                  } else {
                    this.toast.error('Something Went Wrong! Please Try again or contact support!')
                  }
                })
            } else if (this.$cookies.get('connectionType') == 'wc') {
              const CollectionContract = new this.$Web3.ethers.Contract(
                Contract.NFTCollection[Number(process.env.VUE_APP_ChainID)],
                NFTCollectionABI,
                this.$Web3.wc_web3Provider().getSigner(),
              )
              const createcollectionaction = await CollectionContract.creatcollection(
                this.NFTTitle,
                this.NFTSymbol,
                0,
                this.NFTRoyalties,
                deltaAddress,
                deltaRate,
              )
              try {
                await createcollectionaction.wait()
              } catch (error) {
                this.toast.error('Something Went Wrong! Please Try again!')
              }
              try {
                await CollectionContract.Ex_nftcollectionsbyname(this.NFTTitle)
                  .then((res) => {
                    this.NFTContract = res.toString()
                  })
                  .catch((err) => console.error(err))
              } catch (error) {
                console.log(error)
                this.toast.error('Something went wrong! Try again or contact support!')
              }
              await nft
                .saveNftdata(
                  this.account.toLowerCase(),
                  this.vrcode,
                  this.nftid,
                  true,
                  this.logouploadedfile,
                  this.logouploadedfileExt,
                  this.featureduploadedfile,
                  this.banneruploadedfile,
                  this.itemuploadedfile,
                  false,
                  false,
                  this.NFTTitle,
                  this.NFTDescription,
                  this.NFTContract.toLowerCase(),
                  this.NFTCategory,
                  this.NFTRoyalties,
                  deltaAddress,
                  deltaRate,
                  null,
                  1,
                  0,
                  0,
                  this.weblink,
                  this.discord_link,
                  this.instagram_link,
                  this.medium_link,
                  this.telegram_link,
                )
                .then((res) => {
                  if (res.data.msg) {
                    this.toast.success('Created New Collection!')
                    this.$router.push('/collections')
                    window.location.reload()
                  } else {
                    this.toast.error('Something Went Wrong! Please Try again or contact support!')
                  }
                })
            }
          }
        }
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
      this.flag = false
      this.$router.push('/connect')
    } else {
      if (this.$cookies.get('connectionType') == 'mt') {
        this.flag = true
        this.connectWallet()

        await userManagement
          .getUserRole(this.account.toLowerCase())
          .then((res) => {
            this.userRole = res.data.userRole
          })
          .catch((err) => console.log(err))
        if (this.userRole == 'user') {
          this.toast.info('Only verified creators can access our creation tools!')
          this.$router.push('/')
        }
      } else if (this.$cookies.get('connectionType') == 'wc') {
        this.flag = true
        this.wcfunc()
        await userManagement
          .getUserRole(this.account.toLowerCase())
          .then((res) => {
            this.userRole = res.data.userRole
          })
          .catch((err) => console.log(err))
        if (this.userRole == 'user') {
          this.toast.info('Only verified creators can access our creation tools!')
          this.$router.push('/')
        }
      }
    }

    /*==========File upload ========== */
    document.getElementById('file-name-logo').value = 'logo Image'
    document.getElementById('file-name-featured').value = 'Featured Image'
    document.getElementById('file-name-banner').value = 'Banner Image'
    document.getElementById('nftroyalties').value = this.NFTRoyalties
    document.getElementById('priceperticket').value = this.priceperticket
    this.collaborators = []
    this.finalcollaborators = []
    this.rates = []
    this.ischecked = false

    var vm = this

    function fileUpload(selector) {
      let elem = document.querySelectorAll(selector)
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener('change', async function () {
            var target = document.getElementById(item.dataset.target)
            var allowedExtensions = [
              'jpg',
              'png',
              'gif',
              'webp',
              'mp4',
              'mp3',
              '4ds',
              'glb',
              'gltf',
            ]
            var fileExtension = this.value.split('.').pop()
            var lastDot = this.value.lastIndexOf('.')
            var ext = this.value.substring(lastDot + 1)
            var extTxt = (target.value = ext)
            if (!allowedExtensions.includes(fileExtension)) {
              vm.toast.error(`${extTxt} file type not allowed, Please use .jpg, .png, .gif, .glb, .gltf, .4ds  .webp, .mp4 or .mp3 file`)
              target.innerHTML =
                'Please upload .jpg, .png, .gif, .glb, .gltf, .4ds  .webp, .mp4 or .mp3 file'
            } else {
              vm.showModal()
              const formData = new FormData()
              formData.append('file', item.files[0])
              console.log(item.files[0])
              await axios({
                method: 'post',
                url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
                data: formData,
                headers: {
                  pinata_api_key: '90e0a50e9a348f1417d2',
                  pinata_secret_api_key:
                    '252a6d1b20e500d8acfc141c3dd433aa014b8864dbfab8912dcade976716b45d',
                  'Content-Type': 'multipart/form-data',
                },
              })
                .then(async (res) => {
                  if (item.dataset.target == 'file-name-logo') {
                    vm.logouploadedfileExt = fileExtension
                    vm.logouploadedfile = res.data.IpfsHash
                    target.innerHTML = 'Uploaded'
                    vm.toast.success(`Upload Success!`)
                    vm.closeModal()
                  } else if (item.dataset.target == 'file-name-featured') {
                    vm.featureduploadedfile = res.data.IpfsHash
                    target.innerHTML = 'Uploaded'
                    vm.toast.success(`Upload Success!`)
                    vm.closeModal()
                  } else if (item.dataset.target == 'file-name-banner') {
                    vm.banneruploadedfile = res.data.IpfsHash
                    target.innerHTML = 'Uploaded'
                    vm.toast.success(`Upload Success!`)
                    vm.closeModal()
                  } else if (item.dataset.target == 'file-name-item') {
                    vm.itemuploadedfile = res.data.IpfsHash
                    console.log(res.data.IpfsHash)
                    target.innerHTML = 'Uploaded'
                    vm.toast.success(`Upload Success!`)
                    vm.closeModal()
                  }
                })
                .catch((err) => {
                  console.error(err)
                  vm.closeModal()
                  vm.toast.info(`Network changed detected! Please try again or contact support!`)
                })
            }
          })
        })
      }
    }

    fileUpload('.file-upload-input-logo')
    fileUpload('.file-upload-input-featured')
    fileUpload('.file-upload-input-banner')
    fileUpload('.file-upload-input-item')

    /*  ========== Unlock once purchased Checkbox switcher ========= */
    function checkboxSwitcher(selector) {
      let elem = document.querySelectorAll(selector)
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener('change', async function () {
            let target = document.getElementById(item.dataset.target)
            if (this.checked) {
              target.classList.add('is-shown')
              vm.ischecked = true
              await userManagement
                .getCreatorRole(vm.account.toLowerCase())
                .then((res) => {
                  console.log(res.data.creator_rate)
                  vm.creator_rate = res.data.creator_rate
                  vm.rates = [vm.creator_rate]
                  vm.finalcollaborators.push(
                    '0x2A2cCCC15820FaA0D4e3960E9C7Db773e2BA4BB9',
                  )
                })
                .catch((err) => console.log(err))
            } else {
              target.classList.remove('is-shown')
              vm.ischecked = false
            }
          })
        })
      }
    }

    checkboxSwitcher('.checkbox-switcher')

    // validaion handlers.....
    document
      .getElementById('CollaboratorRate')
      .addEventListener('input', (e) => {
        const el = e.target || e

        if (el.type == 'number' && el.max && el.min) {
          let value = parseInt(el.value)
          el.value = value // for 000 like input cleanup to 0
          let max = parseInt(el.max)
          let min = parseInt(el.min)
          if (value > max) el.value = el.max
          if (value < min) el.vlaue = el.min
        }
      })

    // validiation handlers.....
    document.getElementById('nftroyalties').addEventListener('input', (e) => {
      const el = e.target || e

      if (el.type == 'number' && el.max && el.min) {
        let value = parseInt(el.value)
        el.value = value // for 000 like input cleanup to 0
        let max = parseInt(el.max)
        let min = parseInt(el.min)
        if (value > max) el.value = el.max
        if (value < min) el.vlaue = el.min
      }
    })

    // validation handlers.....
    document.getElementById('supply').addEventListener('input', (e) => {
      const el = e.target || e

      if (el.type == 'number' && el.min) {
        let value = parseInt(el.value)
        el.value = value // for 000 like input cleanup to 0
        let min = parseInt(el.min)
        if (value < min) el.vlaue = el.min
      }
    })
  },
}
</script>
<style>
.featured {
  width: 50%;
}
.logo {
  width: 35%;
  border-radius: 110px;
}
#PublicMint {
  color: red;
}
#nftsymbol {
  text-transform: uppercase;
}
.swal2-title {
  color: black !important;
}
#btn_group {
  display: flex;
  flex-direction: row;
}
#btn_left {
  flex: 0.3;
}
#btn_right {
  flex: 0.7;
  text-align: right;
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
.modal-backdrop {
  position: absolute !important;
}
#switch-content-unlock {
  border: 1px dotted white;
  padding: 15px 15px;
}
#socials_container {
  padding: 15px 15px;
  border: 1px dotted;
}
#collaborator-container {
  width: 80%;
}
.collaboratoritem-container {
  border: 1px dashed;
  padding: 5px;
  text-align: center;
  width: 80%;
  flex: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
}
.collaborator_member {
  flex: 0.9;
}
#remove_handle {
  width: 10%;
  flex: 0.1;
}
.sub-container {
  display: flex;
}
#nftCollaborators {
  flex: 0.8;
}
#CollaboratorRate {
  flex: 0.2;
}
.treasury-container {
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .logo {
    width: 100%;
    border-radius: 0;
  }
  .featured {
    width: 100%;
  }
  #btn_right_publish,
  #btn_right_save,
  #btn_right_clear {
    font-size: 11px !important;
  }
}
</style>
