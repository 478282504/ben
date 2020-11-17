import {getRoleList} from '../../util/axios'


const state ={
    roleList:[]
}

const getters ={
    getRoleList(){
        return state.roleList
    }
}

const mutations = {
    NEW_ROLELIST(state,payload){
        state.roleList=payload
    }
}

const actions = {
    getRoleAction({commit}){
        getRoleList()
        .then(res=>{
            if(res.data.code==200){
                commit('NEW_ROLELIST',res.data.list)
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}