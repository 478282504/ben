<template>
  <div>
    <el-dialog
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item
          prop="phone"
          label="手机号"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>



        <el-form-item
          prop="nickname"
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
        <!-- <el-button @click="add('dialog')" type="primary" v-if="addInfo.isAdd"
          >添 加</el-button
        > -->
        <el-button @click="updata('dialog')" type="primary"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMemberInfo, getMemberEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import { indexList } from "../../router";
export default {
  data() {
    return {
      form: {
        phone: "",//手机号
        nickname: "", //昵称
        password: "",//密码
        status: 1,
      },
      rules: {
        phone: [
          { required: true, message: "请输入会员电话", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入会员名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 20 个字符", trigger: "blur" },
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
      memberList: "member/getMemberList",
    }),
  },
  methods: {
    //重置
    reset() {
      this.form = {
        phone: "",//手机号
        nickname: "", //昵称
        password: "",//密码
        status: 1,
      };
    },
    look(uid) {
      getMemberInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        } else {
          this.$message.success(res.data.list);
        }
      });
    },
    updata() {
      getMemberEdit(this.form).then((res) => {
        console.log(res, "响应成功");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //关闭弹窗
          this.cancel();
          //重新获取列表
          this.getMemberList()
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //刷新 重新触发这个函数
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    //取消事件关闭弹窗 修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //添加事件
    // add() {
    //   getUserAdd(this.form).then((res) => {
    //     console.log(res, "响应成功");
    //     if (res.data.code == 200) {
    //       this.$message.success(res.data.msg);
    //       //关闭弹窗
    //       this.cancel();
    //       //重新获取列表
    //       this.getUserList();
    //     } else {
    //       this.$message.error(res.data.msg);
    //     }
    //   });
    // },
    // changeMenu() {
    //   if (this.form.pid == 0) {
    //     this.form.type = 1;
    //   } else {
    //     this.form.type = 2;
    //   }
    // },
  },
};
</script>

<style lang="" scoped>
</style>