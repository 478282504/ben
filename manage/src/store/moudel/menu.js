import {getMenuList} from '../../util/axios'

const state ={
    menuList:[]
}

const getters ={
    getMenuList(state){
        return  state.menuList
    }
}

const mutations ={
    GET_MENU(state,payload){
        state.menuList=payload
    }
}


const actions={
     getMenuListAction({commit}){
        getMenuList({istree:true})
        .then(res=>{
            console.log(res,'响应');
            if(res.data.code==200){
                console.log(res.data.list);
                commit('GET_MENU',res.data.list)

            }
        })
        .catch(err=>{
            console.log(err,'响应失败');
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