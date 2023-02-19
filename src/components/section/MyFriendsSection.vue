<template>
  <div class="col-lg-9 ps-xl-5">
    <div class="user-panel-title-box">
      <h3>{{ SectionData.myFriendsdata.mainTitle }}</h3>
    </div>
    <!-- end user-panel-title-box -->
    <div class="profile-setting-panel-wrap pt-2">
      <div
          class="tab-content mt-4 tab-content-desktop"
          id="myTabContent"
      >
        <div
            class="tab-pane fade show active"
            id="all"
            role="tabpanel"
            aria-labelledby="all-tab"
        >
          <div class="activity-tab-wrap">
            <div
                class="card card-creator-s1 mb-4"
                v-for="item in users"
                :key="item.id"
            >
              <div class="card-body d-flex align-items-center">
                <div class="avatar avatar-1 flex-shrink-0">
                  <img
                      :src="prefix + item.avatar"
                      alt="avatar"
                  />
                </div>
                <div class="flex-grow-1">
                  <h6
                      v-if="online.indexOf(`ch-user-${item.account}-present`) == -1"
                      class="card-s1-title"
                  >
                    <svg
                        style="color: red"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L9.21426 10.6285C9.26325 10.6906 9.31947 10.7469 9.38164 10.7958L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L17.0323 15.6181C19.8626 12.0844 19.6398 6.91177 16.3641 3.63603C15.9736 3.24551 15.3404 3.24551 14.9499 3.63603C14.5593 4.02656 14.5593 4.65972 14.9499 5.05025C17.4435 7.54386 17.6625 11.4508 15.6068 14.1926L14.172 12.7578C15.4582 10.8164 15.2461 8.17494 13.5357 6.46446C13.1451 6.07394 12.512 6.07394 12.1214 6.46446C11.7309 6.85498 11.7309 7.48815 12.1214 7.87867C13.0451 8.80233 13.2406 10.1784 12.7078 11.2936L10.7164 9.30219C10.7103 9.29595 10.7042 9.28979 10.6979 9.2837L3.70711 2.29289Z"
                          fill="red"
                      ></path>
                      <path
                          d="M3.23766 8.1865C3.38012 7.65291 3.06305 7.10485 2.52946 6.96239C1.99586 6.81992 1.44781 7.137 1.30535 7.67059C0.5045 10.6701 1.27982 14.0074 3.63615 16.3637C4.02667 16.7542 4.65984 16.7542 5.05036 16.3637C5.44089 15.9732 5.44089 15.34 5.05036 14.9495C3.21924 13.1184 2.6134 10.5246 3.23766 8.1865Z"
                          fill="red"
                      ></path>
                      <path
                          d="M7.40075 11.4995C7.12434 11.0214 6.51266 10.8578 6.03452 11.1343C5.55639 11.4107 5.39285 12.0223 5.66926 12.5005C5.88367 12.8714 6.14907 13.2198 6.46458 13.5353C6.85511 13.9258 7.48827 13.9258 7.8788 13.5353C8.26932 13.1448 8.26932 12.5116 7.8788 12.1211C7.68771 11.93 7.52865 11.7208 7.40075 11.4995Z"
                          fill="red"
                      ></path>
                    </svg>&nbsp;&nbsp;&nbsp;offline
                  </h6>
                  <h6 v-else>
                    <svg
                        style="color: #29D23A"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.05025 3.63579C5.44078 4.02631 5.44078 4.65948 5.05025 5.05C2.31658 7.78367 2.31658 12.2158 5.05025 14.9495C5.44078 15.34 5.44078 15.9732 5.05025 16.3637C4.65973 16.7542 4.02656 16.7542 3.63604 16.3637C0.12132 12.849 0.12132 7.15051 3.63604 3.63579C4.02656 3.24526 4.65973 3.24526 5.05025 3.63579ZM14.9498 3.63602C15.3403 3.2455 15.9735 3.2455 16.364 3.63602C19.8787 7.15074 19.8787 12.8492 16.364 16.3639C15.9735 16.7545 15.3403 16.7545 14.9498 16.3639C14.5592 15.9734 14.5592 15.3403 14.9498 14.9497C17.6834 12.2161 17.6834 7.78391 14.9498 5.05023C14.5592 4.65971 14.5592 4.02655 14.9498 3.63602ZM7.87869 6.46422C8.26921 6.85474 8.26921 7.48791 7.87869 7.87843C6.70711 9.05 6.70711 10.9495 7.87869 12.1211C8.26921 12.5116 8.26921 13.1448 7.87868 13.5353C7.48816 13.9258 6.855 13.9258 6.46447 13.5353C4.51185 11.5827 4.51185 8.41684 6.46447 6.46422C6.855 6.07369 7.48816 6.07369 7.87869 6.46422ZM12.1213 6.46445C12.5119 6.07392 13.145 6.07392 13.5355 6.46445C15.4882 8.41707 15.4882 11.5829 13.5355 13.5355C13.145 13.926 12.5119 13.926 12.1213 13.5355C11.7308 13.145 11.7308 12.5118 12.1213 12.1213C13.2929 10.9497 13.2929 9.05023 12.1213 7.87866C11.7308 7.48814 11.7308 6.85497 12.1213 6.46445ZM10 8.99998C10.5523 8.99998 11 9.4477 11 9.99998V10.01C11 10.5623 10.5523 11.01 10 11.01C9.44772 11.01 9 10.5623 9 10.01V9.99998C9 9.4477 9.44772 8.99998 10 8.99998Z"
                          fill="#29D23A"
                      ></path>
                    </svg>&nbsp;&nbsp;&nbsp;online
                  </h6>
                  <h6 class="card-s6-text">
                    {{ item.username }} {{ item.usercode }}
                  </h6>
                </div>
                <div class="flex-grow">
                  <div class="dropdown">
                    <a
                        href="#"
                        class="btn bg-dark-dim d-block"
                        data-bs-toggle="dropdown"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-three-dots"
                          viewBox="0 0 16 16"
                      >
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                      </svg>
                    </a>
                    <div class="dropdown-menu card-generic p-2 keep-open w-100 mt-1">
                      <router-link
                          :to="`/user/${item.account}`"
                          class="dropdown-item card-generic-item"
                      >View Profile
                      </router-link>
                      <div
                          class="dropdown-item card-generic-item"
                          @click="addfavorite(item.usercode)"
                      >Add To Favorites
                      </div>
                      <div
                          class="dropdown-item card-generic-item"
                          @click="addblock(item.usercode)"
                      >Block
                      </div>
                      <div
                          class="dropdown-item card-generic-item"
                          @click="removefriend(item.account)"
                      >Remove
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end card -->
          </div>
          <!-- end activity-tab-wrap -->
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
import SectionData from "@/store/store.js";
import { mapGetters } from "vuex";
import Friends from "../../services/api/friendList";
import checkpng from "../../images/custom/check.jpg";
import closepng from "../../images/custom/close.png";
import favorite from "../../images/favorite1.png";
import { useToast } from "vue-toastification";
import PubNub from "pubnub";

