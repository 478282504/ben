<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item
          prop="roleid"
          label="所属角色"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button @click="updata('dialog')" type="primary" v-else
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import { indexList } from "../../router";
export default {
  data() {
    return {
      form: {
        roleid: "",
        username: "", //上级分号默认0 顶级
        password: "",
        status: 1,
      },
      rules: {
        username: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      indexList,
      roleid: [],
    };
  },
  props: ["addInfo"],
  computed: {
    //获取角色列表
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.getRoleList();
    }
  },
  methods: {
    //重置
    reset() {
      this.form = {
        roleid: "",
        username: "", //上级分号默认0 顶级
        password: "",
        status: 1,
      };
    },
    look(uid) {
      getUserInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        } else {
          this.$message.success(res.data.list);
        }
      });
    },
    updata() {
      getUserEdit(this.form).then((res) => {
        console.log(res, "响应成功");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //关闭弹窗
          this.cancel();
          //重新获取列表
          this.getRoleList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //刷新 重新触发这个函数
    ...mapActions({
      getRoleList: "role/getRoleAction",
      getUserList: "user/getUserListAction",
      getUserAction: "user/getCountAction",
    }),
    //取消事件关闭弹窗 修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //添加事件
    add() {
      getUserAdd(this.form).then((res) => {
        console.log(res, "响应成功");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //关闭弹窗
          this.cancel();
          //重新获取列表
          this.getUserList();
          //重新调取总条数
          this.getUserAction();
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
</style>