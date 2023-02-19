<template>
  <nav class="header-menu menu nav">
    <!-- menu list -->
    <MenuList></MenuList>
    <!-- header btn -->
    <ul
        class="menu-btns menu-btns-2"
        v-if="connected"
    >
      <li class="d-none d-lg-inline-block">
        <router-link
            to="/connect"
            class="icon-btn icon-btn-s1"
            title="Wallet"
        >
          <em class="ni ni-wallet"></em>
        </router-link>
      </li>
      <li class="d-none d-lg-inline-block dropdown">
        <button
            type="button"
            class="icon-btn icon-btn-s1"
            data-bs-toggle="dropdown"
        >
          <em class="ni ni-user"></em>
        </button>
        <ul
            class="dropdown-menu card-generic card-generic-s3 dropdown-menu-end mt-2"
        >
          <li>
            <h6 class="dropdown-header">Hello, {{ userData.username }}!</h6>
          </li>
          <li
              v-for="list in SectionData.authorNav"
              :key="list.id"
          >
            <a
                v-if="list.externalUrl"
                :href="list.path"
                target="_blank"
                class="dropdown-item card-generic-item"
            >
              <em
                  class="ni me-2"
                  :class="list.icon"
              ></em>
              {{ list.title }}
            </a>

            <router-link
                v-else
                class="dropdown-item card-generic-item"
                :to="list.path"
            >
              <em
                  class="ni me-2"
                  :class="list.icon"
              ></em>
              {{ list.title }}
            </router-link>
          </li>

          <li>
            <ThemeSwitcher></ThemeSwitcher>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <router-link
                class="dropdown-item card-generic-item"
                to="/"
                @click="$emitter.emit('disconnect', {})"
            >
              <em class="ni ni-power me-2"></em>
              Logout
            </router-link>
          </li>
        </ul>
      </li>
      <li class="d-none">
        <ButtonLink
            :text="SectionData.headerData.btnText"
            link="/"
            classname="btn btn-lg"
            :class="classname"
        ></ButtonLink>
      </li>
    </ul>
    <ul
        class="menu-btns"
        v-else
    >
      <li>
        <ButtonLink
            :connectStatus="connected"
            :text="SectionData.headerData.btnText"
            link="/connect"
            classname="btn"
            :class="classname"
        ></ButtonLink>
      </li>
      <li>
        <ThemeSwitcher></ThemeSwitcher>
      </li>
    </ul>
  </nav>
  <!-- .header-menu -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import { useToast } from "vue-toastification";
// @ is an alias to /src
import MenuList from '@/components/common/MenuList.vue';
import { NETWORKS } from '../../utils/networks';
import userSignUp from '../../services/api/signup';
// import setAuthToken from "../../services/utils/setAuthToken";
import user from '../../services/api/userManagement';
import { mapGetters, mapActions } from 'vuex';
import jwt_decode from 'jwt-decode';
import PubNub from 'pubnub';

