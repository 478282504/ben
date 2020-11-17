<template>
  <div>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="uid" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>
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
            <el-button @click="diet(itemm.row.uid)" type="info" plain
              >编辑</el-button
            >
            <el-button @click="del(itemm.row.uid)" type="danger" plain
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页视图 -->
    <el-pagination :page-size='userSize' background layout="prev, pager, next" :total="userCount" @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getUserDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userCount:'user/getUserCount',
      userSize:'user/getUserSize'
    }),
  },
  mounted() {
    console.log(this.$store.getters,this.userSize);
    this.getUserList();
    //加载总条数
    this.getUserCount()
  },
  methods: {
    ...mapActions({
      getUserList: "user/getUserListAction",
      getUserCount:"user/getCountAction",
      changePage:"user/changePageAction"
    }),
    del(uid) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getUserDelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getUserList();
              this.getUserCount();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    diet(id) {
      this.$emit("deit", id);
    },
    //封装一个切换页码的事件
    currentChange(e){
      this.changePage(e)
    }
  },
};
</script>

<style lang="" scoped>
.el-pagination{
  float: right;
  margin: 20px 20px 0 0  
}
</style>