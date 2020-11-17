<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="addInfo.isShow"
      center
    >
      <el-form :model="form" before-close="cencel" :rules="rules">
        <el-form-item
          prop="rolename"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            check-strictly
            highlight-current
            :props="{
              children: 'children',
              label: 'title',
            }"
            
          >
          </el-tree>
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
        <el-button @click="cencel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add" type="primary"
          >添 加</el-button
        >
        <el-button @click="updata" v-else  type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  data() {
    return {
      //表单对象
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      //label宽度
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  //父传子
  props: ["addInfo"],

  mounted() {
    //减少对服务器的交互
    if (this.menuList.length == 0) {
      this.getMenuListAction();
    }
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    cencel() {
      this.$emit("cencel", false);
      this.reset();
    },
    ...mapActions({
      getMenuListAction: "menu/getMenuListAction",
      getRoleList: "role/getRoleAction",
    }),
    add() {
      this.form.menus =this.$refs.tree.getCheckedKeys().join(',')
      //调取添加接口
      getRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleList();
          this.cencel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id){
      getRoleInfo({id})
      .then(res=>{
        if(res.data.code==200){
          this.form=res.data.list
          this.form.menus = this.$refs.tree.setCheckedKeys(this.form.menus.split(','))
          this.form.id=id
        }
      })
    },
    updata() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(',')
      //调取添加接口
      getRoleEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleList();
          this.cencel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>
<style lang="">
</style>