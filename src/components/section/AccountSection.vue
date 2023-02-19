<template>
  <div class="col-lg-9 ps-xl-5">
    <div class="user-panel-title-box">
      <h3>{{ SectionData.editProfileData.title }}</h3>
    </div>
    <!-- end user-panel-title-box -->
    <div class="profile-setting-panel-wrap">
      <ul
          class="nav nav-tabs nav-tabs-s1 nav-tabs-mobile-size"
          id="myTab"
          role="tablist"
      >
        <li
            class="nav-item"
            role="presentation"
            v-for="list in SectionData.editProfileData.editProfileTabNav"
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
          class="tab-content mt-4"
          id="myTabContent"
      >
        <div
            class="tab-pane fade show active"
            id="account-Information"
            role="tabpanel"
            aria-labelledby="account-Information-tab"
        >
          <div class="profile-setting-panel">
            <h5 class="mb-4">Edit Profile</h5>
            <div class="d-flex align-items-center">
              <div class="image-result-area avatar avatar-3">
                <img
                    id="image-result"
                    :src="prefix + avatar"
                    alt=""
                />
              </div>
              <input
                  class="upload-image"
                  data-target="image-result"
                  id="upload-image-file"
                  type="file"
                  hidden
              />
              <label
                  v-if="!isModalVisible"
                  for="upload-image-file"
                  class="upload-image-label btn"
              >
                Update Photo
              </label>
              <Circle
                  v-if="isModalVisible"
                  id="circle"
              ></Circle>
            </div>
            <!-- end d-flex -->
            <div class="row mt-4">
              <div class="col-lg-3 mb-3">
                <label
                    for="displayName"
                    class="form-label"
                >First Name</label>
                <input
                    type="text"
                    id="FirstName"
                    class="form-control form-control-s1"
                    :value="fname"
                />
              </div>
              <!-- end col -->
              <div class="col-lg-3 mb-3">
                <label
                    for="displayName"
                    class="form-label"
                >Last Name</label>
                <input
                    type="text"
                    id="LastName"
                    class="form-control form-control-s1"
                    :value="lname"
                />
              </div>
              <!-- end col -->
              <div class="col-lg-6 mb-3">
                <label
                    for="displayUserName"
                    class="form-label"
                >
                  Username
                </label>
                <input
                    type="text"
                    id="displayUserName"
                    class="form-control form-control-s1"
                    :value="uname"
                />
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
            <div class="mb-3">
              <label
                  for="bio"
                  class="form-label"
              >Bio</label>
              <textarea
                  class="form-control form-control-s1"
                  placeholder="Leave a comment here"
                  id="bio"
                  :value="bio"
              />
            </div>
            <div class="mb-3">
              <label
                  for="emailAddress"
                  class="form-label"
              >Email</label>
              <input
                  type="email"
                  id="emailAddress"
                  class="form-control form-control-s1"
                  :value="email"
              />
            </div>
            <div class="row">
              <div class="col-lg-6 mb-3">
                <label
                    for="discordLink"
                    class="form-label"
                >
                  Discord Link
                </label>
                <!-- <button
                  v-if="!this.name"
                  class="btn btn-dark form-control form-control-s1"
                  type="button"
                  v-on:click="connectdiscord()"
                >
                  connect
                </button> -->
                <input
                    type="text"
                    v-on:keyup.enter="discordvalidate"
                    v-on:keydown="discordvalidate"
                    id="discordLink"
                    class="form-control form-control-s1"
                    :value="discord"
                />
              </div>
              <!-- end col -->
              <div class="col-lg-6 mb-3">
                <label
                    for="twitterLink"
                    class="form-label"
                >
                  Twiiter Link
                </label>
                <!-- <button
                  v-if="!this.name"
                  class="btn btn-dark form-control form-control-s1"
                  type="button"
                  v-on:click="connecttwitter()"
                >
                  connect
                </button> -->
                <!-- <button
                  v-if="this.name"
                  class="btn btn-dark form-control form-control-s1"
                  type="button"
                  v-on:click="disconnecttwitter()"
                >
                  {{ this.name }}
                </button> -->

                <input
                    type="text"
                    v-on:keyup.enter="twittervalidate"
                    v-on:keydown="twittervalidate"
                    id="twitterLink"
                    class="form-control form-control-s1"
                    :value="twitter"
                />
              </div>
              <!-- end col -->
              <div class="col-lg-6 mb-3">
                <label
                    for="instagramLink"
                    class="form-label"
                >
                  Instagram Link
                </label>
                <input
                    type="text"
                    v-on:keyup.enter="instagramvalidate"
                    v-on:keydown="instagramvalidate"
                    id="instagramLink"
                    class="form-control form-control-s1"
                    :value="instagram"
                />
              </div>
              <!-- end col -->
              <div class="col-lg-6 mb-3">
                <label
                    for="webLink"
                    class="form-label"
                >Web Link</label>
                <input
                    type="text"
                    v-on:keyup.enter="weblinkvalidate"
                    v-on:keydown="weblinkvalidate"
                    id="webLink"
                    class="form-control form-control-s1"
                    :value="weblink"
                />
              </div>
              <!-- end col -->
            </div>
            <!-- end row -->
            <button
                class="btn btn-dark mt-3"
                type="button"
                @click="UpdateProfile()"
            >
              Update Profile
            </button>
          </div>
          <!-- end profile-setting-panel -->
        </div>
        <!-- end tab-pane -->
        <div
            class="tab-pane fade"
            id="validate-profile"
            role="tabpanel"
            aria-labelledby="validate-profile-tab"
        >
          <div class="profile-setting-panel">
            <h5 class="mb-4">Verify your profile</h5>
            <p class="mb-3 fs-14">
              Verify your unique identity by linking your phone number with your
              account. Once your profile is validated, you will be approved to
              participate in all drops that require profile validation to
              purchase.
            </p>
            <p class="mb-4 fs-14">
              (Please note, profile validation is not 2fa and not used for
              security purposes.)
            </p>
            <hr class="my-4" />
            <h6 class="mb-3 fw-semibold">
              Enter phone number to receive code
            </h6>
            <ul class="btns-group">
              <li>
                <input
                    type="text"
                    class="form-control form-control-s1 phone-number"
                    placeholder="Phone number"
                />
              </li>
              <li>
                <button
                    class="btn btn-dark"
                    type="button"
                >Submit
                </button>
              </li>
            </ul>
          </div>
          <!-- end profile-setting-panel -->
        </div>
        <!-- end tab-pane -->
      </div>
      <!-- end tab-content -->
    </div>
    <!-- end profile-setting-panel-wrap-->
  </div>
  <!-- end col-lg-8 -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import user from '../../services/api/userManagement';
