import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

import menu from './moudel/menu'
import role from './moudel/role'
import user from './moudel/user'
import cate from './moudel/cate'
import specs from './moudel/specs'
import manage from './moudel/manage'
import member from './moudel/member'
import banner from './moudel/banner'
import seck from './moudel/seck'

export default new Vuex.Store({
    state: {
        // userInfo: null
        userInfo:sessionStorage.getItem('userInfo')? JSON.parse(sessionStorage.getItem('userInfo')):null
    },
    getters: {
        getuserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        NEW_USERINFO(state, payload) {
            state.userInfo = payload
            //如果这个payload的有值我们就存到本地存储，否则就删除本地存储。
            if(payload){
                sessionStorage.setItem('userInfo',JSON.stringify(payload))
            }else{
                sessionStorage.removeItem('userInfo')
            }
        }
    },
    actions: {
        getuserInfoAction({ commit }, payload) {
            commit('NEW_USERINFO', payload)
        }
    },
    modules: {
        menu,
        role,
        user,
        cate,
        specs,
        manage,
        member,
        banner,
        seck
    }
})