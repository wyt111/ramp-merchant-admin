<template>
  <div class="basic-container">
    <div class="basic-totle">Business Info</div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Type" prop="type">
        <el-select v-model="ruleForm.type" placeholder="Please select">
          <el-option label="Individual" value="2" />
          <el-option label="Company" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item v-show="ruleForm.type==1" label="Company Name" :prop="ruleForm.type==1?'fullName':''" style="width:100%">
        <el-input v-model="ruleForm.fullName" />
      </el-form-item>
      <el-form-item label="Website">
        <el-input v-model="ruleForm.site" />
      </el-form-item>
      <el-form-item label="Id Number" prop="licenseNo">
        <el-input v-model="ruleForm.licenseNo" />
      </el-form-item>
      <el-form-item label="ID Prove" prop="licenseUrl">
        <el-upload
          action=""
          :http-request="uploadImg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body margin-top="10vh" custom-class="uploadImages">
          <img style="width:100%;height:100%" :src="ruleForm.licenseUrl" alt="">
          <div class="scroll_upload" />
        </el-dialog>

      </el-form-item>
      <el-form-item label="Business Type" prop="merchantBizType">
        <el-checkbox-group v-model="ruleForm.merchantBizType">
          <el-checkbox v-for="item in bizType" :key="item.dictValue" :label="item.dictValue" :name="item.dictValue">{{ item.dictLabel }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="width:100%;margin-bottom:0">
        <div class="basic-totle">Business Info</div>
      </el-form-item>
      <el-form-item label="Full Name" prop="contactName">
        <el-input v-model="ruleForm.contactName" />
      </el-form-item>
      <el-form-item label="Phone" prop="contactPhone">
        <el-input v-model="ruleForm.contactPhone" />
      </el-form-item>
      <el-form-item label="Email" prop="contactEmail" style="width:100%">
        <el-input v-model="ruleForm.contactEmail" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :style="{background:nextActive?'#40A1FBFF':''}" @click="submitForm('ruleForm')">Next</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { uploadImages } from '@/api/user'
export default {
  name: 'Basic',
  props: ['bizType'],
  data() {
    var validateEmail = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '') {
        callback(new Error('Please enter Email'))
        return
      } else if (reg.test(value) === false) {
        callback(new Error('Please enter the correct email address'))
        return
      } else {
        callback()
      }
    }
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('The phone number cannot be empty'))
        return
      } else if (isNaN(value) === true) {
        callback(new Error('Please enter the number type'))
        return
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        type: '',
        site: '',
        name: '',
        fullName: '',
        licenseNo: '',
        licenseUrl: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        merchantBizType: [],
        applyProductCode: [],
        applyProductParam: {}
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules: {
        name: [
          { required: true, message: 'Please enter a name', trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: 'Please enter full name', trigger: 'blur' }
        ],
        type: [
          { required: true, message: 'Please select a merchant or individual', trigger: 'change' }
        ],
        licenseNo: [
          { required: true, message: 'The certificate number cannot be empty', trigger: 'blur' }
        ],
        merchantBizType: [
          { type: 'array', required: true, message: 'Please select at least one', trigger: 'change' }
        ],
        contactName: [
          { required: true, message: 'Please enter Full Name', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        licenseUrl: [
          { required: true, message: '请选择图片', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    nextActive() {
      if (this.ruleForm.type === '2') {
        if (this.ruleForm.licenseUrl && this.ruleForm.name && this.ruleForm.type && this.ruleForm.licenseNo && this.ruleForm.merchantBizType.length > 0 && this.ruleForm.contactName && this.ruleForm.contactPhone && this.ruleForm.contactEmail) {
          return true
        }
      } else {
        if (this.ruleForm.licenseUrl && this.ruleForm.name && this.ruleForm.type && this.ruleForm.licenseNo && this.ruleForm.merchantBizType.length > 0 && this.ruleForm.contactName && this.ruleForm.contactPhone && this.ruleForm.contactEmail && this.ruleForm.fullName) {
          return true
        }
      }

      return false
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.nextActive) {
          this.$parent.state = 2
          sessionStorage.setItem('State', 2)
          this.$store.state.user.ruleForm = this.ruleForm
        } else {
          // console.log(this.$store.state.user.ruleForm)
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange(file, fileList) {
      this.ruleForm.licenseUrl = URL.createObjectURL(file.raw)
    },
    uploadImg(params) {
      const file = params.file
      const from = new FormData()
      from.append('pic', file)
      uploadImages(from).then(res => {
        if (res.returnCode === '0000' && res.data) {
          this.$message({
            type: 'success',
            message: res.returnMsg
          })
          this.ruleForm.licenseUrl = res.data.picUrl
          return
        }
        this.$message({
          type: 'error',
          message: res.returnMsg
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.basic-container{
  width: 100%;

  .basic-totle{
    font-size: 14px;
    font-family: RobotoBold;
    font-weight: 800;
    color: #123077;
    line-height: 17px;
    margin-bottom: 10px;

  }
  .demo-ruleForm{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // align-items: center;
    .el-form-item {
      display: inline-block;
      height: 20px;
      margin:0 50px 30px 0;
      display: flex;
      // align-items: center;
      .el-input{
        height: 30px !important;
      }
      ::v-deep .el-input__inner{
          height: 30px !important;
        }
      ::v-deep .el-form-item__content{
        margin: 0 !important;
      }
      ::v-deep .el-form-item__label{
        margin-top: 3px;
      }
      ::v-deep .el-checkbox{
        height: 30px;
        margin: 0 10px 0 0;
        padding: 0;
      }
      ::v-deep .el-upload{
        width: 220px;
        height: 124px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
        position: relative;

      }
      ::v-deep .el-upload-list__item-thumbnail{
            width: 220px;
            height: 124px;
          }
      ::v-deep .el-upload-list__item{
          width: 220px;
          height: 124px;
          border: none;
          background: #F8FAFD;
          position: absolute;
          z-index: 999;

        }

     ::v-deep input{
        width: 220px;
        // height: 30px;
        // height: 20px;
        line-height: 30px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
        font-size: 12px;
        font-family: SF  Pro;
        color: #A7A7A7;
      }
      ::v-deep .el-form-item__error{
        // bottom: -50px;
        font-size: 10px;
        line-height: 40px !important;
        font-family: RobotoLight;
      }
    }
    .el-form-item:nth-of-type(3){

      ::v-deep input{
        width: 610px;
        // height: 30px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
      }

    }
    .el-form-item:nth-of-type(6){
      height: 125px;
      margin-bottom: 0px;
      ::v-deep .el-form-item__error{
        // top: 100%;
        line-height: 0 !important;
      }
    }
    .el-form-item:nth-of-type(7){
      line-height: 0px !important;
      height: auto !important;
      margin-bottom: 5px;
      .el-checkbox-group{
        display: flex;
        flex-wrap: wrap;
      }

    }
    .el-form-item:nth-of-type(7){
      ::v-deep .el-form-item__error{
        // top: 100%;
        // top: -100% !important;
        line-height: 0px !important;
      }
    }
    .el-form-item:last-child{
      // width: 200px;
      width: 100% !important;
      // height: 40px;
     margin: 5px  0 0 ;
     display: flex;
     justify-content: center;
     align-items: center;
      ::v-deep button{
        width: 200px;
        height: 40px;
        font-family: RobotoBold;
        background: #40A1FB80;
        border: none;
        border-radius: 6px;
      }
    }
    .el-form-item:nth-of-type(4){
      ::v-deep input{
        width: 610px;
        // height: 30px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
      }
    }

    // .el-form-item:nth-of-type(7){
    //   height: 100%;
    //   margin: 0;
    // }
    // .el-form-item:nth-of-type(4){
    //   ::v-deep .el-form-item__label{
    //     text-indent: 10px;
    //   }
    // }
    .el-form-item:nth-of-type(11){
      ::v-deep input{
        width: 610px;
        // height: 30px;
        background: #F8FAFD;
        border-radius: 2px;
        border: none;
      }
    }
    ::v-deep .el-form-item__label{
      font-size: 12px;
      font-family: SF  Pro;
      font-weight: 400;
      color: #5A6070;
      line-height: 14px;
      text-align: left;
      line-height: 30px;
    }
  }
}
.el-checkbox ::v-deep .el-checkbox__label{
  font-size: 12px;
  font-family: SF  Pro;
  font-weight: 400;
  color: #A7A7A7;
  line-height: 14px;
}
::v-deep .uploadImages{
  height: 90%;
  margin: 0 !important;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 20px;
    overflow: hidden;
    .el-dialog__body{
      height: 96%;
      // overflow: scroll;
    }
  }

</style>
