<template>
  <div class="col-lg-9 ps-xl-5">
    <div class="user-panel-title-box">
      <h3>{{ SectionData.userActivityItems.mainTitle }}</h3>
    </div>
    <!-- end user-panel-title-box -->
    <div class="profile-setting-panel-wrap pt-2">
      <ul
          class="nav nav-tabs nav-tabs-s3 mb-2"
          id="myTab"
          role="tablist"
      >
        <li
            class="nav-item"
            role="presentation"
            v-for="list in SectionData.userActivityTabNav"
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
                v-for="item in total"
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
                  <h6 class="card-s1-title">
                    {{ item.firstname }}&nbsp;{{ item.lastname }}
                    <img
                        :src="favorite"
                        id="favorite"
                    />
                  </h6>
                  <h5 v-if="item.sent == 'party'">Party Invite...</h5>
                  <h5 v-else-if="item.sent == 'in'">Incoming....</h5>
                  <h5 v-else-if="item.sent == 'out'">Outgoing....</h5>
                  <p
                      class="card-s1-text"
                      v-if="item.sent == 'party'"
                  >
                    <span>
                      CHANNEL NAME:&nbsp;&nbsp;
                      <strong>{{ item.channel }}</strong>
                    </span>
                  </p>
                  <p
                      class="card-s1-text"
                      v-else
                  >
                    <span>{{ item.username }} {{ item.usercode }}</span>
                    &nbsp;&nbsp;
                    <router-link
                        to="#"
                        class="btn-link fw-medium"
                    >
                      {{ item.email }}
                    </router-link>
                  </p>
                  <!-- <p class="card-s1-text">{{ item.accessDate }}</p> -->
                </div>
                <div
                    class="flex-grow"
                    v-if="item.sent == 'party'"
                >
                  <div
                      class="avatar avatar-0"
                      id="close"
                      @click="acceptinvite(item.token, item.channel, item.appid)"
                  >
                    <img :src="checkpng" />
                  </div>
                  <div
                      class="avatar avatar-0"
                      id="close"
                      @click="rejectinvite(item.channel)"
                  >
                    <img :src="closepng" />
                  </div>
                </div>
                <div
                    class="flex-grow"
                    v-else-if="item.sent == 'out'"
                >
                  <div
                      class="avatar avatar-0"
                      id="close"
                      @click="rejectout(item.account)"
                  >
                    <img :src="closepng" />
                  </div>
                </div>
                <div
                    class="flex-grow"
                    v-else-if="item.sent == 'in'"
                >
                  <div
                      class="avatar avatar-0"
                      id="check"
                      @click="accept(item.account, item.usercode)"
                  >
                    <img :src="checkpng" />
                  </div>
                  <div
                      class="avatar avatar-0"
                      id="close"
                      @click="rejectin(item.account)"
                  >
                    <img :src="closepng" />
                  </div>
                </div>
              </div>
            </div>
            <!-- end card -->
          </div>
          <!-- end activity-tab-wrap -->
        </div>
        <!-- end tab-pane -->
        <div
            class="tab-pane fade"
            id="following"
            role="tabpanel"
            aria-labelledby="following-tab"
        >
          <div class="activity-tab-wrap">
            <div
                class="card card-creator-s1 mb-4"
                v-for="item in total"
                :key="item.id"
            >
              <div
                  class="card-body d-flex align-items-center"
                  v-if="item.sent == 'party'"
              >
                <div class="avatar avatar-1 flex-shrink-0">
                  <img
                      :src="prefix + item.avatar"
                      alt="avatar"
                  />
                </div>
                <div class="flex-grow-1">
                  <h6 class="card-s1-title">
                    {{ item.firstname }}&nbsp;{{ item.lastname }}
                    <img
                        :src="favorite"
                        id="favorite"
                    />
                  </h6>
                  <h5>Party Invite...</h5>
                  <p class="card-s1-text">
                    <span>
                      CHANNEL NAME:&nbsp;&nbsp;
                      <strong>{{ item.channel }}</strong>
                    </span>
                  </p>
                  <!-- <p class="card-s1-text">{{ item.accessDate }}</p> -->
                </div>
                <div class="flex-grow">
                  <div
                      class="avatar avatar-0"
                      id="close"
                      @click="acceptinvite(item.token, item.channel, item.appid)"
                  >
                    <img :src="checkpng" />
                  </div>
                  <div
                      class="avatar avatar-0"
                      id="close"
                      @click="rejectinvite(item.channel)"
                  >
                    <img :src="closepng" />
                  </div>
                </div>
              </div>
            </div>
            <!-- end card -->
            <!-- end card -->
          </div>
          <!-- end activity-tab-wrap -->
        </div>
        <!-- end tab-pane -->
        <div
            class="tab-pane fade"
            id="bidding"
            role="tabpanel"
            aria-labelledby="bidding-tab"
        >
          <div class="activity-tab-wrap">
            <div
                class="card card-creator-s1 mb-4"
                v-for="item in total"
                :key="item.id"
            >
              <div
                  class="card-body d-flex align-items-center"
                  v-if="item.sent == 'in'"
              >
                <div class="avatar avatar-1 flex-shrink-0">
                  <img
                      :src="prefix + item.avatar"
                      alt="avatar"
                  />
                </div>
                <div class="flex-grow-1">
                  <h6 class="card-s1-title">
                    {{ item.firstname }}&nbsp;{{ item.lastname }}
                    <img
                        :src="favorite"
                        id="favorite"
                    />
                  </h6>
                  <h5>Incoming....</h5>
                  <p class="card-s1-text">
                    <span>{{ item.username }} {{ item.usercode }}</span>
                    &nbsp;&nbsp;
                    <router-link
                        to="#"
                        class="btn-link fw-medium"
                    >
                      {{ item.email }}
                    </router-link>
                  </p>
                  <!-- <p class="card-s1-text">{{ item.accessDate }}</p> -->
                </div>
                <div class="flex-grow">
                  <div
                      class="avatar avatar-0"
                      id="check"
                      @click="accept(item.account, item.usercode)"
                  >
                    <img :src="checkpng" />
                  </div>
                  <div
                      class="avatar avatar-0"
                      id="close"
                      @click="rejectin(item.account)"
                  >
                    <img :src="closepng" />
                  </div>
                </div>
              </div>
            </div>
            <!-- end card -->
          </div>
          <!-- end activity-tab-wrap -->
        </div>
        <!-- end tab-pane -->
        <div
            class="tab-pane fade"
            id="sales"
            role="tabpanel"
            aria-labelledby="sales-tab"
        >
          <div class="activity-tab-wrap">
            <div
                class="card card-creator-s1 mb-4"
                v-for="item in total"
                :key="item.id"
            >
              <div
                  class="card-body d-flex align-items-center"
                  v-if="item.sent == 'out'"
              >
                <div class="avatar avatar-1 flex-shrink-0">
                  <img
                      :src="prefix + item.avatar"
                      alt="avatar"
                  />
                </div>
                <div class="flex-grow-1">
                  <h6 class="card-s1-title">
                    {{ item.firstname }}&nbsp;{{ item.lastname }}
                    <img
                        :src="favorite"
                        id="favorite"
                    />
                  </h6>
                  <h5>Outgoing...</h5>
                  <p class="card-s1-text">
                    <span>{{ item.username }} {{ item.usercode }}</span>
                    &nbsp;&nbsp;
                    <router-link
                        to="#"
                        class="btn-link fw-medium"
                    >
                      {{ item.email }}
                    </router-link>
                  </p>
                  <!-- <p class="card-s1-text">{{ item.accessDate }}</p> -->
                </div>
                <div class="flex-grow">
                  <div
                      class="avatar avatar-0"
                      id="close"
                      @click="rejectout(item.account)"
                  >
                    <img :src="closepng" />
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
import SectionData from '@/store/store.js';
import Friends from '../../services/api/friendList';
import Party from '../../services/api/partyMangement';
import checkpng from '../../images/custom/check.jpg';
import closepng from '../../images/custom/close.png';
import favorite from '../../images/favorite1.png';
import { useToast } from "vue-toastification";

