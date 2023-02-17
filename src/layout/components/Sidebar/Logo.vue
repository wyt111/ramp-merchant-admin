<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <div v-if="sidebar.opened" class="sidebar_log">
        <div class="sidebar_log-top">
          <img src="../../../assets/logos/Merchant.svg" alt="">
          <div class="userNameTitle">
            <p>{{ name.merchantNo }}</p>
            <p>{{ name.merchantName?name.merchantName:'None' }}</p>
          </div>
          <img src="../../../assets/logos/ic_logout.png" alt="" @click="logout">
        </div>
        <img src="../../../assets/logos/border_Bottom.png" alt="">
      </div>
      <div v-else class="sidebar_log1">
        <img src="../../../assets/logos/Merchant.svg" alt="">
        <img src="../../../assets/logos/ic_logout.png" alt="" @click="logout">
      </div>

      <!-- <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link> -->

    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  props: {
    // collapse: {
    //   type: Boolean,
    //   required: true
    // }
  },
  data() {
    return {
      title: 'Vue Admin Template',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  methods: {
    async logout() {
      this.$confirm('Are you sure you want to quit?', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        // console.log(this.$route.fullPath)
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        this.$message({
          type: 'success',
          message: 'Exit success!'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 150px;
  line-height: 50px;
  // background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  margin-top: 40px;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
.sidebar_log{
  font-size: 20px;
  color: #fff;
  text-align: left;
  padding: 20px;
  .sidebar_log-top{
    // padding: 0 80px 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    img:nth-of-type(1){
        // width: 60px;
        height: 60px;
        margin-right: 10px;
      }
       img:nth-of-type(2){
        // width: 60px;
        // height: 60px;
        cursor: pointer;
      }
    div{
      width: 150px;
      height: 80px;
      margin-right: 10px;
      p{
        max-width: 200px;
        text-align: left;
        height: 35px;
        font-size: 15px;
        // margin-bottom: 10px;
        font-family: RobotoLight;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p:first-child{
        margin-top: 10px;
      }
    }
  }
  >img{
    width: calc(100% - 20px);
    height: 2px;
  }
}
.sidebar_log1{
  text-align: center;
  padding: 0;
  img:first-child{
    width: 60px;
  }
  img:last-child{
    // width: 60px;
    cursor: pointer;
  }
}
</style>
