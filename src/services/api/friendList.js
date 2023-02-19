import axios from 'axios';
const baseURL = process.env.VUE_APP_API_URL;

export default {
    getFriends(account, vrcode) {
        return axios.post(`${baseURL}/user/friend/getFriends`, {
            account,
            vrcode
        });
    },
    getFavorite(account, vrcode) {
        return axios.post(`${baseURL}/user/friend/getFavorite`, {
            account,
            vrcode
        });
    },
    getBlocklist(account, vrcode) {
        return axios.post(`${baseURL}/user/friend/getBlocklist`, {
            account,
            vrcode
        });
    },
    getCode(account, vrcode) {
        return axios.post(`${baseURL}/user/friend/getCode`, {
            account,
            vrcode
        });
    },
    getUserByCode(friendCode) {
        return axios.post(`${baseURL}/user/friend/get_user_by_code`, {
            friendCode
        });
    },
    getRequestFriends(account, vrcode) {
        return axios.post(`${baseURL}/user/friend/getRequestFriends`, {
            account,
            vrcode
        });
    },
    getSentRequestFriends(account, vrcode) {
        return axios.post(`${baseURL}/user/friend/getsentRequestFriends`, {
            account,
            vrcode
        });
    },
    getInviteRequestdata(account, vrcode) {
        return axios.post(`${baseURL}/user/friend/getinviterequest`, {
            account,
            vrcode
        });
    },
    setFriendRequest(Toaccount, account, code) {
        return axios.post(`${baseURL}/user/friend/setFriendRequest`, {
            Toaccount,
            account,
            code
        });
    },
    setFriendSentRequest(Toaccount, account, code) {
        return axios.post(`${baseURL}/user/friend/setFriendSentRequest`, {
            Toaccount,
            account,
            code
        });
    },
    addFriend(Toaccount, account, usercode) {
        return axios.post(`${baseURL}/user/friend/add_Friend`, {
            Toaccount,
            account,
            usercode
        });
    },
    makeBlockCode(account, code) {
        return axios.post(`${baseURL}/user/friend/makeblockcode`, {
            account,
            code
        });
    },
    removeRequest(account, index) {
        return axios.post(`${baseURL}/user/friend/Remove_Request`, {
            account,
            index
        });
    },
    removeSentRequest(account, index) {
        return axios.post(`${baseURL}/user/friend/Remove_SentRequest`, {
            account,
            index
        });
    },
    addFavorite(Toaccount, usercode) {
        return axios.post(`${baseURL}/user/friend/Add_Favorite`, {
            Toaccount,
            usercode
        });
    },
    removeFavorite(Toaccount, usercode) {
        return axios.post(`${baseURL}/user/friend/Remove_Favorite`, {
            Toaccount,
            usercode
        });
    },
    addBlock(Toaccount, usercode) {
        return axios.post(`${baseURL}/user/friend/Add_Block`, {
            Toaccount,
            usercode
        });
    },
    removeBlocklist(Toaccount, usercode) {
        return axios.post(`${baseURL}/user/friend/Remove_Blocklist`, {
            Toaccount,
            usercode
        });
    },
    RemoveFriend(Toaccount, account) {
        return axios.post(`${baseURL}/user/friend/RemoveFriend`, {
            Toaccount,
            account
        });
    },
    checkFriend(code) {
        return axios.post(`${baseURL}/user/friend/Checkcode`, {
            code
        });
    }
};
