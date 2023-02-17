<template>
  <div id="Account">
    <div class="account-content">
      <div class="account-content-view">
        <p class="account-content-view-title">Account</p>
        <div class="view-content">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark form-line">
                <p class="form-line-title">Merchant Number</p>
                <div class="form-line-input">
                  <el-input
                    v-model="accountDetail.merchantNo"
                    :disabled="true">
                  </el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark form-line">
                <p class="form-line-title form-line-right-title">Password</p>
                <div class="form-line-input">
                  <el-input
                    placeholder="**********"
                    :disabled="true">
                  </el-input>
                  <p class="editPassword-btn" @click="handleOperation('editPassword')">Edit</p>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark form-line">
                <p class="form-line-title">Google Authenticator</p>
                <div class="form-line-input">
                  <el-input
                    :placeholder="accountDetail.googleAuth ? 'Bound' : 'Unbound'"
                    :disabled="true">
                  </el-input>
                  <p class="editPassword-btn" @click="bindGoogle">{{ accountDetail.googleAuth ? 'Edit' : 'Bound' }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- API management -->
      <p class="account-content-view-title last-account-content-view-title">API Management</p>
      <div class="view-content">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple-dark form-line">
              <p class="form-line-title">AppID</p>
              <div class="form-line-input">
                <el-input
                  v-model="accountDetail.appId"
                  :disabled="true">
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark form-line">
              <p class="form-line-title form-line-right-title">AppSecret</p>
              <div class="form-line-input">
                <el-input
                  v-model="accountDetail.appSecrete"
                  :disabled="true">
                </el-input>
                <p class="editPassword-btn" @click="handleOperation('refreshAppsecret')">Refrseh</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple-dark form-line">
              <p class="form-line-title">IP</p>
              <div class="form-line-input">
                <el-input
                  v-model="accountDetail.ipConfig"
                  :disabled="true">
                </el-input>
                <p class="editPassword-btn" @click="handleOperation('editIp')">Edit</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- Edit Password Dialog -->
      <EditPassword ref="EditPassword_ref"/>
      <!-- Refresh Appsecret Dialog -->
      <RefreshAppsecret ref="RefreshAppsecret_ref"/>
      <!-- Save IP -->
      <Ip ref="Ip_ref" :ipData="accountDetail.ipConfig"/>
      <!-- binding Google Authenticator -->
      <BindGoogleAuthenticator ref="BindGoogleAuthenticator_ref"/>
      <!-- check Google 2FA -->
      <CheckGoogle2FA ref="CheckGoogle2FA_ref" :resultMethods="checkCodeToMethod"/>

    </div>
  </div>
</template>

<script>
import EditPassword from './childrens/editPassword'
import BindGoogleAuthenticator from './childrens/bindGoogleAuthenticator'
import RefreshAppsecret from './childrens/refreshAppsecret'
import Ip from './childrens/ip'
import CheckGoogle2FA from './childrens/checkGoogle2FA'
import {getAccountDetail, getFreezeCheck} from '@/api/account'

export default {
  name: "Account",
  components: {
    EditPassword,
    BindGoogleAuthenticator,
    RefreshAppsecret,
    Ip,
    CheckGoogle2FA
  },
  data() {
    return {
      accountDetail: {},
      checkCodeToMethod: ''
    }
  },
  mounted() {
    this.queryAccountDetail()
  },
  methods: {
    // 账户详情信息
    queryAccountDetail() {
      getAccountDetail().then(res => {
        if (res.returnCode === '0000') {
          this.accountDetail = res.data
        }
      })
    },
    // 账户冻结检查
    async freezeStatusCheck() {
      await getFreezeCheck().then(res => {
        if (res.returnCode === '0000') {
          return true
        }
        return false
      }).catch(() => {
        return false
      })
    },
    // 绑定google账号
    async bindGoogle() {
      // 首次绑定
      if (!this.accountDetail.googleAuth) {
        var state = await this.freezeStatusCheck
        if (!state) return
        this.$refs.BindGoogleAuthenticator_ref.initializationData()
        return
      }
      // 换绑 - 先验证code再绑定
      this.$refs.CheckGoogle2FA_ref.initializationData()
      this.checkCodeToMethod = 'saveBindGoogle'
    },
    // 换绑重新调用扫码输入code组件
    saveBindGoogle() {
      this.$refs.BindGoogleAuthenticator_ref.initializationData()
    },
    async handleOperation(name) {
      if (this.accountDetail.googleAuth) {
        var state = await this.freezeStatusCheck
        if (!state) return
        this.$refs.CheckGoogle2FA_ref.initializationData()
        this.checkCodeToMethod = name
        return
      }
      this[name]()
    },
    // 修改密码
    editPassword() {
      this.$refs.EditPassword_ref.initializationForm()
    },
    // 修改ip
    editIp() {
      this.$refs.Ip_ref.initializationForm()
    },
    // 刷新Appsecret
    refreshAppsecret() {
      this.$refs.RefreshAppsecret_ref.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
#Account {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  background: #F4F7FE;
  padding: 0 30px 0;
  .account-content {
    width: 100%;
    height: 88%;
    background: #FFFFFF;
    box-shadow: 0 0 20px 0 rgba(177, 202, 239, 0.5);
    border-radius: 20px;
    position: relative;
    z-index: 1;
    top: 10px;
    padding: 40px 50px 0;
    .account-content-view-title{
      font-family: RobotoBold;
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      text-transform: capitalize;
      margin: 0;
      color: #123077;
    }
    .last-account-content-view-title{
      margin-top: 40px;
    }
    .form-line{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 20px;
      .form-line-title{
        font-family: 'SF Pro';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        text-transform: capitalize;
        color: #333333;
        width: 190px;
      }
      .form-line-right-title{
        text-align: right;
      }
      .form-line-input{
        margin-left: 26px;
        width: 100%;
        position: relative;
        .editPassword-btn{
          position: absolute;
          right: 0;
          top: 0;
          height: 40px;
          cursor: pointer;
          font-family: 'SF Pro';
          font-style: normal;
          font-weight: 510;
          font-size: 12px;
          text-align: center;
          line-height: 40px;
          color: #40A1FB;
          margin: 0;
          padding: 0 16px;
        }
      }
    }
  }
}

.form-line-input ::v-deep .el-input__inner{
  height: 40px;
  border: none;
  border-radius: 2px;
  background: #F8FAFD;
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #A7A7A7;
  padding-right: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

//对话框样式
::v-deep .el-dialog{
  background: #FFFFFF;
  box-shadow: 0 0 30px rgba(54, 81, 100, 0.4);
  border-radius: 15px;
  padding: 40px;
}
::v-deep .el-dialog__title{
  font-family: RobotoBold;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-transform: capitalize;
  color: #123077;
}
::v-deep .el-dialog__header{
  padding: 0;
}
::v-deep .el-dialog__footer{
  padding: 40px 0 0;
}
::v-deep .el-dialog__body{
  padding: 0;
}
</style>
