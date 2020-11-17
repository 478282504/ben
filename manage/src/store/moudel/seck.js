import { getSeckList } from '../../util/axios'

const state = {
    seckList: [],

}

const getters = {
    getSeckList() {
        return state.seckList
    },
}

const mutations = {
    NEW_SECKLIST(state, payload) {
        state.seckList = payload
    },
}

const actions = {
    getSeckListAction(context) {
        getSeckList()
            .then(res => {
                console.log(res, '响应数据');
                if (res.data.code == 200) {
                    context.commit('NEW_SECKLIST', res.data.list)
                }
            })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}