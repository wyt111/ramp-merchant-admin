<template>
  <div class="collection-container">

    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" hide-required-asterisk class="demo-ruleForm">
      <div class="collection-title">Application <span style="font-size: 10px;font-family: SF  Pro;color: #40A1FB;margin-left:40px;cursor: pointer;" @click="goToRamp"> {{ $t('nav.Collection_documentation') }}</span></div>
      <div class="collection-content">
        <el-form-item label="Application Name" class="collection-con">
          <el-input v-model="ruleForm.appName" :readonly="true" />
        </el-form-item>
        <el-form-item :label="$t('nav.Collection_product')" class="collection-con">
          <el-input v-model="ruleForm.productCode" :readonly="true" />
        </el-form-item>
        <el-form-item label="APP ID" class="collection-con">
          <el-input v-model="ruleForm.appId" :readonly="true" />
        </el-form-item>
        <el-form-item label="Secret" prop="appSecrete" class="collection-con" style="">
          <el-input ref="changeInput" v-model="ruleForm.appSecrete" :readonly="Edit" />
          <!-- <span @click="cangeDisabled(1)">Edit</span> -->
        </el-form-item>

        <el-form-item :label="$t('nav.Collection_Publickey')" class="collection-con">
          <el-input v-model="ruleForm.publicKey" :readonly="true" />
        </el-form-item>
        <el-form-item :label="$t('nav.Collection_Private')" class="collection-con">
          <el-input v-model="ruleForm.privateKey" :readonly="true" />
        </el-form-item>
        <el-form-item :label="$t('nav.Collection_Noticeurl')" prop="noticeUrl" class="collection-con">
          <el-input ref="changeInput1" v-model="ruleForm.noticeUrl" :readonly="Edit1" />
          <!-- <span @click="cangeDisabled(2)">Edit</span> -->
        </el-form-item>
      </div>
      <p class="collection_Url"><span>{{ $t('nav.Collection_ReturnUrl') }}</span> <span style="cursor: pointer;" @click="goToRamp(1)">http://ramp.alchemypay.org?appId={{ ruleForm.appId }}</span> </p>
      <!-- <p class="collection_prompt "><img style="margin-right: 10px" src="@/assets/logos/GroupIcon.png" alt="">{{ $t('nav.Collection_toast') }}</p> -->

      <div class="collection-title" style="margin:20px 0 0 0px">{{ $t('nav.Collection_IPSettings') }}</div>
      <el-form-item class="coll-radio">
        <el-radio-group v-model="resource" @change="handleChange">
          <el-radio label="1">{{ $t('nav.Collection_acceptAPI') }}</el-radio>
          <el-radio label="2" disabled>{{ $t('nav.Collection_specificIP') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div style="height:70px;overflow:hidden">
          <el-input v-model="ipConfig" type="textarea" />
        </div>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">save</el-button>
        <el-button @click="resetForm('ruleForm')">Cancel</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
import { getApplication, setApplication } from '@/api/user'
export default {
  data() {
    return {
      Edit1: true,
      Edit: true,
      input: '',
      resource: '',
      ruleForm: {
        productCode: '',
        noticeUrl: '',
        appId: '',
        appSecrete: '',
        publicKey: '',
        Privatekey: '',
        delivery: false,
        desc: ''
      },
      ipConfig: '',
      rules: {
        appSecrete: [
          { required: true, message: 'Secret cannot be empty', trigger: 'blur' }
        ]
        // noticeUrl: [
        //   { required: true, message: 'Noticeurl cannot be empty', trigger: 'blur' }
        // ],
        // ipConfig: [
        //   { required: true, message: 'Please enter the IP address', trigger: 'blur' }
        // ]
      }

    }
  },
  mounted() {
    const params = {
      merchantAppId: this.$route.query.id
    }
    getApplication(params, this.$route.query.id).then(res => {
      if (res.returnCode === '0000' && res.data) {
        this.ruleForm = res.data
        // debugger
        this.ruleForm.ipConfig ? this.resource = '2' : this.resource = '1'
        // console.log(this.resource)
        this.ruleForm.ipConfig && this.resource === '2' ? this.ipConfig = this.ruleForm.ipConfig : this.ipConfig
      }
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resource === '2' ? this.ipConfig = this.ruleForm.ipConfig : this.ruleForm.ipConfig = this.ipConfig
          // console.log(this.ruleForm)
          setApplication(this.ruleForm, this.$route.query.id).then(res => {
            if (res.returnCode === '0000' && res.success) {
              this.$message({
                type: 'success',
                message: 'Modification successful'
              })
              this.$router.go(-1)
            }
          })
        } else {
          this.$message('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    },
    cangeDisabled(val) {
      if (val == 1) {
        this.Edit = !this.Edit
        if (!this.Edit) {
          this.$refs.changeInput.$el.children[0].style = `background:#fff;border:1px solid #A7A7A7`
          setTimeout(() => {
            this.$refs.changeInput.$el.children[0].focus()
          }, 500)
          return
        } else {
          this.$refs.changeInput.$el.children[0].style = ''
          this.$refs.changeInput.$el.children[0].blur()
          return
        }
      } else {
        this.Edit1 = !this.Edit1
        if (!this.Edit1) {
          this.$refs.changeInput1.$el.children[0].style = `background:#fff;border:1px solid #A7A7A7`
          setTimeout(() => {
            this.$refs.changeInput1.$el.children[0].focus()
          }, 500)
        } else {
          this.$refs.changeInput1.$el.children[0].style = ''
          this.$refs.changeInput1.$el.children[0].blur()
        }
      }
    },
    handleChange(val) {
      if (val === '2') {
        this.ipConfig = this.ruleForm.ipConfig
        return
      }
    },
    goToRamp(val) {
      if (val === 1) {
        window.open(`http://ramp.alchemypay.org?appId=${this.ruleForm.appId}`)
        return
      } else {
        window.open('https://www.showdoc.com.cn/1996224128508945/9035851473642080')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.collection-container{
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  // box-shadow: 0px 0px 20px rgb(177 202 239 / 50%);
   border-radius: 10px;
  padding: 40px  50px 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 999;
  .collection_Url{
    width: 100%;
   font-size: 12px;
    text-align: left;
    font-family: SF  Pro !important;
    font-weight: 400 !important;
    color: #5A6070;
    display: flex;
    align-items: center;
    margin: 20px 0 0 ;
    span:first-child{
      width: 120px;
    }
    span:last-child{
      display: block;
      // width: 220px;
      width: 350px;
      height: 30px;
      line-height: 30px;
      background: #F8FAFD;
      margin-left: 1px;
      color: #A7A7A7;
      border: none;
      padding:0 38px 0 10px ;
      border-radius: 2px;
      font-size: 12px;
      font-family: SF  Pro;
      // margin-left: 55px;
      white-space:nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    span:hover{
      color: #40A1FB;
    }
  }
  .collection-title{
    font-size: 14px;
    font-family: RobotoBold;
    font-weight: 800;
    color: #123077;
    line-height: 17px;
  }
  .collection-content{
    min-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .collection-con{
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 50px 0 0;
      position: relative;
      white-space: nowrap;
      ::v-deep .el-form-item__label{
        display: inline-block;
        width: 90px;
        height: 14px;
        font-size: 12px;
        text-align: left;
        font-family: SF  Pro !important;
        font-weight: 400 !important;
        color: #5A6070;
        line-height: 14px;
        margin-right: 30px;
      }
      span{
        display: block;
        height: 30px;
        font-size: 10px;
        font-family: SF  Pro;
        font-weight: 400;
        color: #40A1FB;
        line-height: 30px;
        position: absolute;
        right: 10px;
        top: 5px;
        cursor: pointer;
      }
      .el-input{
        width: 220px;
        height: 30px;

      }
      .el-input ::v-deep input{
          width: 220px;
          height: 30px;
          border: none;
          background: #F8FAFD;
          padding:0 38px 0 10px ;
          border-radius: 2px;
          font-size: 12px;
          font-family: SF  Pro;
          font-weight: 400;
          color: #A7A7A7;
          line-height: 30px;
          margin-right: 50px;
        }
    }
    .collection-con:last-child{
      width: auto;
      justify-content: space-between;
      ::v-deep .el-form-item__label{
        text-align: left;
        // width: 100px;
        margin-right: 39px;
        flex: 1;
      }
      .el-input{
        margin-left: -10px;
      }
      .el-input ::v-deep input{
        width: 350px;
        height: 30px;

      }
    }
  }
  .collection_prompt{
    font-size: 12px;
      font-family: SF  Pro;
      font-weight: 400;
      color: #BBC2CF;
      line-height: 14px;
      margin: 20px 0 0 ;
      display: flex;
      align-items: center;
  }
   .coll-radio ::v-deep.el-radio-group{
    display: flex !important;
    flex-direction: column !important;
    font-size: 12px;
    font-family:SF  Pro;
    font-weight: 400;
    color: #5A6070;
    line-height: 14px;
    .el-radio{
      margin-top: 20px;
    }
  }
  ::v-deep .el-textarea__inner{
    width: 350px;
    height: 90px;
    background: #F4F7FEFF;
    border: none;
  }
}
</style>
