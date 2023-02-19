<template>
  <div class="col-lg-8">
    <div class="user-panel-title-box">
      <h3>{{ SectionData.FrienlistsData.mainTitle }}</h3>
    </div>
    <!-- end user-panel-title-box -->
    <div class="profile-setting-panel-wrap">
      <div class="table-responsive">
        <table
            class="table mb-0 table-s2"
            v-if="users.length != 0"
        >
          <thead class="fs-14">
          <tr>
            <th
                scope="col"
                v-for="(list, i) in SectionData.FrienlistsData
                  .transactionsTableHead"
                :key="i"
            >
              {{ list }}
            </th>
          </tr>
          </thead>
          <tbody class="fs-13">
          <tr
              v-for="item in users"
              :key="item.id"
          >
            <td>
              <div class="avatar avatar-1 flex-shrink-0">
                <img
                    :src="prefix + item.avatar"
                    alt="avatar"
                />
              </div>
            </td>
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>
              {{ item.account.substring(0, 4) }}...{{
                item.account.substring(37, 42)
              }}
            </td>
            <td>{{ item.usercode }}</td>
            <td>
              <div
                  class="icon-btn"
                  @click="removefavorite(item.usercode)"
              >
                <em class="ni ni-trash"></em>
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <div
            class="user-panel-title-box"
            v-else
        >
          <h3 id="nodata">{{ SectionData.FrienlistsData.nodataTitle }}</h3>
        </div>
      </div>
      <!-- end table-responsive -->
      <!-- pagination -->
      <div class="text-center mt-4 mt-md-5">
        <Pagination
            :records="users.length"
            v-model="page"
            :per-page="perPage"
        ></Pagination>
      </div>
    </div>
    <!-- end profile-setting-panel-wrap-->
  </div>
  <!-- end col-lg-8 -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import Pagination from 'vue-pagination-2';
import Friends from '../../services/api/friendList';
import { useToast } from "vue-toastification";

export default {
  name: 'BlocklistSection',
  components: {
    Pagination,
  },
  setup() {
      // Get toast interface
      const toast = useToast();

      // Make it available inside methods
      return { toast }
  },
  data() {
    return {
      prefix: 'https://gate.scenez.io/ipfs/',
      account:
          this.$cookies.get('connectionType') == 'mt'
              ? window.ethereum.selectedAddress
              : this.$cookies.get('connectionType') == 'wc'
                  ? localStorage.getItem('wc_account')
                  : null,
      vrcode: sessionStorage.getItem('vrcode'),
      temppushedData: [],
      users: [],
      SectionData,
      page: 1,
      perPage: 6,
    };
  },
  mounted: function () {
    this.getFavoritelist();
  },
  methods: {
    getFavoritelist: async function () {
      if (this.account !== null && this.vrcode !== null) {
        await Friends.getFavorite(this.account.toLowerCase(), this.vrcode)
            .then((res) => {
              if (res.data.msg == 'No Data') {
                return;
              } else {
                this.temppushedData.push(res.data);
                this.users = this.temppushedData[0];
              }
            })
            .catch((err) => console.error(err));
      }
    },
    removefavorite: async function (val1) {
      if (this.account !== null && val1 !== null) {
        await Friends.removeFavorite(this.account.toLowerCase(), val1)
            .then((res) => {
              if (res.data.result) {
                this.toast.success('Success!');
                setTimeout(() => {
                  this.$router.push({ name: 'MyFriends' });
                }, 1500);
              } else {
                this.toast.error('Failed!');
              }
            })
            .catch((err) => console.error(err));
      }
    },
  },
};
</script>
<style scoped>
h3#nodata {
  text-align: center;
}

.icon-btn {
  cursor: pointer;
}
</style>
