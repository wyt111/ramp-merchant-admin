<template>
  <div v-loading="loading" class="ability-container">
    <!-- <div class="ability-content">
      <div class="ability-title">
        <p>{{ $t('nav.Ability_crypto') }}</p>
        <span v-if="state==1" class="Activated">{{ $t('nav.Ability_Activated') }}</span>
        <div v-else-if="state==2" class="Applying">{{ $t('nav.Ability_Applying') }}...</div>
         <div v-else class="Unopened">Unopened</div>
        <div v-else class="Activated">{{ $t('nav.Ability_developed') }}...</div>
      </div>
      <div class="ability-con">
        {{ $t('nav.Ability_cryptoContent') }}
      </div>
      <div v-if="state==1" class="ability-tottom">
        <el-button type="primary" class="allocation" @click="goContent">查看配置</el-button>
        <el-button class="TryButton">{{ $t('nav.Ability_now') }}</el-button>
      </div>
      <div v-if="state==2" class="ability-tottom1">
        <!-- <el-button type="primary" class="allocation">查看配置</el-button> -->
    <!-- <el-button v-else-if="state==3" type="primary" class="allocation">申请</el-button> -->
    <!-- <el-button class="TryButton">{{ $t('nav.Ability_now') }}</el-button>
        <p v-if="state==2">{{ $t('nav.Ability_progress') }}</p>
      </div>
      <div v-if="state==3" class="ability-tottom">
        <el-button type="primary" class="allocation" disabled>{{ $t('nav.Ability_Closed') }}</el-button>
        <el-button class="TryButton" disabled>{{ $t('nav.Ability_now') }}</el-button>
      </div>
    </div> -->
    <!-- <div class="ability-content">
      <div class="ability-title">
        <p>{{ $t('nav.Ability_Fiat') }}</p>
        <span v-if="state1==1" class="Activated">{{ $t('nav.Ability_Activated') }}</span>
        <div v-else-if="state1==2" class="Applying">{{ $t('nav.Ability_Applying') }}...</div>
        <!-- <div v-else class="Unopened">Unopened</div> -->
    <!-- <div v-else class="Activated">{{ $t('nav.Ability_developed') }}...</div> -->
    <!--</div>
      <div class="ability-con">
        {{ $t('nav.Ability_flatContent') }}
      </div>
      <div v-if="state1==1" class="ability-tottom">
        <el-button type="primary" class="allocation">查看配置</el-button>
        <el-button class="TryButton">{{ $t('nav.Ability_now') }}</el-button>
      </div>
      <div v-if="state1==2" class="ability-tottom1">
        <!-- <el-button type="primary" class="allocation">查看配置</el-button> -->
    <!-- <el-button v-else-if="state==3" type="primary" class="allocation">申请</el-button> -->
    <!--<el-button class="TryButton">{{ $t('nav.Ability_now') }}w</el-button>
        <p v-if="state1==2">{{ $t('nav.Ability_progress') }}</p>
      </div>
      <div v-if="state1==3" class="ability-tottom">
        <el-button type="primary" class="allocation" disabled>{{ $t('nav.Ability_Closed') }}</el-button>
        <el-button class="TryButton" disabled>{{ $t('nav.Ability_now') }}</el-button>
      </div>
    </div> -->
    <!-- <div class="ability-content">
      <div class="ability-title">
        <p>{{ $t('nav.Ability_ramp') }}</p>
        <span v-if="state2==1" class="Activated">{{ $t('nav.Ability_Activated') }}</span>
        <div v-else-if="state2==2" class="Applying">{{ $t('nav.Ability_Applying') }}...</div>
        <div v-else class="Unopened">{{ $t('nav.Ability_Unopened') }}</div>
      </div>
      <div class="ability-con">
        {{ $t('nav.Ability_rampContent') }}
      </div>
      <div v-if="state2==1" class="ability-tottom">
        <el-button type="primary" class="allocation" @click="goContent">{{ $t('nav.Ability_configuration') }}</el-button>
        <el-button class="TryButton" disabled>{{ $t('nav.Ability_now') }}</el-button>
      </div>
      <div v-if="state2==2 ||state2==0 " class="ability-tottom1">
       <el-button type="primary" class="allocation">查看配置</el-button>
         <el-button v-else-if="state==3" type="primary" class="allocation">申请</el-button>
        <el-button class="TryButton" disabled>{{ $t('nav.Ability_now') }}</el-button>
        <p v-if="state2==2 ||state2==0">{{ $t('nav.Ability_progress') }}</p>
      </div>
      <div v-if="state2==3" class="ability-tottom">
        <el-button type="primary" class="allocation" @click="$router.replace('/enroll')">申请</el-button>
        <el-button class="TryButton">{{ $t('nav.Ability_now') }}</el-button>
      </div>
    </div> -->
    <!-- <div class="ability_toast">
      点击
    </div> -->
    <div v-show="isShow" class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
