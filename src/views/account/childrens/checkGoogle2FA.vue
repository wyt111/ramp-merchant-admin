<template>
  <div id="checkGoogle2FA">
    <el-dialog title="2FA" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :append-to-body="true" :show-close="false" center>
      <!-- 关闭按钮 -->
      <p class="close-btn" @click="closeDialog"><img src="@/assets/images/dialogCloseIcon.png" alt=""></p>
      <div class="tips">Please enter the Google 2FA authentication code</div>
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
import { postCheckCode } from '@/api/account'

export default {
  name: "checkGoogle2FA",
  props: {
    resultMethods: {
      default: null,
      type: String
    }
  },
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
      inputFocus: 0
    }
  },
  methods: {
    initializationData() {
      this.dialogFormVisible = true
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
    // 验证code
    checkCode() {
      let authCode = ''
      this.codeInputs.forEach(item => {
        authCode = authCode + item.value
      })
      let params = {}
      params = {
        authCode: authCode
      }
      postCheckCode(params).then(res => {
        if (res.returnCode === '0000') {
          this.closeDialog()
          this.$parent[`${this.resultMethods}`]()
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
        this.checkCode()
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
    },
    closeDialog() {
      if (this.resultMethods === 'loginToPath') {
        this.$parent.loading = false
      }
      this.dialogFormVisible = false
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
.tips{
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-transform: capitalize;
  text-align: center;
  color: #333333;
  margin: 20px 0 0;
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
