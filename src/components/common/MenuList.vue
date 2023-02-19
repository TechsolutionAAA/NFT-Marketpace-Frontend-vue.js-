<template>
  <ul class="menu-list ms-lg-auto">
    <li class="menu-item">
      <router-link
          :to="{ name: 'Home' }"
          class="menu-link"
      >
        {{ SectionData.headerData.menuList.title }}
      </router-link>
      <!--      <div class="menu-sub">-->
      <!--        <ul class="menu-list">-->
      <!--          <li class="menu-item" v-for="nav in SectionData.headerData.menuList.navList" :key="nav.id">-->
      <!--            <router-link :to="nav.path" class="menu-link">{{ nav.title }} <span :class="nav.badgeClass"-->
      <!--                                                                                v-if="nav.badge">{{ nav.badge }}</span>-->
      <!--            </router-link>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </div>-->
    </li>
    <li class="menu-item">
      <router-link
          :to="{ name: 'AboutUs' }"
          class="menu-link"
      >
        About Us
      </router-link>
    </li>
    <li class="menu-item">
      <router-link
          :to="{ name: 'explore' }"
          class="menu-link"
      >
        {{ SectionData.headerData.menuList2.title }}
      </router-link>
      <!--      <div class="menu-sub">-->
      <!--        <ul class="menu-list">-->
      <!--          <li class="menu-item" v-for="nav in SectionData.headerData.menuList2.navList" :key="nav.id">-->
      <!--            <router-link :to="nav.path" class="menu-link">{{ nav.title }}-->
      <!--              <span :class="nav.badgeClass" v-if="nav.badge">{{ nav.badge }}</span>-->
      <!--            </router-link>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </div>-->
    </li>
    <li class="menu-item">
      <router-link
          :to="{ name: 'BuyTicket' }"
          class="menu-link"
      >
        Event Mints
      </router-link>
    </li>
    <!-- <li class="menu-item has-sub">
      <a href="#" class="menu-link menu-toggle">{{ SectionData.headerData.menuList1.title }}</a>
      <div class="menu-sub">
        <ul class="menu-list">
          <li class="menu-item" v-for="nav in SectionData.headerData.menuList1.navList" :key="nav.id">
            <router-link :to="nav.path" class="menu-link">{{ nav.title }}</router-link>
          </li>
        </ul>
      </div>
    </li> -->
    <!--    <li class="menu-item has-sub">-->
    <!--      <a href="#" class="menu-link menu-toggle">{{ SectionData.headerData.menuList3.title }}</a>-->
    <!--      <div class="menu-sub">-->
    <!--        <ul class="menu-list">-->
    <!--          <li class="menu-item" v-for="nav in SectionData.headerData.menuList3.navList" :key="nav.id">-->
    <!--            <router-link-->
    <!--                v-if="!nav.isAuthRequired || !!isConnected"-->
    <!--                :to="nav.isSubPath ? `${nav.path}/${walletAddress}` : nav.path"-->
    <!--                class="menu-link">{{ nav.title }}-->
    <!--            </router-link>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </li>-->
    <li class="menu-item has-sub">
      <a
          href="#"
          class="menu-link menu-toggle"
      >
        {{ SectionData.headerData.menuList4.title }}
      </a>
      <div class="menu-sub menu-mega">
        <div class="menu-mega-row">
          <ul class="menu-list menu-list-mega">
            <li
                class="menu-item"
                v-for="nav in SectionData.headerData.menuList4.navList"
                :key="nav.id"
            >
              <router-link
                  :to="nav.path"
                  class="menu-link"
              >
                {{ nav.title }}
                <span
                    :class="nav.badgeClass"
                    v-if="nav.badge"
                >
                  {{ nav.badge }}
                </span>
              </router-link>
            </li>
          </ul>
          <ul class="menu-list menu-list-mega">
            <li
                class="menu-item"
                v-for="nav in SectionData.headerData.menuList4.navListTwo"
                :key="nav.id"
            >
              <a
                  v-if="nav.externalLink"
                  target="_blank"
                  :href="nav.path"
                  class="menu-link"
              >
                {{ nav.title }}
              </a>
              <router-link
                  v-else
                  :to="nav.path"
                  class="menu-link"
              >
                {{ nav.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js';
import { mapGetters } from 'vuex';

export default {
  name: 'MenuList',
  data() {
    return {
      SectionData,
      userData_cookie: null,
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
    };
  },
  computed: {
    ...mapGetters('auth', {
      isConnected: 'isConnected',
      walletAddress: 'walletAddress',
      userData: 'user',
    }),
  },
};
</script>