import { merchantList } from '@/api/user'
export default {
  name: 'Ability',
  data() {
    return {
      state: 3,
      state1: 3,
      state2: 1,
      isShow: false,
      abilty: '',
      loading: true
    }
  },
  mounted() {
    merchantList().then(res => {
      if (res.returnCode === '0000' && res.data) {
        res.data.forEach(item => {
          if (item.productCode === '80001') {
            this.abilty = item
            this.state2 = item.status
            this.goContent()
          }
        })
      }
    })
  },
  methods: {
    goContent() {
      this.isShow = true
      this.$router.push({ path: '/ability/index/ramp', query: {
        merchantAppId: this.abilty.merchantAppId
      }})
    }

  }
}
</script>
<style lang="scss" scoped>
  .ability-container{
    width: 100%;
    height: 100%;
    padding: 20px 20px 0;
    display: flex;
    // flex-wrap: wrap;
    .ability-content{
      width: 280px;
      height: 360px;
      background: #F8FAFDFF;
      box-shadow: 0px 0px 20px 0px rgba(177, 202, 239, 0.5);
      border-radius: 10px;
      padding: 30px 32px 0;
      box-sizing: border-box;
      position: relative;
      margin:0 20px 20px;

      .ability-title{
        height: 30px;
        display: flex;
        align-items: center;
        p{
          font-size: 14px;
          font-family: RobotoBold;
          font-weight: 800;
          color: #123077;
          line-height: 17px;
          margin-right: 10px;
        }
        .Activated{
          // width: 56px;
          // height: 16px;
          // display: block;
          padding: 3px 9px 3px;
          text-align: center;
          // line-height: 16px;
          background: rgba(187, 194, 207, 0.4);
          border-radius: 2px;
          font-family: RobotoBold;
          font-size: 8px;
          font-weight: 800;
          color: #FFFFFF;

        }
        .Applying{
           padding: 3px 9px 3px;
          text-align: center;
          // line-height: 16px;
          background: #9AA8C3FF;
          border-radius: 2px;
          font-family: RobotoBold;
          font-size: 8px;
          font-weight: 800;
          color: #FFFFFF;
        }
        .Unopened{
          padding: 3px 9px 3px;
          text-align: center;
          // line-height: 16px;
          background: #40A1FBFF;
          border-radius: 2px;
          font-family: RobotoBold;
          font-size: 8px;
          font-weight: 800;
          color: #FFFFFF;
        }
      }
      .ability-con{
        height: 170px;
        font-size: 14px;
        font-family: RobotoLight;
        font-weight: 300;
        color: #5A6070;
        line-height: 20px;
        padding: 20px 0 0 0;
        // word-break: keep-all;
        text-align:justify;
        word-break: break-all;
        word-spacing:1.8px ;

      }
      .ability-tottom{
        width: 100%;
        height: 130px;
        padding:20px 30px 0 ;
        background: #FFFFFF;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 0 0 10px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .allocation{
          width: 130px;
          height: 40px;
          padding: 0;
          // background: #40A1FB;
          border-radius: 6px;
          font-family: RobotoBold;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 14px;
          font-size: 12px;
        }
        .TryButton{
          width: 80px;
           border-radius: 6px;
          padding-left: 10px;
          font-family:RobotoBold;
          font-weight: 800;
          color: #5A6070;
          line-height: 14px;
        }
      }
      .ability-tottom1{
        width: 100%;
        height: 130px;
        padding:20px 30px 0 ;
        background: #FFFFFF;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 0 0 10px 10px;
        .TryButton{
          width: 100%;
          font-size: 12px;
          font-family:RobotoBold;
          font-weight: 800;
          color: #5A6070;
          line-height: 14px;
          border-radius: 6px;
        }
        p{
          font-size: 10px;
          font-family: 'SF Pro';
          font-weight: 400;
          color: #40A1FB;
          line-height: 12px;
        }
      }
    }
    .content{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      // background: #FFFFFF;
    }
  }
</style>
