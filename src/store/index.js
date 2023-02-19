import {createStore} from 'vuex'
import auth from '@/store/modules/auth'

export const store = createStore({
    modules: {
        auth
    }
});
