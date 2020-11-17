<template>
  <div>
    <!-- on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 -->
    <el-dialog
      title="添加菜单"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialog">
        <el-form-item prop="pid" label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option :value="0" label="顶级分类"></el-option>
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
          prop="catename"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="title" label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onchange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onexceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import { indexList } from "../../router";
export default {
  data() {
    return {
      form: {
        pid: "", //上级分类编号
        catename: "", //商品分类名称
        img: 1, //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片的地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "",
      fileList: [],
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    //触发图片
    onchange(file) {
      this.imgUrl = file.raw;
    },
    //图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片移除
    onRemove(file, fileList) {},
    onexceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //重置
    reset() {
      this.form = {
        pid: "", //上级分类编号
        catename: "", //商品分类名称
        img: 1, //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
      this.fileList = [];
    },
    look(id) {
      getCateInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          //把图片格式进行转换
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
          console.log(this.fileList);
        } else {
          this.$message.success(res.data.list);
        }
      });
    },

    //刷新 重新触发这个函数
    ...mapActions({
      getCateList: "cate/getCateListAction",
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
          //把普通表单改成FormData
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //添加img参数
          file.append("img", this.imgUrl);

          //调取添加接口
          getCateAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹窗
              this.cancel();
              //重新获取列表
              this.getCateList();
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
    //编辑事件
    updata(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);

          getCateEdit(file).then((res) => {
            console.log(res, "响应成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹窗
              this.cancel();
              //重新获取列表
              this.getCateList();
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