<template>
  <!-- Edit Password Dialog -->
  <div id="editPassword">
    <el-dialog title="Edit Password" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :append-to-body="true" :show-close="false" center>
      <p class="editPassword-tips">The new password must consist of more than 6 numbers or letters.</p>
      <el-form :model="passwordForm" label-position="left">
        <el-form-item label="Origin Password" label-width="130px">
          <el-input v-model="passwordForm.rawPassword" oninput="value=value.replace(/[^0-9a-zA-Z]/g,'')" maxLength="12" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="New Password" label-width="130px">
          <el-input v-model="passwordForm.newPassword" oninput="value=value.replace(/[^0-9a-zA-Z]/g,'')" maxLength="12" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" label-width="130px">
          <el-input v-model="passwordForm.newPassword_confirm" oninput="value=value.replace(/[^0-9a-zA-Z]/g,'')" maxLength="12" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="confirm-btn"><el-button type="primary" :disabled="disabled" @click="editPassword">Confirm</el-button></div>
        <div class="cancel-btn"><el-button @click="dialogFormVisible = false">Cancel</el-button></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postEditPassword } from '@/api/account'

export default {
  name: "editPassword",
  data() {
    return {
      passwordForm: {
        // 原密码
        rawPassword: '',
        // 新密码
        newPassword: '',
        // 确认新密码
        newPassword_confirm: ''
      },
      dialogFormVisible: false
    }
  },
  computed: {
    disabled() {
      if (this.passwordForm.rawPassword === '' || this.passwordForm.newPassword === '' || this.passwordForm.newPassword_confirm === '' ||
        this.passwordForm.newPassword.length < 6 || this.passwordForm.newPassword_confirm.length < 6) {
        return true
      }
      return false
    }
  },
  methods: {
    // 展示初始化表单
    initializationForm() {
      this.dialogFormVisible = true
      this.passwordForm = {
        // 原密码
        rawPassword: '',
        // 新密码
        newPassword: '',
        // 确认新密码
        newPassword_confirm: ''
      }
    },
    // 修改密码
    editPassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.newPassword_confirm) {
        this.$message({
          type: 'error',
          message: 'The passwords entered two times are inconsistent'
        })
        return
      }
      if (this.passwordForm.rawPassword === this.passwordForm.newPassword_confirm) {
        this.$message({
          type: 'error',
          message: 'The new password cannot be the same as the original password'
        })
        return
      }
      let params = {}
      params = JSON.parse(JSON.stringify(this.passwordForm))
      delete params.newPassword_confirm
      postEditPassword(params).then(res => {
        if (res.returnCode === '0000') {
          this.dialogFormVisible = false
          this.$parent.queryAccountDetail()
          this.$message({
            type: 'success',
            message: res.returnMsg
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editPassword-tips{
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-transform: capitalize;
  color: #333333;
  text-align: center;
  margin: 20px 0 0 0;
}
.dialog-footer{
  display: flex;
  align-items: center;
}

//对话框样式
::v-deep .el-dialog{
  margin: 15% auto !important;
  width: 480px;
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

//表单样式
#editPassword ::v-deep .el-input__inner{
  height: 40px;
  border: 1px solid #E8EAEE;
  border-radius: 4px;
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #A7A7A7;
}
::v-deep .el-form-item__label{
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-transform: capitalize;
  color: #333333;
}
::v-deep .el-form-item{
  margin-bottom: 0 !important;
  margin-top: 20px !important;
}

//确认取消按钮
.confirm-btn{
  width: 100%;
}
.cancel-btn{
  width: 30%;
  margin-left: 10px;
}
.confirm-btn ::v-deep .el-button--primary{
  width: 100%;
  height: 40px;
  border-radius: 6px;
  font-family: RobotoBold;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: #FFFFFF;
  background: #40A1FB;
  border: none;
}
.confirm-btn ::v-deep .is-disabled{
  background: #40A1FB;
  opacity: 0.25;
  border-radius: 6px;
}

.cancel-btn ::v-deep .el-button{
  width: 100%;
  height: 40px;
  border: 1px solid #E8EAEE;
  border-radius: 6px;
  font-family: RobotoBold;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: #5A6070;
}
</style>
