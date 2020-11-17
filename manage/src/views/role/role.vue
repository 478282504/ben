<template>
    <div>
        <!-- 面包屑 -->
        <v-break></v-break>
        <!-- 添加按钮 -->
        <el-button type="primary" size="small" @click="open">添加</el-button>

        <va-list @edit="edit"></va-list>
        <!-- 弹窗事件 -->
        <v-addd ref="dialog" :addInfo='addInfo' @cencel="cencel"></v-addd>
    </div>
</template>

<script>
import vBreak from '../../components/el-break'
import vaList from './list'
import vAddd from  './add'
export default {
    data() {
        return {
            addInfo:{
                isShow:false,
                isAdd:true
            }
        }
    },
    components:{
        vBreak,
        vaList,
        vAddd
    },
    methods: {
        //打开弹窗
        open(){
            this.addInfo.isShow=true
            this.addInfo.isAdd =true
        },
        cencel(e){
            this.addInfo.isShow=e
        },
        edit(e){
            this.addInfo.isShow=true
            this.addInfo.isAdd =false
            this.$refs.dialog.look(e)
        }
    },
}
</script>

<style lang="" scoped>
.el-button{
    margin-bottom: 20px;
}
</style>