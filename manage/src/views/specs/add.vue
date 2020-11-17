<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加规格' : '修改规格'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item
          prop="specsname"
          label="规格名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="xiala"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="addAttr" type="danger">删除</el-button>
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
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
import { mapActions} from "vuex";
import { indexList } from "../../router";
export default {
  data() {
    return {
      //定义一个规格属性
      arrAttr: [
        {
          value: "",
        },
      ],

      form: {
        specsname: "", //上级分号默认0 顶级
        attrs: "",//规格属性
        status: 1,
      },
      rules: {
        specsname: [
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

  methods: {
    //添加 动态表单事件
    addAttr() {
      //判断数据最多6条
      if (this.arrAttr.length<= 6) {
        //往数组中添加数据
        this.arrAttr.push({
          value: "",
        });
      }else{
        this.$message.success('最多只能添加6条')
      }
      
    },
    //重置
    reset() {
      this.form = {
        specsname: "", //上级分号默认0 顶级
        attrs: "",
        status: 1,
      };
      //初始化动态循环表单
      this.arrAttr=[
        {
          value: "",
        },
      ]
    },
    look(id) {
      getSpecsInfo({ id }).then((res) => {
        if (res.data.code == 200) {

          let data = res.data.list[0];//先把整体的数据给到data这个变量里
          this.form = data            //在把这个变量里的数据给到form里
          data.attrs.map((item,index)=>{  //循环data里面attr的每一条属性
            if(index==0){                 //如果下标为0也就是新增表单
              this.arrAttr[0].value = item  //则把数组里的第一条数据给item
            }else{                          //否则就把item的每一条数据添加给这个对象的value
              this.arrAttr.push({
                value:item
              })
            }
          })
        } else {
          this.$message.success(res.data.list);
        }
      });
    },
    //编辑
    updata() {
      getSpecsEdit(this.form).then((res) => {
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
      getSpecsList: "specs/getSpecsListAction",
      getSpecsAction: "specs/getCountAction",
    }),
    //取消事件关闭弹窗 修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //添加事件
    add() {
      this.form.attrs = this.arrAttr.map(item=>item.value).join(',')
      getSpecsAdd(this.form).then((res) => {
        console.log(res, "响应成功");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //关闭弹窗
          this.cancel();
          //重新获取列表
          this.getSpecsList();
          //重新调取总条数
          this.getSpecsAction();
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
.xiala {
  width: 70%;
}
</style>