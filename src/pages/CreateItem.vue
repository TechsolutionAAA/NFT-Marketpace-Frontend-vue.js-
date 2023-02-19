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
          <div class="col-lg-8">
            <div class="section-head-sm">
              <h1 class="mt-2">{{ SectionData.createNewItemData.title }}</h1>
            </div>
          </div>
          <Modal v-show="isModalVisible" />
          <!-- end col -->
          <div class="col-lg-8">
            <form action="#" class="form-create mb-5 mb-lg-0">
              <div class="form-item mb-4">
                <h4 class="mb-3">
                  {{ SectionData.createNewItemData.assetsName }}
                </h4>
                <p class="mb-3">
                  {{ SectionData.createNewItemData.assetsDescription }}
                </p>
                <div class="file-upload-wrap logo">
                  <p class="file-name-logo mb-4" id="file-name-logo">Assets</p>
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
              <!-- Thumbnail Image links -->
              <div class="form-item mb-4" id="thumbnail-container">
                <h4 class="mb-3">
                  {{ SectionData.createNewItemData.thumbNail }}
                </h4>
                <p class="mb-3">
                  This image will be used for thumbnail your Item on the
                  homepage, explore pages, or other promotional areas of Scenez.
                  600 x 400 recommended.
                </p>
                <div class="file-upload-wrap logo">
                  <p class="file-name-thumbnail mb-4" id="file-name-thumbnail">
                    thumbnail Image
                  </p>
                  <input
                    id="file-upload-thumbnail"
                    class="file-upload-input-thumbnail"
                    data-target="file-name-thumbnail"
                    type="file"
                    hidden
                  />
                  <label
                    for="file-upload-thumbnail"
                    class="input-label btn btn-dark"
                  >
                    Choose File
                  </label>
                </div>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-4">
                <!-- NFT Item Title -->
                <div class="mb-4">
                  <h5 class="mb-2">
                    {{ SectionData.createNewItemData.itemTitle }}*
                  </h5>
                  <input
                    type="text"
                    v-model.trim="nfttitle"
                    class="form-control form-control-s1"
                    placeholder="Item Name"
                  />
                </div>
                <!-- end NFT Item Title -->
                <!-- NFT Description Title -->
                <div class="mb-4">
                  <h5 class="mb-2">
                    {{ SectionData.createNewItemData.itemDescription }}
                  </h5>
                  <p class="mb-2">
                    {{ SectionData.createNewItemData.itemSubDescription }}
                  </p>
                  <textarea
                    name="message"
                    id="nftdescription"
                    class="form-control form-control-s1"
                    placeholder="Provide a Detailed description of your Item"
                  ></textarea>
                </div>
                <!-- end NFT Description Title -->
                <!-- NFT Supply Title -->
                <div class="mb-4">
                  <h5 class="mb-2">
                    {{ SectionData.createNewItemData.totalsupply }}
                  </h5>
                  <input
                    type="number"
                    id="totalsupply"
                    class="form-control form-control-s1"
                    placeholder="1"
                    disabled
                  />
                </div>
                <!-- end NFT Supply Title -->
              </div>
              <!-- end form-item -->
              <!-- NFT Collection -->
              <div class="form-item mb-4">
                <h5 class="mb-1">Choose collection</h5>
                <p class="form-text mb-3">
                  This is the collection where your item will appear.
                </p>
                <v-select
                  class="generic-select"
                  id="nftcollection"
                  v-model="selected"
                  :options="options"
                ></v-select>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-3">
                <div class="mb-4 wrap">
                  <div class="wrap-part-1">
                    <h1 class="mb-2 form-label">
                      {{ SectionData.createNewItemData.propertiesTitle }}
                    </h1>
                    <p class="mb-2 form-label">
                      {{ SectionData.createNewItemData.propertiesSubTitle }}
                    </p>
                  </div>
                  <div class="wrap-part-2">
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#AddPropertiesModal"
                      class="btn btn-dark d-block"
                    >
                      Add+
                    </a>
                  </div>
                </div>
              </div>
              <div class="trait">
                <div v-for="propitem in propitemsroot" :key="propitem.id">
                  <div
                    class="prop-container mb-3"
                    v-html="propitem.content"
                  ></div>
                </div>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-3">
                <div class="mb-4 wrap">
                  <div class="wrap-part-1">
                    <h1 class="mb-2 form-label">
                      {{ SectionData.createNewItemData.levelsTitle }}
                    </h1>
                    <p class="mb-2 form-label">
                      {{ SectionData.createNewItemData.levelsSubTitle }}
                    </p>
                  </div>
                  <div class="wrap-part-2">
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#AddLevelsModal"
                      class="btn btn-dark d-block"
                    >
                      Add+
                    </a>
                  </div>
                </div>
              </div>
              <div class="trait">
                <div v-for="levelitem in levelitemsroot" :key="levelitem.id">
                  <div
                    class="level-container mb-3"
                    v-html="levelitem.content"
                  ></div>
                </div>
              </div>
              <!-- end form-item -->
              <div class="form-item mb-3">
                <div class="mb-4 wrap">
                  <div class="wrap-part-1">
                    <h1 class="mb-2 form-label">
                      {{ SectionData.createNewItemData.StatsTitle }}
                    </h1>
                    <p class="mb-2 form-label">
                      {{ SectionData.createNewItemData.StatsSubTitle }}
                    </p>
                  </div>
                  <div class="wrap-part-2">
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#AddStatsModal"
                      class="btn btn-dark d-block"
                    >
                      Add+
                    </a>
                  </div>
                </div>
              </div>
              <div class="trait">
                <div v-for="statsitem in statsitemsroot" :key="statsitem.id">
                  <div
                    class="stats-container mb-3"
                    v-html="statsitem.content"
                  ></div>
                </div>
              </div>
              <!-- end form-item -->
              <!-- <div class="form-item mb-3">
                <div class="switch-wrap">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="me-2">
                      <h5 class="mb-1">Unlockable Content</h5>
                      <p class="form-text">
                        Include unlockable content that can only be revealed by
                        the owner of the item.
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
                  </div>
                  <div
                    class="switch-content-unlock mt-4"
                    id="switch-content-unlock"
                  >
                    <input
                      type="text"
                      name="text"
                      class="form-control form-control-s1"
                      placeholder="Enter content (access key, code to redeem, link to a file, etc)"
                    />
                  </div>
                </div>
              </div> -->
              <!-- end form-item -->
              <div class="form-item mb-3">
                <div class="switch-wrap">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="me-2">
                      <h5 class="mb-1">Explicit & Sensitive Content</h5>
                      <p class="form-text">
                        Set this item as explicit and sensitive content
                      </p>
                    </div>
                    <div class="form-check form-switch form-switch-s1">
                      <input
                        class="form-check-input checkbox-switcher"
                        data-target="switch-content-unlock"
                        type="checkbox"
                        id="isexplicit"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!-- end form-item -->
              <!-- Freeze Metadata -->
              <!-- <div class="mb-4">
                <h5 class="mb-2">
                  {{ SectionData.createNewItemData.FreezeTitle }}
                </h5>
                <em>{{ SectionData.createNewItemData.FreezeDescription }}</em>
                <input
                  type="number"
                  class="form-control form-control-s1"
                  placeholder="To freeze your metadata, you must create your item first."
                  disabled
                />
              </div> -->

              <div class="mb-4" id="btn_group">
                <div id="btn_left">
                  <button
                    class="btn btn-dark"
                    type="button"
                    @click="delete_item()"
                  >
                    Delete
                  </button>
                </div>
                <div id="btn_right">
                  <Circle v-if="ispublish"></Circle>
                  <button
                    class="btn btn-dark"
                    type="button"
                    @click="create_item()"
                    v-else
                  >
                    Instant publish
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
    <!-- Add Properties Modal -->
    <div
      class="modal fade"
      id="AddPropertiesModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add Properties</h4>
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
            <p class="mb-3">
              Properties show up underneath your item, are clickable, and can be
              filtered in your collection's sidebar.
            </p>
            <div v-for="propitem in propitems" :key="propitem.id">
              <div class="row" :id="this.prePro + propitem.id">
                <div
                  class="row col-lg-10"
                  v-html="propitem.content"
                  id="properties"
                ></div>
                <div class="col-lg-2">
                  <div class="mb-3">
                    <label class="form-label">Remove</label>
                    <button
                      class="btn btn-dark d-block mb-3"
                      v-on:click="remove_property(propitem.id)"
                    >
                      <em class="ni ni-cross"></em>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-dark d-block mb-3" @click="add_property()">
              Add more
            </button>
            <div
              class="btn btn-dark d-block"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="save_Property()"
            >
              Save (click here to store latest version)
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Levels Modal -->
    <div
      class="modal fade"
      id="AddLevelsModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add Levels</h4>
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
            <p class="mb-3">
              Levels show up underneath your item, are clickable, and can be
              filtered in your collection's sidebar.
            </p>
            <div v-for="levelitem in levelitems" :key="levelitem.id">
              <div class="row" :id="this.preLevel + levelitem.id">
                <div
                  class="row col-lg-10"
                  v-html="levelitem.content"
                  id="levelerties"
                ></div>
                <div class="col-lg-2">
                  <div class="mb-3">
                    <label class="form-label">Remove</label>
                    <button
                      class="btn btn-dark d-block mb-3"
                      v-on:click="remove_levelerty(levelitem.id)"
                    >
                      <em class="ni ni-cross"></em>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-dark d-block mb-3" @click="add_level()">
              Add more
            </button>
            <div
              class="btn btn-dark d-block"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="save_level()"
            >
              Save (click here to store latest version)
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- AddStatsModal -->
    <div class="modal fade" id="AddStatsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add Stats</h4>
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
            <p class="mb-3">
              Stats show up underneath your item, are clickable, and can be
              filtered in your collection's sidebar.
            </p>
            <div v-for="statsitem in statsitems" :key="statsitem.id">
              <div class="row" :id="this.prestats + statsitem.id">
                <div
                  class="row col-lg-10"
                  v-html="statsitem.content"
                  id="statserties"
                ></div>
                <div class="col-lg-2">
                  <div class="mb-3">
                    <label class="form-label">Remove</label>
                    <button
                      class="btn btn-dark d-block mb-3"
                      v-on:click="remove_statserty(statsitem.id)"
                    >
                      <em class="ni ni-cross"></em>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-dark d-block mb-3" @click="add_stats()">
              Add more
            </button>
            <div
              class="btn btn-dark d-block"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="save_stats()"
            >
              Save (click here to store latest version)
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
import Swal from 'sweetalert2'
import Modal from '../components/common/Modal.vue'
import NFTCTR from '../services/api/nftManagement'
import { NETWORKS } from '../utils/networks'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Circle } from 'vue-loading-spinner'
import { mapGetters } from 'vuex'
import userManagement from '../services/api/userManagement'

