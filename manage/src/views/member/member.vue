<template>
  <div>
    <v-break></v-break>

  <el-button type="primary" size="small" @click="isAdd">添加</el-button>
    <tab-list @deit='deit'></tab-list>
    <v-diab @cancel="cancel" :addInfo='addInfo' ref="dialog"></v-diab>

  </div>
</template>

<script>
import vBreak from '../../components/el-break'
import tabList from './list'
import vDiab from './add'
export default {
  data() {
    return {
        addInfo:{
          isShow:false,
          isAdd:true
        }
    };
  },
  components:{
      vBreak,
      tabList,
      vDiab
  },
methods: {
    isAdd(){
        this.addInfo.isShow=true
        this.addInfo.isAdd=true
    },
    cancel(e){
        this.addInfo.isShow=e
    },
    deit(e){
      this.addInfo.isShow=true
      this.addInfo.isAdd=false

      this.$refs.dialog.look(e)
    },
},
};
</script>

<style lang="" scoped>
</style>