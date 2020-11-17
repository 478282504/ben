<template>
  <div>
    <el-table :data="specsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性" width="180">
        <template slot-scope="item">
          <div>
            <el-tag v-for="attrName in item.row.attrs" :key='attrName' type="info">{{attrName}}</el-tag>
          </div>
        </template>
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
            <el-button @click="diet(itemm.row.id)" type="info" plain
              >编辑</el-button
            >
            <el-button @click="del(itemm.row.id)" type="danger" plain
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页视图 -->
    <el-pagination :page-size='specsSize' background layout="prev, pager, next" :total="specsCount" @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getSpecsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount:'specs/getSpecsCount',
      specsSize:'specs/getSpecsSize'
    }),
  },
  mounted() {
    console.log(this.$store.getters,this.specsSize);
    this.getSpecsList();
    //加载总条数
    this.getSpecsCount()
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount:"user/getCountAction",
      changePage:"user/changePageAction"
    }),
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSpecsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSpecsList();
              this.getSpecsCount();
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