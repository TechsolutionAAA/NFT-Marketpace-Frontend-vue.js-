import axios from 'axios';

export default {
    userSignUp(id, body) {
        return axios.get(`/user/sign-up/${id}/${body}`);
    },
};
