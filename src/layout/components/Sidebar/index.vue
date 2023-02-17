<template>
  <div id="scrollbar-container" :class="{'has-logo':showLogo}">

    <el-scrollbar wrap-class="scrollbar-wrapper" class="el-scrollbar-content">
      <Logo />
      <el-menu
        :default-active="activeMenu"
        background-color="transparent"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <div v-if="isCollapse" class="logo1">
        <img src="@/assets/logos/solo.png" alt="">
      </div>
      <div v-else class="logo">
        <img src="@/assets/logos/solo.png" alt="">
        <img src="@/assets/logos/solo1.png" alt="">
      </div>
    </el-scrollbar>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      sidebarOpen: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      // console.log(meta)
      if (route.name.includes('Ability')) {
        return '/ability/index'
      }
      if (route.name.includes('Application')) {
        return '/Application'
      }
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
// #scrollbar-container{
//   padding-top: 200px;
// }
#scrollbar-container ::v-deep .el-scrollbar__view{
  // margin-top: 200px;
}
/* hover style    element */
#scrollbar-container ::v-deep .el-menu-item{
  width: 90%;
  transition: .3s;
  background: #FFFFFF;
  border-radius: 0 30px 30px 0;
  margin-top: 20px;
  font-family: RobotoBold;
  font-size: 16px;
  // display: flex;
  // align-items: center;
  color: #fff;
  img:nth-of-type(1){
      width: 30px;
      height: 30px;
      color: #40A1FB !important;
      font-size: 22px;
      float: left;
      margin: 12px 20px 0 0;
    }
    img:nth-of-type(2){
      color: #40A1FB !important;
      float: right;
      margin-top: 20px;
      font-size: 20px;
    }
}
/* click select style */
#scrollbar-container ::v-deep .is-active{
  /* width: 270px; */
  background-color: #FFFFFF !important;
  box-shadow: 0px 10px 10px #185BDD;
  border-radius: 0 30px 30px 0px;
  margin-left: 0px;
  transition: .2s;
  font-family: RobotoBold;
  color: #123077;
  font-size: 16px;
  .svg-icon:nth-of-type(1){
      color: #0D45D4 !important;
    }
  .svg-icon:nth-of-type(2){
    color: #0D45D4 !important;
  }
}
#scrollbar-container ::v-deep.el-menu-item:hover{
  outline: 0 !important;
  background: #fff !important;
  opacity: .7;
  color: #0D45D4;
  // color: #409EFF !important;
}

.scrollbar-wrapper{

  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    // margin: 30px 0 50px 0;
    position: absolute;
    bottom: 40px;
    // left: 10%;
    padding-left: 20%;
    img:first-child{
      width: 28px;
      height: 25px;
    }
    img:last-child{
      width: 123px;
      height: 20px;
      margin: 5px 0 0 5px;
    }
  }
  .logo1{
    position: absolute;
    bottom: 20px;
    left: 25%;
    img{
      width: 30px;
    }
  }
  // .scrollbar-item{
  //  background-color:transparent;
  // }
}
</style>
