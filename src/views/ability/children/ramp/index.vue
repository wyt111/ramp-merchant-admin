<template>
  <div class="offRamp-container">
    <div class="offRamp-title">
      <p :class="buySell==1?'active':''" @click="buySell=1">{{ $t('nav.Buy_coins') }}</p>
      <p :class="buySell==2?'active':''" @click="buySell=2">{{ $t('nav.Sell_coins') }}</p>
    </div>

    <div class="offRamp-content">
      <!-- 买币 -->
      <div v-if="buySell==1">
        <div class="offRamp-conTop">
          <div class="line_left" style="display:flex;width: 200px;border:none">
            <div :class="sellPayout==1?'active':''" @click="sellPayout=1">{{ $t('nav.ramp_Buy') }}</div>
            <div :class="sellPayout==2?'active':''" @click="sellPayout=2">{{ $t('nav.ramp_Collection') }}</div>
          </div>
          <div class="line_right_sechar">
            <el-input v-model.trim="Buysearch" style="flex:1;margin-right:0;" prefix-icon="el-icon-search" placeholder="Please enter crypto" />
            <el-button slot="append" style="border-radius: 0 4px 4px 0  ;" type="primary" @click="CryptoSearch('on')">{{ $t('nav.Orders_search') }}</el-button>
          </div>
        </div>
      </div>
      <div v-if="buySell==1 && sellPayout==1" class="offRamp-con">
        <el-table
          ref="table"
          key="1"
          style="width:100%"
          :height="tableHeight"
          max-height="600"
          :data="paymentData"
          border
          :lazy="true"
          :header-cell-style="{fontFamily:'SF Pro'}"
        >
          <el-table-column
            label="Crypto"
            align="left"
          >
            <template slot-scope="scope">
              <div style="height100%;display:flex; align-items: center;">
                <img slot="reference" :key="scope.row.logoUrl" :src="scope.row.logoUrl" style="width: 30px;height: 30px;margin-left:32%;top:0">

                <span style="line-height:10px;margin-left:10px">{{ scope.row.name }}</span>
              </div>
            <!-- <el-popover placement="top-start" title="" trigger="hover" style="margin-right:20px"> -->
            <!-- <img :src="scope.row.logoUrl" alt="" style="width: 150px;height: 150px"> -->
            <!-- </el-popover> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="network"
            label="Network"
            align="center"
          />

          <!-- <el-table-column
              prop="networkFee"
              label="提现手续费"
              align="center"
            /> -->
          <el-table-column
            label="Action"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.buyEnable"
                :active-value="1"
                :inactive-value="0"
                @change="setBuySell(scope.row)"
              />

            <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div v-else-if="buySell==1 && sellPayout==2" class="offRamp-con">
        <el-table
          ref="table"
          key="2"
          :height="tableHeight"
          :data="buyTable"
          border
          :lazy="true"
          :header-cell-style="{fontFamily:'SF Pro'}"
        >
          <el-table-column
            prop="payWayName"
            label="Payment Method"
            align="center"
          />
          <el-table-column
            prop="currency"
            label="Fiat"
            align="center"
          />
          <el-table-column
            label="Amount"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.payMin }} - {{ scope.row.payMax }}
            </template>
          </el-table-column>
          <!-- <el-table-column
              prop="currency"
              label="结算币种"
              align="center"
            /> -->
          <!-- <el-table-column
              label="Fee"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.fixedFee + scope.row.feeRate }}
              </template>
            </el-table-column> -->
          <el-table-column
            label="Action"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="setCollection(scope.row)"
              />
            <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 卖币 -->
      <div v-if="buySell==2">
        <div class="offRamp-conTop">
          <div class="line_left" style="display:flex;width: 200px;border:none">
            <div :class="sellPayout==1?'active':''" @click="sellPayout=1">{{ $t('nav.ramp_Sell') }}</div>
            <div :class="sellPayout==2?'active':''" style="opacity:.4;cursor:not-allowed;">{{ $t('nav.ramp_payment') }}</div>
          </div>

          <div class="line_right_sechar">
            <el-input v-model.trim="Buysearch" style="flex:1;margin-right:0;" prefix-icon="el-icon-search" placeholder="Please enter crypto" />
            <el-button slot="append" style="border-radius: 0 4px 4px 0  ;" type="primary" @click="CryptoSearch('off')">{{ $t('nav.Orders_search') }}</el-button>
          </div>
        </div>
        <div v-if="buySell==2 &&sellPayout==1" class="offRamp-con">
          <el-table
            ref="table"
            key="3"
            :height="tableHeight"
            :data="paymentData1"
            border
            :lazy="true"
            :header-cell-style="{fontFamily:'SF Pro'}"
          >
            <el-table-column

              label="Crypto"
              align="center"
            >
              <template slot-scope="scope">
                <div style="height100%;display:flex; align-items: center;">
                  <img slot="reference" :key="scope.row.logoUrl" :src="scope.row.logoUrl" style="width: 30px;height: 30px;margin-left:32%">
                  <!-- </el-popover> -->
                  <span style="line-height:10px;margin-left:10px">{{ scope.row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="network"
              label="Network"
              align="center"
            />

            <!-- <el-table-column

              label="提现手续费"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.networkFee }}
              </template>
            </el-table-column> -->
            <el-table-column
              label="action"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.sellEnable"
                  :active-value="1"
                  :inactive-value="0"
                  @change="setBuySell(scope.row)"
                />
                <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
              </template>
            </el-table-column>
          </el-table>

        </div>
        <div v-else class="offRamp-con">
          <el-table
            ref="table"
            key="4"
            :height="tableHeight"
            :data="sellTbale"
            :header-cell-style="{fontFamily:'SF Pro'}"
            border
            :lazy="true"
          >
            <el-table-column
              prop="alpha3"
              label="Country"
              align="center"
            />
            <el-table-column
              prop="currency"
              label="Fiat"
              align="center"
            />
            <!-- <el-table-column
              label="手续费"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.fixedFee + scope.row.fixedFee }}
              </template>
            </el-table-column> -->
            <el-table-column
              label="Action"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  @change="setSellStatus(scope.row)"
                />
                <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-show="total>1" class="payment-pagination">
        <el-pagination
          background
          layout=" pager, total"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

  </div>

