import user from '@/services/api/userManagement';
import PubNub from 'pubnub';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

const getDefaultState = () => ({
  user: {},
  sessionToken: null,
  pubnub: null,
});

export default {
  namespaced: true,
  state: () => (getDefaultState()),
  getters: {
    user: (s) => s.user,
    walletAddress: (s) => s.user?.account,
    isConnected: (s) => Object.keys(s.user).length,
    sessionToken: (s) => s.sessionToken,
    pubnub: (s) => s.pubnub,
  },
  mutations: {
    saveUser(state, userInfo = {}) {
      sessionStorage.setItem('jwt', userInfo.token);
      state.user = userInfo.results;
      state.sessionToken = userInfo.token;
      state.pubnub = new PubNub({
        subscribeKey: 'sub-c-70b997ae-5bf7-44bc-8426-5d423395733a',
        publishKey: 'pub-c-768360b5-b5b6-474f-81c5-cec84131c64c',
        uuid: userInfo.results.uuid
      });
      localStorage.setItem('userinfo_uuid', userInfo.results.uuid);
      return state;
    },
    saveProfile(state, userInfo = {}) {
      state.user = userInfo;
    },
    resetAuthState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    async setVrCode({ commit }, {
      vrCode,
      walletAddress
    }) {
      try {
        const {
          data,
          status
        } = await user.setVrCode(vrCode, walletAddress);
        if (status === 200) {
          commit('saveUser', data);
          return this.state;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async setUserData({ commit }, {
      account,
      vrcode,
      firstname,
      lastname,
      username,
      bio,
      email,
      discord,
      twitter,
      instagram,
      web
    }) {
      try {
        const {
          data,
          status
        } = await user.setUserData(
          account,
          vrcode,
          firstname,
          lastname,
          username,
          bio,
          email,
          discord,
          twitter,
          instagram,
          web
        );
        if (status === 200) {
          commit('saveProfile', data.results);
          cookies.set('user', data.results);
          return { status };
        }
      } catch (e) {
        console.error(e);
      }
    },
    getUserDataCookies({ commit }) {
      const userData = cookies.get('user');
      commit('saveProfile', userData);
      return userData;
    }

  },
};
