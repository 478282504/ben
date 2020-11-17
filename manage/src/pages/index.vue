<template>
  <div>
    <el-container>
      <el-header>
        XXX大型后台管理项目
        <div v-if="getuserInfo" class="userInfo">
          欢迎 {{ getuserInfo.username }} 登录本系统
          <el-button @click="changeu" type="danger" size="small">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import vNav from "../components/nav";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getuserInfo"]),
  },
  components: {
    vNav,
  },
  methods: {
    ...mapActions(["getuserInfoAction"]),
    changeu() {
      this.getuserInfoAction(null);
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header
    background $thirdBgColor
    font-size 20px
.userInfo
  float right
</style>