</template>
<script>
import { getCryptoList, setCryptoState, getSellPayout, getBuyList, setCollectionState, setSelltionState } from '@/api/user'
export default {
  name: 'OffRamp',
  data() {
    return {
      buySell: 1,
      sellPayout: 1,
      paymentData: [],
      paymentData1: [],
      tableHeight: 46,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      // 卖币fiat列表
      sellTbale: [],
      // 买币fiat列表
      buyTable: [],
      Buysearch: ''
    }
  },
  watch: {
    buySell(newVal, oldVal) {
      // 切换表单情况搜索数据
      this.Buysearch = ''
      // 切换表单请求数据
      if (newVal === 2 && this.sellPayout === 2) {
        this.sellPayout = 1
        this.pageIndex = 1
        return
      }
      if ((newVal === 1 && this.sellPayout === 1) || (newVal === 2 && this.sellPayout === 1)) {
        this.pageIndex = 1
        this.sellPayout = 1
        this.MerchantList()
        return
      } else if (newVal === 1 && this.sellPayout === 2) {
        this.pageIndex = 1
        this.getBuyTable()
        return
      } else {
        this.sellPayout = 1
        this.pageIndex = 1
        this.SellPayout()
        return
      }
    },
    sellPayout(newVal) {
      // 切换表单情况搜索数据
      this.Buysearch = ''
      if (newVal === 2 && this.buySell === 2) {
        newVal = 1
        this.pageIndex = 1
        this.SellPayout()
        return
      } else if (newVal === 2 && this.buySell === 1) {
        this.pageIndex = 1
        this.getBuyTable()
        return
      } else {
        this.pageIndex = 1
        this.sellPayout = 1
        this.MerchantList()
        return
      }
    },
    // 搜索监听
    Buysearch(newVal) {
      if (!newVal) {
        if (this.buySell === 1 && this.sellPayout === 1) {
          this.MerchantList()
          return
        } else if (this.buySell === 1 && this.sellPayout === 2) {
          this.getBuyTable()
          // console.log(111)
          return
        } else if (this.buySell === 2 && this.sellPayout === 1) {
          this.MerchantList()
          return
        } else {
          console.log('暂不支持搜索')
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - (window.innerHeight / 2) + 50
    }, 100)
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.tableHeight = window.innerHeight - (window.innerHeight / 2) + 50
      }, 100)
    })
    this.MerchantList()
  },
  methods: {
    // 买卖币crypto列表
    MerchantList() {
      const params = {
        'merchantAppId': this.$route.query.merchantAppId,
        'pageIndex': this.pageIndex,
        'pageSize': 10,
        'side': this.buySell,
        'searchData': this.Buysearch
      }
      this.$parent.loading = true
      getCryptoList(params).then(res => {
        this.total = 0
        if (res.returnCode === '0000' && res.data) {
          this.$parent.loading = false
          if (this.buySell === 1) {
            this.paymentData = res.data.result
            this.total = res.data.total
            return
          } else {
            this.paymentData1 = res.data.result
            this.total = res.data.total
          }
        }
        this.$parent.loading = false
      }).catch(() => {
        this.$parent.loading = false
      })
    },
    // 出款方式列表
    SellPayout() {
      const params = {
        'merchantAppId': this.$route.query.merchantAppId,
        'pageIndex': this.pageIndex,
        'pageSize': 10

      }
      getSellPayout(params).then(res => {
        if (res.returnCode === '0000' && res.data) {
          this.sellTbale = res.data.result
          this.pageIndex = res.data.pageIndex
          this.total = res.data.total
        }
      })
    },
    // 收款方式列表
    getBuyTable() {
      const params = {
        'merchantAppId': this.$route.query.merchantAppId,
        'pageIndex': this.pageIndex,
        'pageSize': 10,
        'searchData': this.Buysearch
      }
      this.$parent.loading = true
      getBuyList(params).then(res => {
        if (res.returnCode === '0000' && res.data) {
          this.buyTable = res.data
          this.total = 0
          this.$parent.loading = false
        }
        this.$parent.loading = false
      }).catch(() => {
        this.$parent.loading = false
      })
    },

    handleCurrentChange(val) {
      if (this.buySell === 2 && this.sellPayout === 2) {
        this.pageIndex = val
        this.SellPayout()
        return
      } else if (this.buySell === 1 && this.sellPayout === 2) {
        this.pageIndex = val
        this.getBuyTable()
        return
      }
      this.pageIndex = val
      this.MerchantList()
    },
    // 设置买卖币状态修改
    setBuySell(val) {
      let params
      if (this.buySell === 1 && this.sellPayout === 1) {
        params = {
          merchantAppId: this.$route.query.merchantAppId,
          buyEnable: val.buyEnable
          // currency:
        }
      } else {
        params = {
          merchantAppId: this.$route.query.merchantAppId,
          sellEnable: val.sellEnable

        }
      }
      setCryptoState(val.merchantNetworkId, params).then(res => {
        if (res.returnCode === '0000' && res.success) {
          this.$message({
            type: 'success',
            message: 'success'
          })
          // this.MerchantList()
        }
      }).catch(() => {
        this.MerchantList()
      })
    },
    // 设置收款方式状态
    setCollection(val) {
      const params = {
        merchantAppId: this.$route.query.merchantAppId,
        status: val.status,
        currency: val.currency
      }
      setCollectionState('1', params).then(res => {
        if (res.returnCode === '0000' && res.success) {
          this.$message({
            type: 'success',
            message: 'success'
          })
          this.getBuyTable()
        }
      }).catch(() => {
        this.getBuyTable()
        return
      })
    },
    // 设置出款方式状态
    setSellStatus(val) {
      console.log(val)
      const params = {
        merchantAppId: this.$route.query.merchantAppId,
        status: val.status
      }
      setSelltionState(val.withdrawalMethodId, params).then(res => {
        if (res.returnCode === '0000' && res.success) {
          this.$message({
            type: 'success',
            message: 'success'
          })
          this.SellPayout()
        }
      })
    },
    // 搜索on Ramp
    CryptoSearch(val) {
      if (val === 'on' && this.buySell === 1 && this.sellPayout === 1) {
        this.MerchantList()
        return
      } else if (val === 'on' && this.buySell === 1 && this.sellPayout === 2) {
        this.getBuyTable()
        // console.log(111)
        return
      } else if (val === 'off' && this.buySell === 2 && this.sellPayout === 1) {
        this.MerchantList()
        return
      } else {
        console.log('暂不支持搜索')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .offRamp-container{
    width: 100%;
    height: 98%;
    min-height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    background: #F4F7FE;
    padding: 10px 30px 0;

    .offRamp-title{
      height: 50px;
      display: flex;
      p{
        width: 230px;
        height: 70px;
        font-size: 14px;
        font-family: RobotoLight;
        font-weight: 800;
        color: #123077;
        line-height: 17px;
        box-shadow: 0px 0px 20px 0px rgba(177, 202, 239, 0.5);
        border-radius: 10px 10px 0 0;
        text-align: center;
        line-height: 40px;
        margin-right: 10px;
        cursor: pointer;
      }
      .active{
        background: #FFFFFF;
        box-shadow: 0px -15px 20px -5px rgba(177, 202, 239, 0.5);
        font-family: RobotoBold;
        position: relative;
        z-index: 2;
      }
    }
      .offRamp-content{
        width: 100%;
        height: 90%;
        background: #FFFFFF;
        box-shadow: 0px 0px 20px 0px rgba(177, 202, 239, 0.5);
        border-radius: 20px;
        position: relative;
        z-index: 1;
        top: 10px;
        padding: 20px 50px 0;
        .offRamp-conTop{
          width: 100%;
          display: flex;
          align-items: center;
          // justify-content: space-between;
          margin-top: 10px;
          color: #5A6070FF;
          // background: #FBFCFF;
          font-family: RobotoLight;
          .line_left{
            margin-right: 20px;
            div:first-child{
              width: 100px;
              height: 40px;
              text-align: center;
              line-height: 40px;
              font-size: 12px;
              background: #FBFCFF;
              border: 1px solid #E8EAEEFF;
              cursor: pointer;
              border-radius: 4px 0  0 4px;
            }
            div:last-child{
               width: 100px;
              height: 40px;
              text-align: center;
              line-height:40px;
              font-size: 12px;
              background: #FBFCFF;
              border: 1px solid #E8EAEEFF;
              cursor: pointer;
              border-radius: 0 4px 4px 0;
            }
            .active{
                font-family: RobotoBold;
                background: #40A1FBFF !important;
                color: #FFFFFF;

              }
          }
          .line_right_sechar{
            display: flex;
            ::v-deep .el-input input{
              // height: 35px;
             border-radius: 4px 0px  0 4px;
             border: 1px solid #E8EAEEFF;
            }
          }

        }
        .offRamp-con{
          width: 100%;
            .el-table{
              font-size: 12px;
              font-family: 'SF Pro';
              font-weight: 400;
              color: #333333;
              border-radius: 5px;
              margin-top: 20px;
              & ::v-deep thead{
                font-size: 12px;
                font-family: 'SF Pro';
                font-weight: 400;
                color: #333333;
              }
              & ::v-deep th{
                background: #F4F7FF;
              }
              & ::v-deep th, td{
                text-align: center;
                font-family: SF Pro;
                color: #123077;
                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;
              }
              & ::v-deep .el-table__row td{
                height: 45px;
                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;

              }
              & ::v-deep tr td{
                // padding:  10px 0 0 0 ;
                border-bottom: 1px solid #E8EAEE;
              }
            }
        }
      }
  }
  .payment-pagination{
    display: flex;
    justify-content: center;
    position: relative;
    top: 10px;
    z-index: 999;
    ::v-deep .number{
      background: #FFFFFF;
      font-family: 'SF Pro';
      color: #9AA8C3;
      font-size: 12px;
    }
    ::v-deep .el-pager li{
      background: #fff;
    }
    ::v-deep .btn-prev{
      background: #FFFFFF;
    }
    ::v-deep .btn-next{
      background: #FFFFFF;
    }
    ::v-deep .el-pagination__total{
      font-family: 'SF Pro';
      color: #9AA8C3;
      font-size: 12px;
    }
  }
</style>
