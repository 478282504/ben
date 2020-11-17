import {getCateList} from '../../util/axios'

const state ={
    cateList:[]
}

const getters ={
    getCateList(){
        return state.cateList
    }
}

const mutations ={
    NEW_CATELIST(state,payload){
        state.cateList=payload
    }
}

const actions ={
    getCateListAction({commit}){
        getCateList({
            istree:true
        })
        .then(res=>{
            if(res.data.code==200){
                commit('NEW_CATELIST',res.data.list)
            }
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}