export default {
  name: 'Menu',
  props: ['classname'],
  components: {
    MenuList,
  },
  data() {
    return {
      SectionData,
      connected:
          this.$cookies.get('connectionType') === 'mt'
              ? this.$Web3.getProvider() != null
              : this.$cookies.get('connectionType') === 'wc'
                  ? this.$Web3.wc_provider().connected
                  : false,
      account:
          this.$cookies.get('connectionType') === 'mt'
              ? window.ethereum.selectedAddress
              : this.$cookies.get('connectionType') === 'wc'
                  ? localStorage.getItem('wc_account')
                  : null,
    };
  },
  methods: {
    ...mapActions('auth', {
      getUserData: 'getUserDataCookies',
    }),
    async getRandomnumber() {
      let randomChars = '0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += randomChars.charAt(
            Math.floor(Math.random() * randomChars.length),
        );
      }

      return result;
    },
    async getRandomString() {
      let randomChars =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let results = '';

      for (let i = 0; i < 6; i++) {
        results += randomChars.charAt(
            Math.floor(Math.random() * randomChars.length),
        );
      }

      return results;
    },
    async magicConnect() {
      await this.$Web3.magic_connect();
      // await this.$Web3.magic_provider.eth
      //           .getAccounts()
      //           .then((accounts) => {
      //             console.log(accounts?.[0]);
      //           });
    },
    async wcfunc() {
      if (!this.$Web3.wc_provider().connected) {
        await this.$Web3.wc_provider()
            .enable();
        var x = await this.$Web3.wc_web3()
            .eth
            .getAccounts();
        localStorage.setItem('wc_account', x[0]);
        await user
            .checkuserexist(x[0].toLowerCase())
            .then(async (resp) => {
              if (!resp.data.msg) {
                await this.getRandomnumber()
                    .then(async (tr) => {
                      await user.setFriendCode(x[0].toLowerCase(), tr);
                      sessionStorage.setItem('friend_code', tr);
                      await userSignUp.userSignUp(x[0].toLowerCase(), tr);
                    })
                    .catch((err) => console.error(err));
              }
            })
            .catch((err) => console.error(err));

        await this.getRandomString()
            .then(async (vr) => {
              sessionStorage.setItem('vrcode', vr);
              await this.$store
                  .dispatch('auth/setVrCode', {
                    vrCode: vr,
                    walletAddress: x[0].toLowerCase(),
                  })
                  .then((resp) => {
                    this.$cookies.set('user', resp.auth.user);
                    this.$cookies.set('sessionToken', resp.auth.sessionToken);
                  })
                  .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));

        if ((await this.$Web3.wc_provider().chainId) == 5) {
          this.toast.success(`Connected to ${process.env.VUE_APP_NETWORK} successfully!`);
          history.back();
          this.$Web3.isconnected = true;
          this.connected = true;

          this.$emitter.emit('wc-connect', x[0]);
          this.toast.success('Connected to Walletconnect!');
        }
      }
    },
    async connectWallet() {
      if (await this.isEthereumSupported()) {
        await user
            .checkuserexist(window.ethereum.selectedAddress.toLowerCase())
            .then(async (resp) => {
              if (!resp.data.msg) {
                await this.getRandomnumber()
                    .then(async (tr) => {
                      await user.setFriendCode(
                          window.ethereum.selectedAddress.toLowerCase(),
                          tr,
                      );
                      sessionStorage.setItem('friend_code', tr);
                      await userSignUp.userSignUp(
                          window.ethereum.selectedAddress.toLowerCase(),
                          tr,
                      );
                    })
                    .catch((err) => console.error(err));
              }
            })
            .catch((err) => console.error(err));

        await this.getRandomString()
            .then(async (vr) => {
              sessionStorage.setItem('vrcode', vr);
              await this.$store
                  .dispatch('auth/setVrCode', {
                    vrCode: vr,
                    walletAddress: window.ethereum.selectedAddress.toLowerCase(),
                  })
                  .then((resp) => {
                    this.$cookies.set('user', resp.auth.user);
                    this.$cookies.set('sessionToken', resp.auth.sessionToken);
                  })
                  .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));

        var isNetwork = await this.checkNetwork();
        if (isNetwork) {
          this.toast.success(`Connected to ${process.env.VUE_APP_NETWORK} successfully!`);
          history.back();
        }
        this.$Web3.isconnected = true;
        this.connected = true;
        this.$emitter.emit('accounts-change', window.ethereum.selectedAddress);
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
          var isNetwork = await this.checkNetwork();
          if (isNetwork) {
            this.toast.success(`Connected to ${process.env.VUE_APP_NETWORK} successfully!`);
            history.back();
          }
        });
      } else {
        this.toast.error('Please install MetaMask to your browser.');
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
      var chainId = await this.$Web3.ethereum.request({
        method: 'eth_chainId',
      });
      if (chainId == Number(process.env.VUE_APP_ChainID)) {
        return true;
      } else {
        this.toast.error(`Please change Network to ${process.env.VUE_APP_NETWORK}`);
        return false;
      }
    },
    directToaddfriend() {
      this.pubnub.unsubscribe({
        channels: [
          `Send-Add-Friend-Request-${this.account}-status`,
          `reject-in-${this.account}-status`,
          `Send-Invite-party-${this.account}-status`,
          `Sold-nft-item-${this.account}-status`,
        ],
      });
      this.$router.push('/addfriend');
    },
    directTorequest() {
      this.pubnub.unsubscribe({
        channels: [
          `Send-Add-Friend-Request-${this.account}-status`,
          `reject-in-${this.account}-status`,
          `Send-Invite-party-${this.account}-status`,
          `Sold-nft-item-${this.account}-status`,
        ],
      });
      this.$router.push('/request');
    },
    directToCollections() {
      this.pubnub.unsubscribe({
        channels: [
          `Send-Add-Friend-Request-${this.account}-status`,
          `reject-in-${this.account}-status`,
          `Send-Invite-party-${this.account}-status`,
          `Sold-nft-item-${this.account}-status`,
        ],
      });
      this.$router.push('/collections');
    },
  },

  created() {
    this.$emitter.on('wallet-connected', (res) => {
      this.account = res;
      this.$cookies.set('connectionType', 'mt');
    });
    this.$emitter.on('wc-connected', (res) => {
      this.account = res;
      this.$cookies.set('connectionType', 'wc');
    });
    this.$emitter.on('wc-disconnected', () => {
      this.account = null;
    });
    this.$emitter.on('wallet-disconnected', () => {
      this.connected = false;
      this.account = null;
    });
    this.$emitter.on('connect', this.connectWallet);
    this.$emitter.on('wc', this.wcfunc);
    this.$emitter.on('magicConnect', this.magicConnect);
    this.$emitter.on('disconnect', () => {
      this.$store.commit('auth/resetAuthState');
      localStorage.removeItem('userinfo_uuid');
      localStorage.removeItem('walletconnect');
      localStorage.removeItem('wc_account');
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('vrcode');
      this.$router.push('/connect');
      window.location.reload();
    });
  },
  mounted() {
    // disconnect event on this page.
    this.$Web3.wc_provider()
        .on('disconnect', (code, reason) => {
          this.connected = false;
          localStorage.removeItem('userinfo_uuid');
          localStorage.removeItem('walletconnect');
          localStorage.removeItem('wc_account');
          sessionStorage.removeItem('jwt');
          sessionStorage.removeItem('vrcode');
          this.toast.success(reason);
          this.$emitter.emit('wc-disconnect', {});
          this.$router.push('/connect');
          window.location.reload();
        });

    if (sessionStorage.getItem('jwt') == null) {
      this.connected = false;
    } else if (
        jwt_decode(sessionStorage.getItem('jwt')).exp <
        new Date() / 1000
    ) {
      this.connected = false;
    } else {
      this.getUserData();
      this.connected = true;
    }

    // Subscribe to accounts change
    // this.$Web3.wc_provider().on("accountsChanged", (accounts) => {
    //   console.log(accounts);
    // });

    // Subscribe to chainId change
    // this.$Web3.wc_provider().on("chainChanged", (chainId) => {
    //   console.log(chainId);
    // });
    var vm = this;
    if (this.pubnub !== null) {
      this.pubnub.addListener({
        presence: async function (presence) {
          var username;
          var resaccount;
          if (presence.action == 'join') {
            await user.getUsernameByuuid(presence.uuid)
                .then((res) => {
                  username = res.data.result;
                  resaccount = res.data.account;
                });
            if (vm.userData.account != resaccount) {
              vm.toast.info(`${username} is now online`);
            }
          } else if (presence.account == 'timeout') {
            await user.getUsernameByuuid(presence.uuid)
                .then((res) => {
                  username = res.data.result;
                  resaccount = res.data.account;
                });
            if (vm.userData.account != resaccount) {
              vm.toast.info(`${username} is now offline`);
            }
          } else if (presence.account == 'leave') {
            await user.getUsernameByuuid(presence.uuid)
                .then((res) => {
                  username = res.data.result;
                  resaccount = res.data.account;
                });
            if (vm.userData.account != resaccount) {
              vm.toast.info(`${username} is now offline`);
            }
          }
        },
        message: function (message) {
          if (message.message.title == 'removefriend') {
            vm.toast.success(message.message.status);
            vm.directToaddfriend();
          } else if (message.message.title == 'friendrequest') {
            vm.toast.success(message.message.status);
            vm.directTorequest();
          } else if (message.message.title == 'reject-in') {
            vm.toast.success(message.message.status);
            vm.directToaddfriend();
          } else if (message.message.title == 'Invite-party') {
            vm.toast.success(message.message.status);
            vm.directTorequest();
          } else if (message.message.title == 'solditem') {
            vm.toast.success(message.message.status);
            vm.directToCollections();
          }
        },
      });

      // Get The List of Friends.
      this.pubnub.channelGroups.listChannels(
          {
            channelGroup: `cg-user-${this.account}-friends`,
          },
          function (status, response) {
            if (status.error) {
              console.error('operation failed w/ error:', status);
              return;
            }

            response.channels.forEach(function (channel) {
              console.log(channel);
            });
          },
      );

      // Which Friends are online right now
      this.pubnub.hereNow(
          {
            channelGroups: [`cg-user-${this.account}-friends`],
          },
          function (status, response) {
            if (status.error) {
              console.error('operation failed w/ error:', status);
            } else {
              console.log('ONLINE NOW: ', response);
            }
          },
      );

      // Watch Friends come online / go offline
      this.pubnub.subscribe({
        channelGroups: [`cg-user-${this.account}-friends-pnpres`],
        withPresence: true,
      });

      // Get Remove Friend from friendlist Status Feed Messages
      this.pubnub.subscribe({
        channelGroups: [`cg-user-${this.account}-status-feed`],
      });
      // Get Request of adding friend Status Feed Messages
      this.pubnub.subscribe({
        channels: [`Send-Add-Friend-Request-${this.account}-status`],
      });
      // Get Reject of adding friend request Status Feed Message
      this.pubnub.subscribe({ channels: [`reject-in-${this.account}-status`] });
      // Get Invite Party Request
      this.pubnub.subscribe({
        channels: [`Send-Invite-party-${this.account}-status`],
      });
      // Get NFT Item is sold
      this.pubnub.subscribe({
        channels: [`Sold-nft-item-${this.account}-status`],
      });
    } else if (this.pubnub == null) {
      if (localStorage.getItem('userinfo_uuid')) {
        let new_pubnub = new PubNub({
          subscribeKey: 'sub-c-70b997ae-5bf7-44bc-8426-5d423395733a',
          publishKey: 'pub-c-768360b5-b5b6-474f-81c5-cec84131c64c',
          uuid: localStorage.getItem('userinfo_uuid'),
        });
        new_pubnub.addListener({
          presence: async function (presence) {
            var username;
            var resaccount;
            if (presence.action == 'join') {
              await user.getUsernameByuuid(presence.uuid)
                  .then((res) => {
                    username = res.data.result;
                    resaccount = res.data.account;
                  });
              if (vm.userData.account != resaccount) {
                vm.toast.info(`${username} is now online`);
              }
            } else if (presence.account == 'timeout') {
              await user.getUsernameByuuid(presence.uuid)
                  .then((res) => {
                    username = res.data.result;
                    resaccount = res.data.account;
                  });
              if (vm.userData.account != resaccount) {
                vm.toast.info(`${username} is now offline`);
              }
            } else if (presence.account == 'leave') {
              await user.getUsernameByuuid(presence.uuid)
                  .then((res) => {
                    username = res.data.result;
                    resaccount = res.data.account;
                  });
              if (vm.userData.account != resaccount) {
                vm.toast.info(`${username} is now offline`);
              }
            }
          },
          message: function (message) {
            if (message.message.title == 'removefriend') {
              vm.toast.success(message.message.status);
              vm.directToaddfriend();
            } else if (message.message.title == 'friendrequest') {
              vm.toast.success(message.message.status);
              vm.directTorequest();
            } else if (message.message.title == 'reject-in') {
              vm.toast.success(message.message.status);
              vm.directToaddfriend();
            } else if (message.message.title == 'reject-out') {
              vm.toast.success(message.message.status);
              vm.directToaddfriend();
            } else if (message.message.title == 'Invite-party') {
              vm.toast.success(message.message.status);
              vm.directTorequest();
            } else if (message.message.title == 'solditem') {
              vm.toast.success(message.message.status);
              vm.directToCollections();
            }
          },
        });

        // Get The List of Friends.
        new_pubnub.channelGroups.listChannels(
            {
              channelGroup: `cg-user-${this.account}-friends`,
            },
            function (status, response) {
              if (status.error) {
                console.error('operation failed w/ error:', status);
                return;
              }

              response.channels.forEach(function (channel) {
                console.log(channel);
              });
            },
        );

        // Which Friends are online right now
        new_pubnub.hereNow(
            {
              channelGroups: [`cg-user-${this.account}-friends`],
            },
            function (status, response) {
              if (status.error) {
                console.error('operation failed w/ error:', status);
              } else {
                console.log('ONLINE NOW: ', response);
              }
            },
        );

        // Watch Friends come online / go offline
        new_pubnub.subscribe({
          channelGroups: [`cg-user-${this.account}-friends-pnpres`],
          withPresence: true,
        });

        // Get Remove Friend from friendlist Status Feed Messages
        new_pubnub.subscribe({
          channelGroups: [`cg-user-${this.account}-status-feed`],
        });
        // Get Request of adding friend Status Feed Messages
        new_pubnub.subscribe({
          channels: [`Send-Add-Friend-Request-${this.account}-status`],
        });
        // Get Reject of adding friend request Status Feed Message
        new_pubnub.subscribe({
          channels: [`reject-in-${this.account}-status`],
        });
        // Get Reject of adding friend request Status Feed Message
        new_pubnub.subscribe({
          channels: [`reject-out-${this.account}-status`],
        });
        // Get Invite Party Request
        new_pubnub.subscribe({
          channels: [`Send-Invite-party-${this.account}-status`],
        });
        // Get NFT Item is sold
        new_pubnub.subscribe({
          channels: [`Sold-nft-item-${this.account}-status`],
        });
      }
    }
  },
  unmounted() {
    if (!this.connected && this.pubnub != null) {
      // Watch Friends come online / go offline
      this.pubnub.unsubscribeAll();
    } else if (!this.connected && this.pubnub == null) {
      if (localStorage.getItem('userinfo_uuid')) {
        let new_pubnub = new PubNub({
          subscribeKey: 'sub-c-70b997ae-5bf7-44bc-8426-5d423395733a',
          publishKey: 'pub-c-768360b5-b5b6-474f-81c5-cec84131c64c',
          uuid: localStorage.getItem('userinfo_uuid'),
        });
        // Watch Friends come online / go offline
        new_pubnub.unsubscribeAll();
      }
    }
    this.$emitter.off('connect', this.connectWallet);
    this.$emitter.off('wc', this.wcfunc);
  },
  computed: {
    ...mapGetters('auth', {
      userData: 'user',
      sessionToken: 'sessionToken',
      pubnub: 'pubnub',
    }),
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
};
</script>
