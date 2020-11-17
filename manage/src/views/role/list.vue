<template>
  <div>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
            <div>
              <el-tag v-if="item.row.status" type="success">启用</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
            </div>
          </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="itemm">
          <div>
              <el-button @click="edit(itemm.row.id)" type="info" plain>编辑</el-button>
              <el-button @click="del(itemm.row.id)" type="danger" plain>删除</el-button>
          </div>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助性函数
import {mapGetters,mapActions} from 'vuex'
//引入删除接口
import {getRoleDelete} from '../../util/axios'
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      roleList:'role/getRoleList'
    })
  },
  mounted() {
    //一加载就刷新
    this.getRoleAction()
  },
  methods: {
    //获取行动
    ...mapActions({
      getRoleAction:'role/getRoleAction'
    }),
    del(id){
      this.$confirm('确定要删除吗？？？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getRoleDelete({id})
          .then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              //重新调取接口
              this.getRoleAction()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
};
</script>

<style lang="">
</style>