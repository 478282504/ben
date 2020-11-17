<template>
  <div>
    <el-table :data="memberList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
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
          </div>
        </template>
      </el-table-column>
    </el-table>
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
      memberList: "member/getMemberList",
    }),
  },
  mounted() {
    this.getMemberList();
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    // del(uid) {
    //   this.$confirm("你确定要删除吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       getUserDelete({ uid }).then((res) => {
    //         if (res.data.code == 200) {
    //           this.$message.success(res.data.msg);
    //           this.getUserList();
    //           this.getUserCount();
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
    diet(id) {
      this.$emit("deit", id);
    },
  },
};
</script>

<style lang="" scoped>
.el-pagination{
  float: right;
  margin: 20px 20px 0 0  
}
</style>