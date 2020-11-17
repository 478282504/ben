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
        <el-form-item
          prop="title"
          label="标题"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
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
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import { indexList } from "../../router";
export default {
  data() {
    return {
      form: {
        title: "", //轮播图名称
        img: 1, //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
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
      bannerList: "banner/getBannerList",
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
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    //重置
    reset() {
      this.form = {
        title: "", //轮播图名称
        img: 1, //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
    },
    look(id) {
      getBannerInfo({ id }).then((res) => {
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
      getBannerList: "banner/getBannerListAction",
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
          getBannerAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹窗
              this.cancel();
              //重新获取列表
              this.getBannerList();
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

          getBannerEdit(file).then((res) => {
            console.log(res, "响应成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹窗
              this.cancel();
              //重新获取列表
              this.getBannerList();
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
      if (this.form.id == 0) {
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