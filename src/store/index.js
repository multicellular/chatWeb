import Vue from 'vue'
import Vuex from 'vuex'
import chat from './modules/chat'
import home from './modules/home'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        chat,
        home,
        user
    },
    getters
})

export default store