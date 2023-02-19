import axios from 'axios';

export default {
  getUserInfo(walletAddress, vrCode) {
    return axios.get(`/user/get-userInfo-byaccount/${walletAddress}/${vrCode}`);
  },
  checkuserexist(id) {
    return axios.get(`/user/check_exist/${id}`);
  },
  getUserProfile(walletAddress) {
    return axios.get(`/user/profile/${walletAddress}`);
  },
  getUserRole(walletAddress) {
    return axios.get(`/user/get-userrole-byaccount/${walletAddress}`);
  },
  getCreatorRole(walletAddress) {
    return axios.get(`/user/get-creator_rate/${walletAddress}`);
  },
  getAvatar(id, body) {
    return axios.get(`/user/get-avatar-byaccount/${id}/${body}`);
  },
  setVrCode(vrCode, walletAddress) {
    return axios.get(`/user/set-vr-code/${walletAddress}/${vrCode}`);
  },
  setFriendCode(id, body) {
    return axios.get(`/user/set-friend-code/${id}/${body}`);
  },
  vrLogin(id) {
    return axios.get(`/user/vr-login/${id}}`);
  },
  getAllUsers() {
    return axios.get(`/user/all-users`);
  },
  CheckUsername(id) {
    return axios.get(`/user/check_username/${id}`);
  },
  setUserData(account, vrcode, firstname, lastname, username, bio, email, discord, twitter, instagram, web) {
    return axios.post(`/user/set-userdata`, {
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
    });
  },
  addAvatarPath(account, vrcode, cid) {
    return axios.post(`/user/addavatarpath`, {
      account,
      vrcode,
      cid
    });
  },
  addHeaderimage(account, vrcode, cid) {
    return axios.post(`/user/addheaderpng`, {
      account,
      vrcode,
      cid
    });
  },
  addUnityAvatar(account, vrcode, exportavatarurl) {
    return axios.post(`/user/addUnityAvatar`, {
      account,
      vrcode,
      exportavatarurl
    });
  },
  getUserInfoByUserId(user_id) {
    return axios.post(`/user/user-Info-by-userid`, {
      user_id
    });
  },
  saveUserInfoByAdmin(CurUserId, CurAccount, CurUsername, CurVrCode, CurUserRole, CurAvatarCID, CurUnityAvatar,) {
    return axios.post(`/user/save-user-Info-by-admin`, {
      CurUserId,
      CurAccount,
      CurUsername,
      CurVrCode,
      CurUserRole,
      CurAvatarCID,
      CurUnityAvatar,
    });
  },
  getToken(channel) {
    return axios.post(`/user/agoratoken`, {
      channel
    });
  },
  getUuid(account) {
    return axios.post(`/user/getUuid`, {
      account
    });
  },
  getUsernameByuuid(uuid) {
    return axios.post(`/user/getUsernameByuuid`, {
      uuid
    });
  },
};