export default {
  name: "MyFriendsSection",
  data() {
    return {
      SectionData,
      checkpng,
      closepng,
      favorite,
      prefix: "https://gate.scenez.io/ipfs/",
      account: this.$cookies.get("connectionType") == "mt" ? window.ethereum.selectedAddress : this.$cookies.get("connectionType") == "wc" ? localStorage.getItem("wc_account") : null,
      vrcode: sessionStorage.getItem("vrcode"),
      temppushedData: [],
      users: [],
      online: [],
    };
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  mounted: async function () {
    await this.getallusers();

    var vm = this;

    if (this.pubnub !== null) {
      // Which Friends are online right now
      vm.online = [];
      this.pubnub.hereNow(
          {
            channelGroups: [`cg-user-${this.account}-friends`]
          }, function (status, response) {
            if (status.error) {
              console.log("operation failed w/ error:", status);
            } else {
              for (var i = 0; i < Object.keys(response.channels).length; i++) {
                console.log(Object.keys(response.channels)[i])
                vm.online.push(Object.keys(response.channels)[i])
              }
            }
          }
      );
      // Watch Friends come online / go offline
      this.pubnub.subscribe({
        channelGroups: [`cg-user-${this.account}-friends-pnpres`],
        withPresence: true
      });
      // Get Remove Friend from friendlist Status Feed Messages
      this.pubnub.subscribe({ channelGroups: [`cg-user-${this.account}-status-feed`] });
    } else if (this.pubnub == null) {
      if (localStorage.getItem("userinfo_uuid")) {

        let new_pubnub = new PubNub({
          subscribeKey: "sub-c-70b997ae-5bf7-44bc-8426-5d423395733a",
          publishKey: "pub-c-768360b5-b5b6-474f-81c5-cec84131c64c",
          uuid: localStorage.getItem("userinfo_uuid")
        });

        vm.online = [];
        new_pubnub.hereNow(
            {
              channelGroups: [`cg-user-${this.account}-friends`]
            }, function (status, response) {
              if (status.error) {
                console.log("operation failed w/ error:", status);
              } else {
                for (var i = 0; i < Object.keys(response.channels).length; i++) {
                  console.log(Object.keys(response.channels)[i])
                  vm.online.push(Object.keys(response.channels)[i])
                }
              }
            }
        );
        // Watch Friends come online / go offline
        new_pubnub.subscribe({
          channelGroups: [`cg-user-${this.account}-friends-pnpres`],
          withPresence: true
        });
        // Get Remove Friend from friendlist Status Feed Messages
        new_pubnub.subscribe({ channelGroups: [`cg-user-${this.account}-status-feed`] });
      }
    }
  },
  computed: {
    ...mapGetters('auth', {
      userData: 'user',
      sessionToken: 'sessionToken',
      pubnub: "pubnub"
    }),
  },
  methods: {
    getallusers: async function () {
      if (this.account !== null && this.vrcode !== null) {
        await Friends.getFriends(this.account.toLowerCase(), this.vrcode)
            .then((res) => {
              if (res.data.msg == "No Data") {
                return;
              } else {
                this.temppushedData.push(res.data);
                this.users = this.temppushedData[0];
              }
            })
            .catch((err) => console.error(err));
      }
    },
    removefriend: async function (val) {
      if (this.account !== null && val !== null) {
        await Friends.RemoveFriend(val.toLowerCase(), this.account.toLowerCase())
            .then((res) => {
              if (res.data.result) {
                this.toast.success("Friend removed from your list");
                this.$router.push('/addfriend');
              }
            })
            .catch((err) => console.error(err));
      }
    },
    addfavorite: async function (val) {
      if (this.account !== null && val !== null) {
        await Friends.addFavorite(this.account.toLowerCase(), val)
            .then((res) => {
              if (res.data.result) {
                this.toast.success("Friend added to favorites!");
                this.$router.push({ name: 'Favorites' });
              } else {
                this.toast.error("This friend has already been added to favorites!");
              }
            })
            .catch((err) => console.error(err));
      }
    },
    addblock: async function (val) {
      if (this.account !== null && val !== null) {
        Friends.checkFriend(val)
            .then((res) => {
              if (res.data.msg) {
                Friends.makeBlockCode(this.account.toLowerCase(), val)
                    .then(() => {
                      this.toast.success("User has been blocked!");
                      this.$router.push('/Blocklist');
                    })
                    .catch(err => console.error(err));
              } else {
                this.toast.error("The code you entered does not exist or the code format is incorrect!");
              }
            })
            .catch(err => console.error(err));
      }
    },
  },
};
</script>
<style>
div#check,
#close {
  cursor: pointer;
}

#favorite {
  width: 20px;
  margin-left: 20px;
  cursor: pointer;
}

</style>
