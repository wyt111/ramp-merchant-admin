<template>
  <div id="bindGoogleAuthenticator">
    <el-dialog title="2FA" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :append-to-body="true" :show-close="false" center>
      <!-- 关闭按钮 -->
      <p class="close-btn" @click="closeDialog"><img src="@/assets/images/dialogCloseIcon.png" alt=""></p>
      <div class="qrCode" ref="qrCodeUrl_ref"></div>
      <div class="codeInputs">
        <p v-for="(item,index) in codeInputs" :key="index">
          <input type="text"
                 v-model="item.value"
                 :class="index===inputFocus?'active':''"
                 @input="codeInputsChange(index)"
                 @focus="codeInputsFocus(index)"
                 @keydown.delete="codeInputsDelete(index)"
                 maxlength="1"
                 :ref="'input_ref'+index"
          />
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postBindGoogle, getBindGoogleInfo } from '@/api/account'
import QRCode from 'qrcodejs2'

export default {
  name: 'bindGoogleAuthenticator',
  data() {
    return {
      dialogFormVisible: false,
      codeInputs: [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' }
      ],
      inputFocus: 0,
      newCode: null
    }
  },
  mounted() {},
  destroyed() {
  },
  methods: {
    initializationData() {
      this.dialogFormVisible = true
      this.querybindInfo()
      this.codeInputs = [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' }
      ]
      this.inputFocus = 0
      this.$nextTick(() => {
        this.$refs['input_ref0'][0].focus()
      })
    },
    closeDialog() {
      this.$refs.qrCodeUrl_ref.innerHTML = ''
      this.dialogFormVisible = false
    },
    // 获取绑定信息
    querybindInfo() {
      getBindGoogleInfo().then(res => {
        if (res.returnCode === '0000') {
          this.generateQRcode(res.data.googleAuthUrl)
        }
      })
    },
    // 生成二维码
    generateQRcode(url) {
      this.$nextTick(() => {
        this.newCode = new QRCode(this.$refs.qrCodeUrl_ref, {
          text: url,
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: 3
        })
      })
    },
    // 请求绑定
    toBind() {
      let authCode = ''
      this.codeInputs.forEach(item => {
        authCode = authCode + item.value
      })
      let params = {}
      params = {
        authCode: authCode
      }
      postBindGoogle(params).then(res => {
        if (res.returnCode === '0000') {
          this.closeDialog()
          this.$parent.queryAccountDetail()
          this.$message({
            type: 'success',
            message: res.returnMsg
          })
          return
        }
        this.codeInputs = [
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' }
        ]
        this.inputFocus = 0
        this.$nextTick(() => {
          this.$refs['input_ref0'][0].focus()
        })
        // 超过三次关闭对话框 一小时后重试
        if (res.returnCode === '30010') {
          this.closeDialog()
        }
      }).catch(() => {
        this.codeInputs = [
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' }
        ]
        this.inputFocus = 0
        this.$nextTick(() => {
          this.$refs['input_ref0'][0].focus()
        })
      })
    },
    // input聚焦
    codeInputsFocus(index) {
      this.inputFocus = index
      let inputIndex = 0
      inputIndex = this.codeInputs.findIndex(val => { return val.value === '' })
      if (inputIndex === -1) {
        this.$refs[`input_ref5`][0].focus()
        return
      }
      this.$refs[`input_ref${inputIndex}`][0].focus()
    },
    codeInputsChange(index) {
      if (index <= 4) {
        this.$refs[`input_ref${index + 1}`][0].focus()
      }
      // 验证code信息
      let inputIndex = 0
      inputIndex = this.codeInputs.findIndex(val => { return val.value === '' })
      if (inputIndex === -1) {
        this.toBind()
      }
    },
    codeInputsDelete(index) {
      if (index === 0) return
      if (index === 5 && this.codeInputs[5].value !== '') {
        this.codeInputs[index].value = ''
        this.$refs[`input_ref${index}`][0].focus()
        return
      }
      this.codeInputs[index - 1].value = ''
      this.$refs[`input_ref${index - 1}`][0].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.close-btn{
  position: absolute;
  top: 18px;
  right: 25px;
  cursor: pointer;
  img{
    width: 26px;
    height: 26px;
  }
}
.qrCode{
  width: 200px;
  height: 200px;
  margin: 30px auto 0;
}
.codeInputs{
  display: flex;
  justify-content: space-between;
  align-items: center;
  input{
    width: 50px;
    height: 40px;
    line-height: 50px;
    border: none;
    border-bottom: 1px solid #BFC8D6;
    outline: none;
    text-align: center;
  }
  .active{
    border-bottom: 1px solid #40A1FB;
  }
}

//对话框样式
::v-deep .el-dialog{
  margin: 15% auto !important;
  width: 450px;
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