export default {
  name: 'UserActivitySection',
  data() {
    return {
      SectionData,
      checkpng,
      closepng,
      favorite,
      prefix: 'https://gate.scenez.io/ipfs/',
      account:
          this.$cookies.get('connectionType') == 'mt'
              ? window.ethereum.selectedAddress
              : this.$cookies.get('connectionType') == 'wc'
                  ? localStorage.getItem('wc_account')
                  : null,
      vrcode: sessionStorage.getItem('vrcode'),
      temppushedData1: [],
      temppushedData2: [],
      temppushedData3: [],
      users1: [],
      users2: [],
      users3: [],
      total: [],
    };
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  created: async function () {
    await this.getinviterequestdata();
    await this.getrequestdata();
    await this.getsentrequestdata();
  },
  methods: {
    getinviterequestdata: function () {
      if (this.account !== null && this.vrcode !== null) {
        Friends.getInviteRequestdata(this.account.toLowerCase(), this.vrcode)
            .then((res) => {
              console.log(res.data);
              if (res.data.msg == 'No Data') {
                return;
              } else {
                this.temppushedData3.push(res.data);
                this.users3 = this.temppushedData3[0];
                this.total = [...this.users3, ...this.users1, ...this.users2];
              }
            })
            .catch((err) => console.error(err));
      }
    },
    getrequestdata: async function () {
      if (this.account !== null && this.vrcode !== null) {
        await Friends.getRequestFriends(this.account.toLowerCase(), this.vrcode)
            .then((res) => {
              if (res.data.msg == 'No Data') {
                return;
              } else {
                this.temppushedData1.push(res.data);
                this.users1 = this.temppushedData1[0];
                this.total = [...this.users3, ...this.users1, ...this.users2];
              }
            })
            .catch((err) => console.error(err));
      }
    },
    getsentrequestdata: async function () {
      if (this.account !== null && this.vrcode !== null) {
        await Friends.getSentRequestFriends(
            this.account.toLowerCase(),
            this.vrcode,
        )
            .then((res) => {
              if (res.data.msg == 'No Data') {
                return;
              } else {
                this.temppushedData2.push(res.data);
                this.users2 = this.temppushedData2[0];
                this.total = [...this.users3, ...this.users1, ...this.users2];
              }
            })
            .catch((err) => console.error(err));
      }
    },
    acceptinvite: async function (val1, val2, val3) {
      this.$router.push({
        path: '/party',
        query: {
          appid: val3,
          channel: val2,
          token: val1
        },
      });
    },
    rejectinvite: async function (value) {
      await Party.removeinviteRequest(this.account.toLowerCase(), value)
          .then((res) => {
            if (res.data.result == true) {
              this.toast.success('Party invite rejected!');
              setTimeout(() => {
                this.$router.push({ name: 'MyFriends' });
              }, 1500);
            }
          })
          .catch((err) => console.error(err));
    },
    rejectout: async function (index) {
      await Friends.removeSentRequest(
          this.account.toLowerCase(),
          index.toLowerCase(),
      )
          .then(async (res) => {
            if (res.data.result) {
              await Friends.removeRequest(
                  index.toLowerCase(),
                  this.account.toLowerCase(),
              )
                  .then((res1) => {
                    if (res1.data.result) {
                      this.toast.success('Request removed!');
                    } else {
                      this.toast.error('Failed! Please try again!');
                    }
                  })
                  .catch((err) => console.error(err));
            } else {
              this.toast.error('Failed! Please try again!');
            }
          })
          .catch((err) => console.error(err));
    },
    rejectin: async function (index) {
      await Friends.removeSentRequest(
          index.toLowerCase(),
          this.account.toLowerCase(),
      )
          .then(async (res) => {
            if (res.data.result) {
              await Friends.removeRequest(
                  this.account.toLowerCase(),
                  index.toLowerCase(),
              )
                  .then((res1) => {
                    if (res1.data.result) {
                      this.toast.success('Request has been removed!');
                    } else {
                      this.toast.error('Failed! Please try again!');
                    }
                  })
                  .catch((err) => console.error(err));
            } else {
              this.toast.error('Failed! Please try again!');
            }
          })
          .catch((err) => console.error(err));
    },
    accept: async function (index, code) {
      const usercode = sessionStorage.getItem('friend_code');
      await Friends.addFriend(
          this.account.toLowerCase(),
          index.toLowerCase(),
          code,
      )
          .then(async (res) => {
            if (res.data.result) {
              await Friends.addFriend(
                  index.toLowerCase(),
                  this.account.toLowerCase(),
                  usercode,
              )
                  .then((res1) => {
                    if (res1.data.result) {
                      this.rejectout(index);
                      this.rejectin(index);
                      this.toast.success('Success!');
                    }
                  })
                  .catch((err) => console.error(err));
            } else {
              this.toast.error('Rejected! Please try again!');
            }
          })
          .catch((err) => console.error(err));
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
