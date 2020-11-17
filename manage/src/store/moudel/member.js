import { getMemberList } from '../../util/axios'

const state = {
    memberList: [],

}

const getters = {
    getMemberList() {
        return state.memberList
    },
}

const mutations = {
    NEW_MEMBERLIST(state, payload) {
        state.memberList = payload
    },
}

const actions = {
    getMemberListAction(context) {
        getMemberList()
            .then(res => {
                console.log(res, '响应数据');
                if (res.data.code == 200) {
                    context.commit('NEW_MEMBERLIST', res.data.list)
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