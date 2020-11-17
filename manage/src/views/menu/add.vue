<template>
  <div>
    <el-dialog
      title="添加菜单"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item
          prop="title"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeMenu"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type === 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexList"
              :key="item.path"
              :label="item.name"
              :value="item.path"
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
        <el-button @click="add('dialog')" type="primary" v-if="addInfo.isAdd">添 加</el-button>
        <el-button @click="updata('dialog')" type="primary" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuAdd , getMenuInfo ,getMenueDit} from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import { indexList } from "../../router";
export default {
  data() {
    return {
      form: {
        name: "",
        pid: 0, //上级分号默认0 顶级
        icon: "", //图标
        type: 1, //类型1目录 2菜单
        url: "",
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        pid: [
          { required: true, message: "请选择上级菜单", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      indexList,
      iconList: [
        "el-icon-setting",
        "el-icon-s-order",
        "el-icon-s-grid",
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-s-goods"
      ],
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    //重置
    reset() {
      this.form = {
        name: "",
        pid: 0, //上级分号默认0 顶级
        icon: "", //图标
        type: 1, //类型1目录 2菜单
        url: "",
        status: 1,
      };
    },
    look(id){
      getMenuInfo({id})
      .then(res=>{
        if(res.data.code==200){
          this.form = res.data.list
          this.form.id = id
        }else{
          this.$message.success(res.data.list)
        }
      })
    },
    updata(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMenueDit(this.form).then((res) => {
            console.log(res, "响应成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹窗
              this.cancel();
              //重新获取列表
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //刷新 重新触发这个函数
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    //取消事件关闭弹窗 修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //添加事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMenuAdd(this.form).then((res) => {
            console.log(res, "响应成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹窗
              this.cancel();
              //重新获取列表
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
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
</style>