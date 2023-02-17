<template>
  <div id="refreshAppsecret">
    <el-dialog title="Refresh Appsecret" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :append-to-body="true" :show-close="false" center>
      <p class="tips">
        Are you sure to refresh?You need to update the appsecret in your
        application after refreshing
      </p>
      <div slot="footer" class="dialog-footer">
        <div class="confirm-btn"><el-button type="primary" @click="confirm">Confirm</el-button></div>
        <div class="cancel-btn"><el-button @click="dialogFormVisible = false">Cancel</el-button></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postRefreshAppSecret } from '@/api/account'

export default {
  name: 'refreshAppsecret',
  data() {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    confirm() {
      postRefreshAppSecret({}).then(res => {
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
.dialog-footer{
  display: flex;
  align-items: center;
}
.tips{
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-transform: capitalize;
  color: #333333;
  margin: 20px 0 0;
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