import { useToast } from "vue-toastification";
import axios from 'axios';
import { Circle } from 'vue-loading-spinner';
import { NETWORKS } from '@/utils/networks.js';

export default {
  name: 'AccountSection',
  components: {
    Circle,
  },
  data() {
    return {
      SectionData,
      isModalVisible: false,
      prefix: 'https://gate.scenez.io/ipfs/',
      avatar: '',
      fname: '',
      lname: '',
      uname: '',
      bio: '',
      email: '',
      discord: '',
      twitter: '',
      instagram: '',
      weblink: '',
      provider: 'twitter',
      name: '',
      disabled: '',
    };
  },

  mounted() {
    /*========SHOW Data from DB ============ */
    this.getData();

    /*========SHOW UPLOADED IMAGE ============ */
    var vm = this;
    var vm1 = this.$Web3;
    var vm2 = this.$cookies;

    function uploadImage(selector) {
      let elem = document.querySelectorAll(selector);
      if (elem.length > 0) {
        elem.forEach((item) => {
          item.addEventListener('change', async function () {
            if (item.files && item.files[0]) {
              let img = document.getElementById(item.dataset.target);
              img.onload = function () {
                URL.revokeObjectURL(img.src);
              };
              vm.showModal();
              img.src = URL.createObjectURL(item.files[0]);

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
              ];
              let fileExtension = this.value.split('.')
                  .pop();
              var lastDot = this.value.lastIndexOf('.');
              var ext = this.value.substring(lastDot + 1);
              var extTxt = (img.value = ext);
              if (!allowedExtensions.includes(fileExtension)) {
                vm.toast.error(`${extTxt} file type not allowed, Scenez currently supports .jpg, .png, .gif, .glb, .gltf, .4ds, .webp, .mp4 or .mp3 file`);
                img.src = ' ';
                vm.closeModal();
              } else {
                const formData = new FormData();
                formData.append('file', item.files[0]);
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
                      sessionStorage.setItem('IPFS', res.data.IpfsHash);
                      let cid = res.data.IpfsHash;
                      let vrcode = sessionStorage.getItem('vrcode');
                      let curaccount =
                          vm2.get('connectionType') === 'mt'
                              ? vm1.getAccounts()
                              : vm2.get('connectionType') === 'wc'
                                  ? localStorage.getItem('wc_account')
                                  : null;
                      const tx = await user.addAvatarPath(
                          curaccount[0].toLowerCase(),
                          vrcode,
                          cid,
                      );
                      if (tx.statusText == 'OK') {
                        vm.closeModal();
                        vm.toast.success('Your avatar has been added to the ipfs network!');
                      } else {
                        vm.closeModal();
                        vm.toast.info('Network Upload Issue! Please try again!');
                      }
                    })
                    .catch((err) => console.error(err));
              }
            }
          });
        });
      }
    }

    uploadImage('.upload-image');
  },

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
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
        this.toast.success('Please install Metamask to your browser!');
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
    getData: async function () {
      if (this.$cookies.get('connectionType') === 'mt') {
        await this.connectWallet();
        const tx = await user.getUserInfo(
            window.ethereum.selectedAddress.toLowerCase(),
            sessionStorage.getItem('vrcode'),
        );
        for (let i = 0; i < tx.data.SocialLinks.length; i++) {
          if (tx.data.SocialLinks[i].name == 'discord') {
            this.discord = tx.data.SocialLinks[i].path;
          }
          if (tx.data.SocialLinks[i].name == 'twitter') {
            this.twitter = tx.data.SocialLinks[i].path;
          }
          if (tx.data.SocialLinks[i].name == 'instagram') {
            this.instagram = tx.data.SocialLinks[i].path;
          }
          if (tx.data.SocialLinks[i].name == 'web') {
            this.weblink = tx.data.SocialLinks[i].path;
          }
        }
        this.avatar = tx.data.avatar;
        this.fname = tx.data.firstname;
        this.lname = tx.data.lastname;
        this.uname = tx.data.username;
        this.bio = tx.data.bio;
        this.email = tx.data.email;
      } else if (this.$cookies.get('connectionType') === 'wc') {
        const tx = await user.getUserInfo(
            localStorage.getItem('wc_account')
                .toLowerCase(),
            sessionStorage.getItem('vrcode'),
        );
        for (var j = 0; j < tx.data.SocialLinks.length; j++) {
          if (tx.data.SocialLinks[j].name == 'discord') {
            this.discord = tx.data.SocialLinks[j].path;
          }
          if (tx.data.SocialLinks[j].name == 'twitter') {
            this.twitter = tx.data.SocialLinks[j].path;
          }
          if (tx.data.SocialLinks[j].name == 'instagram') {
            this.instagram = tx.data.SocialLinks[j].path;
          }
          if (tx.data.SocialLinks[j].name == 'web') {
            this.weblink = tx.data.SocialLinks[j].path;
          }
        }
        this.avatar = tx.data.avatar;
        this.fname = tx.data.firstname;
        this.lname = tx.data.lastname;
        this.uname = tx.data.username;
        this.bio = tx.data.bio;
        this.email = tx.data.email;
      }
    },
    UpdateProfile: async function () {
      const cur_account =
          this.$cookies.get('connectionType') === 'mt'
              ? window.ethereum.selectedAddress
              : this.$cookies.get('connectionType') === 'wc'
                  ? localStorage.getItem('wc_account')
                  : null;
      const cur_vrcode = sessionStorage.getItem('vrcode');
      const cur_firstname = document.getElementById('FirstName').value;
      const cur_lastname = document.getElementById('LastName').value;
      const cur_displayusername = document.getElementById('displayUserName')
          .value;
      const cur_bio = document.getElementById('bio').value;
      const cur_email = document.getElementById('emailAddress').value;
      const cur_discord = document.getElementById('discordLink').value;
      const cur_twitterLink = document.getElementById('twitterLink').value;
      const cur_instagramLink = document.getElementById('instagramLink').value;
      const cur_weblink = document.getElementById('webLink').value;
      await user
          .CheckUsername(cur_displayusername)
          .then(async (res) => {
            if (res.data.msg && res.data.walletaddress != cur_account) {
              this.toast.info('This username already exists! Please try again!');
            } else {
              const { status } = await this.$store.dispatch('auth/setUserData', {
                account: cur_account.toLowerCase(),
                vrcode: cur_vrcode,
                firstname: cur_firstname,
                lastname: cur_lastname,
                username: cur_displayusername,
                bio: cur_bio,
                email: cur_email,
                discord: cur_discord,
                twitter: cur_twitterLink,
                instagram: cur_instagramLink,
                web: cur_weblink,
              });
              if (status == 200) {
                this.toast.success('Profile Updated!');
              }
            }
          })
          .catch((err) => console.error(err));
    },
    // connectdiscord: async function () {
    //   window.location.href =
    //     'https://discord.com/api/oauth2/authorize?client_id=1006209497406120136&redirect_ur[…]a.scenez.io%2Faccount&response_type=code&scope=identify%20email'
    // },
    discordvalidate: function () {
      var input = document.getElementById('discordLink');
      this.$nextTick(() => {
        input.value = input.value.replace('https://', '');
      });
    },
    twittervalidate: function () {
      var input = document.getElementById('twitterLink');
      this.$nextTick(() => {
        input.value = input.value.replace('https://', '');
      });
    },
    instagramvalidate: function () {
      var input = document.getElementById('instagramLink');
      this.$nextTick(() => {
        input.value = input.value.replace('https://', '');
      });
    },
    weblinkvalidate: function () {
      var input = document.getElementById('webLink');
      this.$nextTick(() => {
        input.value = input.value.replace('https://', '');
      });
    },
  },

  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
};
</script>
<style>
#circle {
  margin-left: 25px;
}
</style>
