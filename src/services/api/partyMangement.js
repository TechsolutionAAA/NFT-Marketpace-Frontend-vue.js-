import axios from 'axios';
const baseURL = process.env.VUE_APP_API_URL;

export default {
    createParty(account, vrcode, creator, channelName, token, uid) {
        return axios.post(`${baseURL}/user/parties/create`, {
            account,
            vrcode,
            creator,
            channelName,
            token,
            uid
        });
    },
    joinParty(account, channelName, uid, token) {
        return axios.post(`${baseURL}/user/parties/join`, {
            account,
            channelName,
            uid,
            token
        });
    },
    leaveParty(account, channelName) {
        return axios.post(`${baseURL}/user/parties/leave`, {
            account,
            channelName
        });
    },
    get_party_by_user(account) {
        return axios.post(`${baseURL}/user/parties/get_party_by_user`, {
            account
        });
    },
    
    get_party_by_channel(channelName) {
        return axios.post(`${baseURL}/user/parties/get_party_by_channel`, {
            channelName
        });
    },
    
    get_invitedRequest(account) {
        return axios.post(`${baseURL}/user/parties/get_invitedRequest`, {
            account
        });
    },
    get_sentinvitedRequest(account) {
        return axios.post(`${baseURL}/user/parties/get_sentinvitedRequest`, {
            account
        });
    },
    inviteRequest(destinationAccount, channelName, creater, token) {
        return axios.post(`${baseURL}/user/parties/inviteRequest`, {
            destinationAccount,
            channelName,
            creater,
            token
        });
    },
    removeinviteRequest(destinationAccount, channelName) {
        return axios.post(`${baseURL}/user/parties/removeinviteRequest`, {
            destinationAccount,
            channelName
        });
    },
    sentInviteRequest(channelName, destinationAccount, token) {
        return axios.post(`${baseURL}/user/parties/sentinviteRequest`, {
            channelName,
            destinationAccount,
            token
        });
    },
};
