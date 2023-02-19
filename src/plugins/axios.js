import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';
axios.defaults.timeout = 6000;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