export default {
  name: 'CreateItem',
  components: {
    Modal,
    Circle,
  },
  data() {
    return {
      SectionData,
      flag: true,
      selected: 'Select Collection',
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
      vrcode: sessionStorage.getItem('vrcode'),
      NFTData: [],
      isSpecial: false,
      isModalVisible: false,
      options: [],
      thumbnailfile: null,
      logouploadedfile: null,
      logoextension: null,
      thumbnailextension: null,
      nfttitle: null,
      nftdescription: null,
      nftcollection: null,
      nftsupply: null,
      nftaccesskey: null,
      mintprefix: 'ipfs://',
      propitem: [],
      propitems: [],
      propitemsroot: [],
      finalpropdata: [],
      traitpropdata: [],
      prePro: 'prop-item-',
      levelitem: [],
      levelitems: [],
      levelitemsroot: [],
      finalleveldata: [],
      traitleveldata: [],
      preLevel: 'level-item-',
      statsitem: [],
      statsitems: [],
      statsitemsroot: [],
      finalstatsdata: [],
      traitstatsdata: [],
      prestats: 'stats-item-',
      ispublish: false,
      isexplicit: false,
      userRole: '',
    }
  },
  computed: {
    displayedRecords() {
      const startIndex = this.perPage * (this.page - 1)
      const endIndex = startIndex + this.perPage
      return this.NFTData.slice(startIndex, endIndex)
    },
    ...mapGetters('auth', {
      userData: 'user',
    }),
  },
  methods: {
    // Property Handle
    add_property() {
      if (!document.getElementById(`prop-item-${this.propitems.length}`)) {
        this.propitem = {
          id: this.propitems.length,
          content: `<div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Type</label>
                  <input
                    type="text"
                    id="${this.propitems.length}type"
                    class="form-control form-control-s1"
                    placeholder="Character"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    id="${this.propitems.length}name"
                    class="form-control form-control-s1"
                    placeholder="Male"
                  />
                </div>
              </div>
            `,
        }
        this.propitems.push(this.propitem)
      }
    },
    remove_property(id) {
      this.propitems = this.propitems.filter((data) => data.id !== id)
      this.finalpropdata = this.finalpropdata.filter((data) => data.id !== id)
    },
    save_Property() {
      this.finalpropdata = []
      this.traitpropdata = []
      let isfull = true
      for (var id = 0; id < this.propitems.length; id++) {
        if (
          document.getElementById(id + 'type').value == '' ||
          document.getElementById(id + 'name').value == ''
        ) {
          this.toast.error('Please fill out all required fields!')
          isfull = false
        }
      }
      if (isfull) {
        this.propitemsroot = []
        for (var ids = 0; ids < this.propitems.length; ids++) {
          this.finalpropdata.push({
            id: ids,
            type: document.getElementById(ids + 'type').value,
            name: document.getElementById(ids + 'name').value,
          })
          this.propitemsroot.push({
            id: ids,
            content: `
            <div class="type">${
              document.getElementById(ids + 'type').value
            }</div>
            <div class="name">${
              document.getElementById(ids + 'name').value
            }</div>
            <div class="banner">New trait</div>
          `,
          })
          this.traitpropdata.push({
            trait_type: document.getElementById(ids + 'type').value,
            value: document.getElementById(ids + 'name').value,
          })
        }
      }
      console.log(this.finalpropdata)
    },

    // Level Handle
    add_level() {
      if (!document.getElementById(`level-item-${this.levelitems.length}`)) {
        this.levelitem = {
          id: this.levelitems.length,
          content: `<div class="col-lg-4">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    id="${this.levelitems.length}levelname"
                    class="form-control form-control-s1"
                    placeholder="Speed"
                  />
                </div>
              </div>
              <div class="col-lg-8">
                <label class="form-label">Value</label>
                <div class="mb-3 level">
                  <input
                    type="number"
                    id="${this.levelitems.length}levelvalue"
                    class="form-control form-control-s1"
                  />
                  of
                  <input
                    type="number"
                    id="${this.levelitems.length}leveltotal"
                    class="form-control form-control-s1"
                    value="5"
                  />
                </div>
              </div>
            `,
        }
        this.levelitems.push(this.levelitem)
      }
    },
    remove_levelerty(id) {
      this.levelitems = this.levelitems.filter((data) => data.id !== id)
      this.finalleveldata = this.finalleveldata.filter((data) => data.id !== id)
    },
    save_level() {
      this.finalleveldata = []
      this.traitleveldata = []
      let isfull = true
      for (var id = 0; id < this.levelitems.length; id++) {
        if (
          document.getElementById(id + 'levelname').value == '' ||
          document.getElementById(id + 'levelvalue').value == '' ||
          document.getElementById(id + 'leveltotal').value == '' ||
          Number(document.getElementById(id + 'levelvalue').value) >
            Number(document.getElementById(id + 'leveltotal').value)
        ) {
          this.toast.error('Please fill out all required fields!')
          isfull = false
          return
        }
      }
      if (isfull) {
        this.levelitemsroot = []
        for (var ids = 0; ids < this.levelitems.length; ids++) {
          this.finalleveldata.push({
            id: ids,
            type: document.getElementById(ids + 'levelname').value,
            value: document.getElementById(ids + 'levelvalue').value,
            total: document.getElementById(ids + 'leveltotal').value,
          })
          this.levelitemsroot.push({
            id: ids,
            content: `
            <div class="leveltype">${
              document.getElementById(ids + 'levelname').value
            }</div>
            <div class="levelname">${
              document.getElementById(ids + 'levelvalue').value
            } of ${document.getElementById(ids + 'leveltotal').value}</div>
          `,
          })
          this.traitleveldata.push({
            trait_type: document.getElementById(ids + 'levelname').value,
            value: document.getElementById(ids + 'levelvalue').value,
            Maxvalue: document.getElementById(ids + 'leveltotal').value,
          })
        }
      }
    },

    // Stats Handle
    add_stats() {
      if (!document.getElementById(`stats-item-${this.statsitems.length}`)) {
        this.statsitem = {
          id: this.statsitems.length,
          content: `<div class="col-lg-4">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    id="${this.statsitems.length}statsname"
                    class="form-control form-control-s1"
                    placeholder="Speed"
                  />
                </div>
              </div>
              <div class="col-lg-8">
                <label class="form-label">Value</label>
                <div class="mb-3 stats">
                  <input
                    type="number"
                    id="${this.statsitems.length}statsvalue"
                    class="form-control form-control-s1"
                  />
                  of
                  <input
                    type="number"
                    id="${this.statsitems.length}statstotal"
                    class="form-control form-control-s1"
                    value="5"
                  />
                </div>
              </div>
            `,
        }
        this.statsitems.push(this.statsitem)
      }
    },
    remove_statserty(id) {
      this.statsitems = this.statsitems.filter((data) => data.id !== id)
      this.finalstatsdata = this.finalstatsdata.filter((data) => data.id !== id)
    },
    save_stats() {
      this.finalstatsdata = []
      this.traitstatsdata = []
      let isfull = true
      for (var id = 0; id < this.statsitems.length; id++) {
        if (
          document.getElementById(id + 'statsname').value == '' ||
          document.getElementById(id + 'statsvalue').value == '' ||
          document.getElementById(id + 'statstotal').value == '' ||
          Number(document.getElementById(id + 'statsvalue').value) >
            Number(document.getElementById(id + 'statstotal').value)
        ) {
          this.toast.error('Please fill out all required fields!')
          isfull = false
          return
        }
      }
      if (isfull) {
        this.statsitemsroot = []
        for (var ids = 0; ids < this.statsitems.length; ids++) {
          this.finalstatsdata.push({
            id: ids,
            type: document.getElementById(ids + 'statsname').value,
            value: document.getElementById(ids + 'statsvalue').value,
            total: document.getElementById(ids + 'statstotal').value,
          })
          this.statsitemsroot.push({
            id: ids,
            content: `
            <div class="statstype">${
              document.getElementById(ids + 'statsname').value
            }</div>
            <div class="statsname">${
              document.getElementById(ids + 'statsvalue').value
            } of ${document.getElementById(ids + 'statstotal').value}</div>
          `,
          })
          this.traitstatsdata.push({
            trait_type: document.getElementById(ids + 'statsname').value,
            value: document.getElementById(ids + 'statsvalue').value,
            Maxvalue: document.getElementById(ids + 'statstotal').value,
          })
        }
      }
    },
    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
    getcollection: async function () {
      await NFTCTR.getNFTsByOwnerfromdb(this.account.toLowerCase(), this.vrcode)
        .then((res) => {
          for (var i = 0; i < res.data.result.length; i++) {
            if (!res.data.result[i].publicmint) {
              this.options.push(res.data.result[i].NFT_Title)
            }
          }
        })
        .catch((err) => console.error(err))
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
    create_item: async function () {
      let network = await this.checkNetwork()
      this.nftdescription = document.getElementById('nftdescription').value
      this.nftcollection = document.getElementById('nftcollection').outerText
      this.nftsupply = document.getElementById('totalsupply').value
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
        if (this.options.length == 0) {
          this.toast.error('Please Create Collection First!')
        } else {
          if (this.nfttitle == '') {
            this.toast.error('Please enter title!')
          } else if (this.nftdescription == '') {
            this.toast.error('Please enter description!')
          } else if (this.logouploadedfile == null) {
            this.toast.error('Please upload all Assets!')
          } else if (
            this.nftcollection == 'Select Collection' ||
            this.nftcollection == ''
          ) {
            this.toast.error('Please select a collection!')
          } else {
            this.ispublish = true
            let metadata
            if (this.isSpecial) {
              metadata = {
                name: this.nfttitle,
                description: this.nftdescription,
                image: `https://gate.scenez.io/ipfs/${this.thumbnailfile}`,
                animation_url: `https://gate.scenez.io/ipfs/${this.logouploadedfile}`,
                animation_url_ext: this.logoextension,
                imageextension: this.thumbnailextension,
                collection_name: this.nftcollection,
                creator: this.account,
                attributes: [
                  ...this.traitpropdata,
                  ...this.traitleveldata,
                  ...this.traitstatsdata,
                ],
              }
            } else if (!this.isSpecial) {
              metadata = {
                name: this.nfttitle,
                description: this.nftdescription,
                image: `https://gate.scenez.io/ipfs/${this.logouploadedfile}`,
                imageextension: this.logoextension,
                collection_name: this.nftcollection,
                creator: this.account,
                attributes: [
                  ...this.traitpropdata,
                  ...this.traitleveldata,
                  ...this.traitstatsdata,
                ],
              }
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
                console.log(resp.data.IpfsHash)
                await NFTCTR.setItem(
                  true,
                  this.isexplicit,
                  this.nftcollection,
                  this.nfttitle,
                  this.nftdescription,
                  this.isSpecial ? this.thumbnailfile : this.logouploadedfile,
                  this.isSpecial ? this.thumbnailextension : this.logoextension,
                  this.isSpecial ? this.logouploadedfile : this.thumbnailfile,
                  this.isSpecial ? this.logoextension : this.thumbnailextension,
                  this.mintprefix + resp.data.IpfsHash,
                  this.account.toLowerCase(),
                  0,
                  this.finalpropdata,
                  this.finalleveldata,
                  this.finalstatsdata,
                ).then((res) => {
                  if (res.data.msg) {
                    this.toast.success('Create New Item!')
                    this.$router.push('/collections')
                    this.ispublish = false
                  } else {
                    this.toast.error('This NFT title already exists!')
                    this.ispublish = false
                  }
                })
              })
              .catch((err) => {
                console.error(err)
                this.ispublish = false
              })
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
      this.flag = false
      this.$router.push('/connect')
    } else if (
      jwt_decode(sessionStorage.getItem('jwt')).exp <
      new Date() / 1000
    ) {
      this.flag = false
      this.$router.push('/connect')
    } else {
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
      if (this.$cookies.get('connectionType') == 'mt') {
        this.flag = true
        await this.connectWallet()
        /*==========Get Collection from DB========== */
        if (this.vrcode == null) {
          this.toast.error('Please update your security code!')
          this.$router.push('/security')
        } else {
          this.getcollection()
        }
      } else if (this.$cookies.get('connectionType') == 'wc') {
        this.flag = true
        await this.wcfunc()
        /*==========Get Collection from DB========== */
        if (this.vrcode == null) {
          this.toast.error('Please update your security code!')
          this.$router.push('/security')
        } else {
          this.getcollection()
        }
      }
    }

    /*==========File upload ========== */

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
              vm.toast.error(`${extTxt} file type not allowed, Please upload .jpg, .png, .gif, .glb, .gltf, .4ds  .webp, .mp4 or .mp3 file`)
              target.innerHTML =
                'Please upload .jpg, .png, .gif, .glb, .gltf, .4ds  .webp, .mp4 or .mp3 file'
            } else {
              vm.showModal()
              const formData = new FormData()
              formData.append('file', item.files[0])
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
                    vm.logoextension = fileExtension
                    vm.logouploadedfile = res.data.IpfsHash
                    vm.toast.success(`Upload Success!`)
                    vm.closeModal()
                    target.innerHTML = item.files[0].name
                    if (
                      fileExtension == 'glb' ||
                      fileExtension == 'webp' ||
                      fileExtension == 'gltf' ||
                      fileExtension == '4ds' ||
                      fileExtension == 'mp4'
                    ) {
                      vm.isSpecial = true
                      document.getElementById(
                        'thumbnail-container',
                      ).style.display = 'block'
                    }
                  } else if (item.dataset.target == 'file-name-thumbnail') {
                    vm.thumbnailextension = fileExtension
                    vm.thumbnailfile = res.data.IpfsHash
                    vm.toast.success(`Upload Success!`)
                    vm.closeModal()
                    target.innerHTML = item.files[0].name
                  }
                })
                .catch((err) => {
                  console.error(err)
                  vm.closeModal()
                  vm.toast.info(`Pinata Service has many transactions!! Please Try later!`)
                })
            }
          })
        })
      }
    }

    fileUpload('.file-upload-input-logo')
    fileUpload('.file-upload-input-thumbnail')

    /*  ========== Unlock once purchased Checkbox switcher ========= */
    function checkboxSwitcher(selector) {
      let elem = document.querySelectorAll(selector)
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener('change', function () {
            let target = document.getElementById(item.dataset.target)
            if (this.checked) {
              target.classList.add('is-shown')
              vm.isexplicit = true
            } else {
              target.classList.remove('is-shown')
              vm.isexplicit = false
            }
          })
        })
      }
    }

    checkboxSwitcher('.checkbox-switcher')
  },
}
</script>
<style>
.logo,
.thumbnail {
  width: 50%;
}
.wrap {
  border-style: dashed solid;
  padding: 10px 15px;
  display: flex;
  align-items: center;
}
.wrap-part-1 {
  flex: 1;
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
.trait {
  display: block;
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
.type {
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
.statstype,
.banner {
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
#thumbnail-container {
  display: none;
}

@media only screen and (max-width: 600px) {
  .logo {
    width: 100%;
    border-radius: 0;
  }
}
</style>
