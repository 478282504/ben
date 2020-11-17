import {getBannerList} from '../../util/axios'

const state ={
    bannerList:[]
}

const getters ={
    getBannerList(){
        console.log(state.bannerList);
        return state.bannerList
    }
}

const mutations ={
    NEW_BANNERLIST(state,payload){
        state.bannerList=payload
    }
}

const actions ={
    getBannerListAction({commit}){
        getBannerList()
        .then(res=>{
            if(res.data.code==200){
                commit('NEW_BANNERLIST',res.data.list)
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