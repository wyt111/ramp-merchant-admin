<template>
  <div class="enroll-container">
    <div class="enroll_left">
      <img src="@/assets/Individual/logo.png" alt="">
    </div>
    <div class="enroll_right">
      <div class="enroll_right_Nav">
        <p>Individual Applicati</p>
      </div>
      <div class="enroll_right_content">
        <div class="enroll_steps">
          <div :class="[1,2,3].includes(state)?'enroll_steps_State active':'enroll_steps_State'">
            <p>1</p>
            <p>Basic Information</p>
          </div>
          <div :class="[2,3].includes(state)?'enroll_steps_con active':'enroll_steps_con'">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div :class="[2,3].includes(state)?'enroll_steps_State active':'enroll_steps_State'">
            <p>2</p>
            <p>Product Information</p>
          </div>
          <div :class="state==3?'enroll_steps_con active':'enroll_steps_con'">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div :class="state==3?'enroll_steps_State active':'enroll_steps_State'">
            <p>3</p>
            <p>Submit</p>
          </div>
        </div>
        <Basic v-if="state==1" :biz-type="bizType" />
        <SelectCity v-else-if="state==2" :fiat-pay-in="fiatPayIn" :product-type="productType" />
        <Successful v-else />
      </div>

    </div>
  </div>
</template>
<script >
import Basic from './components/Basic'
import SelectCity from './components/selectCity.vue'
import Successful from './components/successful.vue'
import { maechantInit } from '../../api/user'
export default {
  name: 'Enroll',
  components: {
    Basic,
    SelectCity,
    Successful
  },
  data() {
    return {
      state: 1,
      bizType: '',
      fiatPayIn: '',
      productType: ''
    }
  },
  watch: {
    '$store.state.user.ruleForm.contactEmail': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== '') {
          sessionStorage.setItem('vuex', JSON.stringify(this.$store.state))
        }
      }
    }

  },
  mounted() {
    maechantInit().then(res => {
      if (res.returnCode === '0000' && res.data) {
        this.bizType = res.data.bizType
        this.fiatPayIn = res.data.fiatPayIn
        const selectCity = [
          {
            con: 'With Crypto Acquiring Products, your customers can use digital currency to buy on your website Services or products; we can settle USDT or fiat to you.'
          },
          {
            con: 'Provide credit card collection channels, local payment in Indonesia, local payment in Mexico and other payment channels.'
          },
          {
            con: 'With this capability, you can help your users purchase various digital currencies with fiat, or your Users can also sell various digital currencies on this platform to obtain legal currency.'
          }
        ]
        res.data.productType.forEach((item, index) => {
          item.con = selectCity[index].con
        })
        this.productType = res.data.productType
      }
    })
    this.state = parseInt(sessionStorage.getItem('State') ? sessionStorage.getItem('State') : 1)
  }

}
</script>
<style lang="scss" scoped>
.enroll-container{
  width: 90%;
  height: 90%;
  // width: 1480px;
  // height: 900px;
  min-width: 1250px;
  min-height: 740px;
  max-width: 1300px;
  background: #F4F7FEFF;
  border-radius: 20px;
  display: flex;
  overflow: hidden;
  .enroll_left{
    width: 240px;
    height: 100%;
    background: url('../../assets/Individual/leftTab.png') no-repeat;
    background-size: 100% 100%;
    padding-top: 40px;
    text-align: center;
    box-sizing: border-box;
    img{
      width: 175px;
      height: 34px;

    }
  }
  .enroll_right{
    width: calc(100% - 240px);
    // width: 1300px;
    height: 100%;
    position: relative;
    .enroll_right_Nav{
      width: 100%;
      height: 60px;
      background: #fff;
      position: sticky;
      display: flex;
      p{
        font-size: 16px;
        font-family: RobotoBold;
        font-weight: 800;
        color: #123077;
        line-height: 19px;
        padding-left: 60px;
      }
    }
    .enroll_right_content{
      max-width: 1180px;
      max-height: 760px;
      width: 90%;
      height: 87%;
      background: #FFFFFF;
      box-shadow: 0px 0px 20px 0px rgba(177, 202, 239, 0.5);
      border-radius: 10px;
      margin: 20px auto 0;
      padding: 30px 50px 0;
      .enroll_steps{
        width: 500px;
        height: 65px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .enroll_steps_State{
          width: 128px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          p:first-child{
            width: 40px;
            height: 40px;
            background: #F5F8FF;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            font-family: RobotoBold;
            font-weight: 800;
            margin: 0;
            color: #fff;
          }
          p:last-child{
            font-size: 14px;
            font-family: RobotoLight;
            font-weight: 500;
            color: #BBC2CF;
            line-height: 16px;
            margin: 10px 0 0 0 ;
            white-space: normal;
            white-space: nowrap;
            overflow:hidden;
            text-overflow: ellipsis
          }
        }
        .enroll_steps_con{
          width: 140px;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          top: -10px;
          div:nth-child(odd){
            width: 6px;
            height: 6px;
            background: #F5F8FFFF;
            border-radius:50% ;
          }
          div:nth-child(even){
            width: 8px;
            height: 8px;
            background: #F5F8FFFF;
            border-radius:50% ;
          }

        }
        .active{
          div{
            background: #0193F2FF !important;
          }
          p:first-child{
            background: #0193F2FF;
          }
          p:last-child{
            color: #5A6070;
          }
        }

      }
    }
  }
}
</style>
