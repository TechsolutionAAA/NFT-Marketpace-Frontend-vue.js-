<template>
  <div class="hero-wrap sub-header" id="main-container">
    <img
      id="header-image-result"
      :src="noBannerPrefix ? coverImg : imagePrefix + coverImg"
      alt=""
    />

    <div class="container">
      <div
        class="hero-content py-0 d-flex align-items-center"
        id="sub-container"
      >
        <div class="avatar flex-shrink-0" :class="avatarSize">
          <img
            :src="noCollectionImagePrefix ? avatar : imagePrefix + avatar"
            alt=""
          />
        </div>
        <div
          class="author-hero-content-wrap d-flex flex-wrap justify-content-between ms-3 flex-grow-1"
        >
          <div class="author-hero-content me-3">
            <h4 class="hero-author-title mb-1 text-white">
              {{ firstName }} {{ lastName }}
            </h4>
            <p class="hero-author-username mb-1 text-white">{{ username }}</p>
            <div class="d-flex align-items-center" v-if="isCopyInput">
              <input
                type="text"
                class="copy-input text-white"
                :value="walletAddress"
                id="copy-input"
                readonly
              />
              <div class="tooltip-s1">
                <button
                  v-clipboard:copy="internalWalletAddress"
                  v-clipboard:success="onCopy"
                  class="copy-text text-white ms-2"
                  type="button"
                >
                  <span class="tooltip-s1-text tooltip-text">Copy</span>
                  <em class="ni ni-copy"></em>
                </button>
              </div>
            </div>
          </div>

          <!-- author-hero-conetent -->
          <div class="hero-action-wrap d-flex align-items-center my-2">
            <router-link :to="btnLink" class="btn btn-light">
              {{ btnText }}
            </router-link>
            <label
              v-if="isAccountSettings"
              for="upload-header-image-file"
              id="handler"
              class="upload-header-image-label btn"
            >
              <img :src="editpng" alt="" id="editpng" />
            </label>
            <div class="dropdown ms-3" v-if="isDropdown">
              <a
                class="icon-btn icon-btn-s1"
                href="#"
                data-bs-toggle="dropdown"
                id="reportDropdown"
              >
                <em class="ni ni-more-h"></em>
              </a>
              <ul
                class="dropdown-menu card-generic p-2 dropdown-menu-end mt-2 card-generic-sm"
                aria-labelledby="reportDropdown"
              >
                <li>
                  <a
                    class="dropdown-item card-generic-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#reportModal"
                  >
                    Report Page
                  </a>
                </li>
              </ul>
            </div>
            <!-- end dropdown -->
          </div>
          <!--end hero-action-wrap -->
        </div>
        <!-- author-hero-content -->
      </div>
      <!-- hero-content -->
    </div>
    <!-- .container-->
  </div>
  <!-- end hero-wrap -->
  <input
    class="upload-header-image"
    data-target="header-image-result"
    id="upload-header-image-file"
    type="file"
    hidden
  />
</template>
<script>
import axios from 'axios'
import user from '../../services/api/userManagement'
import { useToast } from "vue-toastification";
import editpng from '../../images/edit.png'

export default {
  name: 'AuthorHero',
  props: {
    avatar: {
      type: String,
      default: require('@/images/thumb/avatar-8.jpg'),
    },
    avatarSize: {
      type: String,
      default: 'avatar-3',
    },
    coverImg: {
      type: String,
      default: require('@/images/brand/header.jpg'),
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
    },
    isDropdown: {
      type: Boolean,
      default: false,
    },
    isCopyInput: {
      type: Boolean,
      default: false,
    },
    btnText: {
      type: String,
      required: true,
    },
    btnLink: {
      type: String,
      required: true,
    },
    isAccountSettings: {
      type: Boolean,
      default: false,
    },
    noCollectionImagePrefix: {
      type: Boolean,
      default: false,
    },
    noBannerPrefix: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    editpng,
    imagePrefix: 'https://gate.scenez.io/ipfs/',
    internalWalletAddress: '',
  }),
  created() {
    this.internalWalletAddress = this.walletAddress
  },
  setup() {
    const toast = useToast();

    const onCopy = (e) => {
      let target = e.trigger.querySelector('.tooltip-text')
      let prevText = target.innerHTML
      target.innerHTML = 'Copied'
      setTimeout(function () {
        target.innerHTML = prevText
      }, 1000)
    }
    return {
      onCopy,
      toast,
    }
  },
  mounted() {
    var vm = this
    var vm2 = this.$cookies

    function uploadImage(selector) {
      let elem = document.querySelectorAll(selector)
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener('change', async function () {
            if (item.files && item.files[0]) {
              let img = document.getElementById(item.dataset.target)
              img.onload = function () {
                URL.revokeObjectURL(img.src)
              }
              img.src = URL.createObjectURL(item.files[0])

              let allowedExtensions = [
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
              let fileExtension = this.value.split('.').pop()
              var lastDot = this.value.lastIndexOf('.')
              var ext = this.value.substring(lastDot + 1)
              var extTxt = (img.value = ext)
              if (!allowedExtensions.includes(fileExtension)) {
                vm.toast.info(`${extTxt} file type not allowed, Scenez currently supports: .jpg, .png, .gif, .glb, .gltf, .4ds, .webp, .mp4 or .mp3 file`)
                img.src = ' '
              } else {
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
                    sessionStorage.setItem('IPFS', res.data.IpfsHash)
                    let cid = res.data.IpfsHash
                    let vrcode = sessionStorage.getItem('vrcode')
                    let curaccount =
                      vm2.get('connectionType') == 'mt'
                        ? window.ethereum.selectedAddress
                        : vm2.get('connectionType') == 'wc'
                        ? localStorage.getItem('wc_account')
                        : null
                    console.log(curaccount)
                    console.log(curaccount.toLocaleLowerCase())
                    const tx = await user.addHeaderimage(
                      curaccount.toLocaleLowerCase(),
                      vrcode,
                      cid,
                    )
                    if (tx.statusText == 'OK') {
                      vm.toast.success('Header image uploaded to IPFS!')
                    }
                  })
                  .catch((err) => console.error(err))
              }
            }
          })
        })
      }
    }

    uploadImage('.upload-header-image')
  },
}
</script>
<style scoped>
#main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 4%;
}

#header-image-result {
  position: absolute;
  flex-shrink: 0;
  width: 1560px;
  max-height: 300px;
}

#editpng {
  width: 75%;
}

#sub-container {
  justify-content: center;
  align-content: center;
  align-items: center;
}

.author-hero-content-wrap {
  align-items: center;
}
</style>
