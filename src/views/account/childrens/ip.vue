<template>
  <div id="ip">
    <el-dialog title="IP" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :append-to-body="true" :show-close="false" center>
      <p class="editPassword-tips">Enter the IP address of the server.Multiple addresses are separated by‘,'</p>
      <el-form :model="ipForm" label-position="left">
        <el-form-item>
          <el-input v-model="ipForm.ip" oninput="value=value.replace(/[^0-9:,，.]/g,'')" placeholder="11.12.121.1,12.122.1.1,21.12.21.12" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="confirm-btn"><el-button type="primary" :disabled="disabled" @click="saveIp">Save</el-button></div>
        <div class="cancel-btn"><el-button @click="dialogFormVisible = false">Cancel</el-button></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postSaveIp } from '@/api/account'

export default {
  name: "ip",
  props: {
    ipData: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      ipForm: {
        ip: ''
      },
      dialogFormVisible: false
    }
  },
  computed: {
    disabled() {
      if (this.ipForm.ip === '') {
        return true
      }
      return false
    }
  },
  methods: {
    // 展示初始化表单
    initializationForm() {
      this.dialogFormVisible = true
      this.ipForm = {
        ip: this.ipData
      }
    },
    // 修改ip
    saveIp() {
      let params = {}
      params = JSON.parse(JSON.stringify(this.ipForm))
      postSaveIp(params).then(res => {
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
  text-transform: capitalize;
  color: #333333;
  line-height: 20px;
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
