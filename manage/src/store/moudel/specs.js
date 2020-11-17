import { getSpecsList, getSpecsCount } from '../../util/axios'

const state = {
    specsList: [],
    size: 2,//每个组件渲染的条数
    page: 1,//页码
    total: 0//总条数

}

const getters = {
    getSpecsList() {
        return state.specsList
    },
    getSpecsCount() {
        return state.total
    },
    getSpecsSize() {
        return state.size
    },
}

const mutations = {
    NEW_SPECSLIST(state, payload) {
        state.specsList = payload
    },
    //修改state中的total总条数
    NEW_COUNT(state, payload) {
        state.total = payload
    },
    NEW_CHANGEPAGE(state,payload){
        state.page=payload
    }
}

const actions = {
    getSpecsListAction(context) {
        getSpecsList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                console.log(res, '响应数据');
                if (res.data.code == 200) {
                    context.commit('NEW_SPECSLIST', res.data.list)
                }
            })
    },
    //封装获取总条数
    getCountAction({ commit }) {
        getSpecsCount()
            .then(res => {
                if (res.data.code == 200) {
                    commit('NEW_COUNT', res.data.list[0].total)
                }
            })
    },
    //封装一个修改page的action
    changePageAction(context,payload){
        context.commit('NEW_CHANGEPAGE',payload)
        context.dispatch('getSpecsListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}