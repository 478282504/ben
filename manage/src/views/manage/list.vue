<template>
  <div>
    <el-table :data="goodList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180">
      </el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="item">
          <div>
            <img class="ben" :src="$imgUrl+item.row.img" alt="">
          </div>
        </template>
        </el-table-column>
        <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew==1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot==1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
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
    <el-pagination :page-size='goodSize' background layout="prev, pager, next" :total="goodCount" @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getGoodDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodList: "manage/getGoodList",
      goodCount:'manage/getGoodCount',
      goodSize:'manage/getGoodSize'
    }),
  },
  mounted() {
    this.getGoodList();
    //加载总条数
    this.getGoodCount()
  },
  methods: {
    ...mapActions({
      getGoodList: "manage/getGoodListAction",
      getGoodCount:"manage/getCountAction",
      changePage:"manage/changePageAction"
    }),
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getGoodDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getGoodList();
              this.getGoodCount();
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
.ben{
  width: 100px;
  height: 100px;
}
</style>