<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加活动名称' : '修改活动名称'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item
          prop="title"
          label="活动名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changefirst()"
          >
            <el-option :value="0" label="请选择" disabled></el-option>
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="changegoods"
          >
            <el-option :value="0" label="请选择" disabled></el-option>
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in second"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="goodsid" label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option :value="0" label="请选择" disabled></el-option>
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="add('dialog')" type="primary" v-if="addInfo.isAdd"
          >添 加</el-button
        >
        <el-button v-else @click="updata('dialog')" type="primary"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGoodList,
  getSeckInfo,
  getSeckEdit,
  getSeckAdd,
} from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import { indexList } from "../../router";
export default {
  data() {
    return {
      form: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: "请输入会员电话", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      timer: "", //日期
      indexList,
      roleid: [],
      second: [],
      goods: [],
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  mounted() {
    //减少对服务器的交互
    if (this.cateList.length == 0) {
      this.getCateListAction();
    }
  },
  methods: {
    //获取二级分类
    changefirst(n) {
      let index = this.cateList.findIndex(
        (item, i) => this.form.first_cateid == item.id
      );
      this.second = this.cateList[index].children;
      //清空二级双向数据绑定
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    //获取商品分类
    changegoods(n) {
      getGoodList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goods = res.data.list;
          if (!n) {
            this.form.goodsid = "";
          }
        }
      });
    },
    //重置
    reset() {
      this.form = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1,
      };
      this.timer = "";
    },
    look(id) {
      getSeckInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          console.log(this.form)
          this.form = res.data.list;
          this.form.id = id;
          this.timer = [new Date(parseFloat(this.form.begintime)),new Date(parseFloat(this.form.endtime))]
          //清空之前的双向数据绑定
          this.changefirst(true)
          this.changegoods(true)
        }
      });
    },
    updata() {
      getSeckEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
           //重新获取列表
          this.getSeckList();
          //关闭弹窗
          this.cancel();
          
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //刷新 重新触发这个函数
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
      getSeckList: "seck/getSeckListAction",
    }),
    //取消事件关闭弹窗 修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //确定开始结束时间
    changge(e) {
      console.log(e);
    },
    //添加事件
    add() {
      this.form.begintime = new Date(this.timer[0]).getTime();
      this.form.endtime = new Date(this.timer[1]).getTime();
      getSeckAdd(this.form).then((res) => {
        console.log(res, "响应成功");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //关闭弹窗
          this.cancel();
          //重新获取列表
          this.getSeckList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    changeMenu() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },
};
</script>

<style lang="" scoped>
.block {
  margin-left: 50px;
  margin-right: 10px;
}
</style>