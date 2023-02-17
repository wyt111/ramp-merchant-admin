<template>
  <div class="login-container">
    <div class="login-left">
      <img src="@/assets/images/login-backgroundMap-left.png" alt="">
    </div>
    <div class="login-right">
      <div class="login-rightForm">
        <div class="title-logo">
          <img src="@/assets/images/achLogo.png" alt="">
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

          <div class="title-container">
            <h3 class="title">Sign In</h3>
          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <input v-model="loginForm.username" type="text">
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <input v-model="loginForm.password" :type="passwordType">
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <!-- <p class="enroll">No account?<span @click="nextApply"> Sign up</span></p> -->
          <el-button :loading="loading" type="primary" class="loginButton" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Sign In</el-button>

          <!-- <div class="tips">
            <span style="margin-right:20px;">username: admin</span>
            <span> password: any</span>
          </div> -->

        </el-form>

      </div>
      <div class="subscription-container">
        <p>IF you don’t have account,you can contract</p>
        <p>support@alchemytech.io</p>
      </div>
    </div>

    <!-- check Google 2FA -->
    <CheckGoogle2FA ref="CheckGoogle2FA_ref" :resultMethods="'loginToPath'"/>

  </div>
</template>

<script>
import CheckGoogle2FA from '@/views/account/childrens/checkGoogle2FA'
// import { login } from '../../api/user'
export default {
  name: 'Login',
  components: {
    CheckGoogle2FA
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Merchant is required'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password is required'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      setTimeout(() => {
        // this.$refs.password.focus()
      }, 200)
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            // 校验是否需要谷歌验证
            if (res.data.googleAuth) {
              this.$refs.CheckGoogle2FA_ref.initializationData()
              return
            }
            this.loginToPath()
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginToPath() {
      this.$message({
        type: 'success',
        message: 'Log in successfully'
      })
      this.$router.push({ path: this.redirect || '/' })
      this.loading = false
    },
    nextApply() {
      this.$router.push('/enroll')
      sessionStorage.setItem('vuex', JSON.stringify({}))
      sessionStorage.setItem('State', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#000;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.enroll{
 font-size: 16px;
  font-family:  SF  Pro;
  font-weight: 400;
  color: #5A6070;
  line-height: 19px;
  position: relative;
    top: -5px;
  span{
    color: #0193F2FF;
    cursor: pointer;

  }
}
.login-container {
  width: 100%;
  display: flex;
  height: 100%;
  min-height: 100%;
  background: linear-gradient(315deg, #3F53E8 0%, #4552E7 26%, #4F6BE3 60%, #4B7ADC 100%);
  overflow: hidden;
  .login-left{
    width: 50%;
    margin: 8% 0;
    z-index: 9;
     img{
      width: 115%;
      height: 100%;
      margin-left: 18%;
    }
  }
  .login-right{
    position: relative;
    width: 60%;
    margin-left: auto;
    height: 100%;
    background: url('../../assets/images/login-backgroundMap-right.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .login-rightForm{
    position: absolute;
      top: 12%;
      left: 40%;
      //max-width: 350px !important;
      overflow: hidden;
    .title-logo{
      width: 300px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title-font{
      font-size: 35px;
      font-weight: bold;
      font-family: RobotoLight;
      width: 300px;
      padding-top: 40px;
      color: #666666;
    }
  }
  .subscription-container{
      //width: 100%;
      position: absolute;
      bottom: 5%;
      left: 42%;
      font-size: 14px;
      font-family: RobotoLight;
      font-weight: 400;
      text-align: center;
      line-height: 10px;
      p:nth-of-type(1){
        color: #999999;
      }
      p:nth-of-type(2){
        color: #1164FF;
      }
    }
    input {
      width: 78%;
      background: transparent;
      border: 0;
      -webkit-appearance: none !important;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 35px;
      caret-color:#999;
      border: none !important;
      font-family: RobotoLight;
      outline: none;
      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px #fff inset !important;
        -webkit-text-fill-color: $light_gray !important;
      }
    }
   .el-input {
    display: inline-block;
    width: 85%;
     ::v-deep input {
      background: transparent;
      border: 0;
      -webkit-appearance: none !important;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 35px;
      caret-color:#999;
      border: none !important;
      font-family: RobotoLight;
      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px #fff inset !important;
        -webkit-text-fill-color: $light_gray !important;
      }
    }
  }

   .el-form-item {
    width: 90%;
    background: white;
    color: #454545;
    border-bottom: 1px solid #EAEAEA;
    margin-top: 15%;
  }
  .loginButton{
    width:90%;
    height: 50px;
    background: #1164FF;
    margin-bottom:30px;
    //margin-top: 50px;
    font-family: RobotoBold;
    margin-top: 20%;
    border-radius: 14px;
    border: none;
  }
}
</style>

<style lang="scss" scoped>
$bg:#1164FF;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 300px;
    max-width: 100%;
    padding: 60px 0px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #4B7ADC;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #666666;
      margin: 0px auto 40px auto;
      text-align: left;
      font-weight: bold;
      font-family: RobotoBold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
