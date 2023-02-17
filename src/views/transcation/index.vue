
<template>
  <div class="offRamp-container">
    <div class="offRamp-title">
      <p :class="paramsData.flag==1?'active':''" @click="changeSellAndBuy(1)">{{ $t('nav.Buy_coins') }}</p>
      <p :class="paramsData.flag==0?'active':''" @click="changeSellAndBuy(0)">{{ $t('nav.Sell_coins') }}</p>
    </div>
    <!-- {{ loading }} -->
    <div v-loading="loading" class="offRamp-content">
      <!-- 买币 -->
      <div v-if="paramsData.flag==1">
        <div class="order-top">
          <div class="el_date">
            <el-date-picker
              v-model="timeList"
              type="daterange"
              range-separator="-"
              start-placeholder="Date From"
              end-placeholder="Date To"
            />
          </div>
          <div class="el_search">
            <!-- <p style="color: #666666;width: 100px;">email : </p> -->
            <el-input v-model.trim="paramsData.email" style="flex:1;margin-right:0" prefix-icon="el-icon-search" placeholder="Order ID/Merchant Order/Email/Hash" />
            <el-button slot="append" class="searchButton" type="primary" :disabled="disabledButton" @click="searchDataEmail">{{ $t('nav.Orders_search') }}</el-button>
          </div>
          <div class="el_select">
            <el-select v-model="paramsData.orderStatus" placeholder="请选择" @change="selectBuy">
              <el-option
                v-for="item in optionsBuy"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="el_download">
            <el-button type="primary" @click="getdownLoadList('on Ramp')"><i class="el-icon-download el-icon--left"> <span> download</span></i></el-button>
          </div>
        </div>
        <div class="offRamp-con">
          <el-table
            ref="table"
            :key="1"
            :height="tableHeight"
            :data="sellOrder"
            border
            :lazy="true"

            :header-cell-style="{fontFamily:'SF Pro'}"
          >
            <el-table-column
              prop="orderNo"
              label="Order ID"
              align="center"
              width="180"
            />
            <el-table-column
              prop="merchantOrderNo"
              label="Merchant Order"
              align="center"
              width="180"
            />
            <el-table-column
              prop="createTime"
              label="Order Created"
              align="center"
              width="160"
            />
            <el-table-column
              prop="payTime"
              label="Order Paid"
              align="center"
              width="150"
            />
            <el-table-column
              prop="fiatAmountAndCurrency"
              label="Fiat Amount"
              align="center"
              width="110"
            />
            <el-table-column
              prop="serviceFee"
              label="Ramp Fee"
              align="center"
              width="110"
            />
            <el-table-column
              prop="completeTime"
              label="Crypto Completed"
              align="center"
              width="150"
            />

            <el-table-column
              label="Address"
              align="center"
              width="180"
            >
              <template slot-scope="scope">
                <el-popover
                  popper-class="Order_popper"
                  placement="top"
                  trigger="hover"
                  :open-delay="700"
                >
                  <div style="font-size:12px">
                    {{ scope.row.address }}
                  </div>
                  <el-button slot="reference" style="border:none;padding:5px 0 5px;font-size:12px">{{ scope.row.address&& scope.row.address.length>16?scope.row.address.slice(0,8) + '****' + scope.row.address.slice(scope.row.address.length-8,scope.row.address.length):scope.row.address }}</el-button>
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column
              prop="cryptoVolumeAndCurrency"
              label="Crypto Amount"
              align="center"
              width="120"
            />
            <el-table-column
              label="Network"
              align="center"
              prop="network"
              width="90"
            />
            <el-table-column
              label="Network Fee"
              align="center"
              prop="fiatNetworkFee"
              width="110"
            />
            <el-table-column
              label="Hash ID"
              align="center"
              width="200"
            >
              <template slot-scope="scope">
                <el-popover
                  popper-class="Order_popper"
                  placement="top"
                  trigger="hover"
                  :open-delay="700"
                >
                  <div style="font-size:12px">
                    {{ scope.row.transactionHash }}
                  </div>
                  <el-button slot="reference" :disabled="disabledButton" style="border:none;padding:5px 0 5px;font-size:12px" @click.native="goToNetwork(scope.row)">{{ scope.row.transactionHash && scope.row.transactionHash.length>16?scope.row.transactionHash.slice(0,8) + '****' + scope.row.transactionHash.slice(scope.row.transactionHash.length-8,scope.row.transactionHash.length):scope.row.transactionHash }}<i :class="scope.row.transactionHash.length>0?'el-icon-arrow-right el-icon--right':''" /></el-button>
                </el-popover>

              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="Email"
              align="center"
              width="200"
            />
            <el-table-column
              prop="failReason"
              label="Fail ReaSon"
              align="center"
              width="200"
            />

            <el-table-column
              prop="orderState"
              label="Status"
              align="center"
              width="100"
              fixed="right"
            />
          </el-table>
        </div>
      </div>
      <!-- 卖币 -->
      <div v-if="paramsData.flag==0">
        <div class="order-top">
          <div class="el_date">
            <el-date-picker
              v-model="timeList"
              type="daterange"
              range-separator="-"
              start-placeholder="Date From"
              end-placeholder="Date To"
            />
          </div>
          <div class="el_search">
            <el-input v-model.trim="paramsData.email" style="flex:1;margin-right:0" prefix-icon="el-icon-search" placeholder="Order ID/Merchant Order/Email/Hash" />
            <el-button slot="append" class="searchButton" type="primary" :disabled="disabledButton" @click="searchDataEmail">{{ $t('nav.Orders_search') }}</el-button>
          </div>
          <div class="el_select">
            <el-select v-model="paramsData.orderStatus" placeholder="请选择" @change="selectBuy">
              <el-option
                v-for="item in optionsSell"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="el_download">
            <el-button type="primary" @click="getdownLoadList('off Ramp')"><i class="el-icon-download el-icon--left"> <span> download</span></i></el-button>
          </div>
        </div>
        <div class="offRamp-con">
          <el-table
            ref="table"
            :key="2"
            :height="tableHeight"
            :data="sellOrder1"
            border
            :lazy="true"
          >
            <el-table-column
              prop="orderId"
              label="Order ID"
              align="center"
              width="190"
            />
            <el-table-column
              prop="merchantOrderNo"
              label="Merchant Order"
              align="center"
              width="190"
            >
              <template slot-scope="scope">
                {{ scope.row.merchantOrderNo && scope.row.merchantOrderNo == 'null'?'': scope.row.merchantOrderNo }}
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="Order Created"
              align="center"
              width="190"
            />
            <el-table-column
              label="Ramp Fee"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.feeAndUnit }}
              </template>
            </el-table-column>
            <el-table-column
              label="Fiat Amount"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                {{ scope.row.fiatAmountAndName }}
              </template>
            </el-table-column>
            <el-table-column
              prop="cryptoAndCurrency"
              label="Crypto Amount"
              align="center"
              width="120"
            />
            <el-table-column
              prop="cryptoCurrencyRate"
              label="Crypto price"
              align="center"
              width="190"
            />
            <el-table-column
              prop="cryptoCurrencyNetwork"
              label="Network"
              align="center"
              width="190"
            />
            <el-table-column
              prop="toAddress"
              label="toAddress"
              align="center"
              width="190"
            >
              <template slot-scope="scope">
                <el-popover
                  popper-class="Order_popper"
                  placement="top"
                  trigger="hover"
                  :open-delay="700"
                >
                  <div style="font-size:12px">
                    {{ scope.row.toAddress }}
                  </div>
                  <el-button slot="reference" style="border:none;padding:5px 0 5px;font-size:12px">{{ scope.row.toAddress.length>16?scope.row.toAddress.slice(0,8) + '****' + scope.row.toAddress.slice(scope.row.toAddress.length-8,scope.row.toAddress.length):scope.row.toAddress }}</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="fromAddress"
              label="fromAddress"
              align="center"
              width="190"
            >
              <template slot-scope="scope">
                <el-popover
                  popper-class="Order_popper"
                  placement="top"
                  trigger="hover"
                  :open-delay="700"
                >
                  <div style="font-size:12px">
                    {{ scope.row.fromAddress }}
                  </div>
                  <el-button slot="reference" style="border:none;padding:5px 0 5px;font-size:12px">{{ scope.row.fromAddress &&scope.row.fromAddress.length>16?scope.row.fromAddress.slice(0,8) + '****' + scope.row.fromAddress.slice(scope.row.fromAddress.length-8,scope.row.fromAddress.length):scope.row.fromAddress }}</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="transactionHash"
              label="Hash ID"
              align="center"
              width="190"
            >
              <template slot-scope="scope">
                <el-popover
                  popper-class="Order_popper"
                  placement="top"
                  trigger="hover"
                  :open-delay="700"
                >
                  <div style="font-size:12px">
                    {{ scope.row.transactionHash }}
                  </div>
                  <el-button slot="reference" :disabled="disabledButton" style="border:none;padding:5px 0 5px;font-size:12px" @click.native="goToNetwork(scope.row)">{{ scope.row.transactionHash && scope.row.transactionHash.length>16?scope.row.transactionHash.slice(0,8) + '****' + scope.row.transactionHash.slice(scope.row.transactionHash.length-8,scope.row.transactionHash.length):scope.row.transactionHash }}<i :class="scope.row.transactionHash.length>0?'el-icon-arrow-right el-icon--right':''" /></el-button>
                </el-popover>

              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="Email"
              align="center"
              width="190"
            />
            <el-table-column
              prop="failReason"
              label="Fail ReaSon"
              align="center"
              width="200"
            />
            <el-table-column
              prop="completeTime"
              label="Complete Time"
              align="center"
              width="190"
            />
            <el-table-column
              prop="orderStatus"
              label="Status"
              align="center"
              width="190"
              fixed="right"
            />

          </el-table>

        </div>
      </div>
      <div v-if="total>1" class="payment-pagination">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :current-page="paramsData.page"
          :page-size="paramsData.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderList, getdownLoad } from '@/api/user'
import { parseTime } from '@/utils/index.js'
export default {
  name: 'Transcation',
  data() {
    return {
      // active: 1,
      timeList: '',
      tableHeight: 46,
      timeOut: null,
      disabledButton: false,
      paramsData: {
        merchantNo: '',
        email: '',
        startDate: '',
        endDate: '',
        page: 1,
        pageSize: 10,
        flag: 1,
        orderStatus: ''
      },
      sellOrder: [],
      sellOrder1: [],
      total: '0',
      loading: true,
      optionsSell: [{
        value: '',
        label: 'All'
      }, {
        value: '0,1',
        label: 'Penging'
      }, {
        value: '1,3',
        label: 'Wait payment'
      }, {
        value: '2',
        label: 'Confirming'
      },
      {
        value: '3',
        label: 'Waiting payment'
      },
      {
        value: '4',
        label: 'Paying'
      },
      {
        value: '5',
        label: 'Payment success'
      },
      {
        value: '6',
        label: 'Payment fail'
      },
      {
        value: '7',
        label: 'Expired'
      },
      {
        value: '8',
        label: 'Waiting refund'
      },
      {
        value: '9',
        label: 'Redunding'
      },
      {
        value: '10',
        label: 'Redund'
      },
      {
        value: '11',
        label: 'Redund fail'
      }
      ],
      optionsBuy: [{
        value: '',
        label: 'All'
      }, {
        value: '0',
        label: 'Payment fail'
      }, {
        value: '1,3,4',
        label: 'Wait payment'
      }, {
        value: '2',
        label: 'Payment success'
      },
      {
        value: '5',
        label: 'complete'
      },
      {
        value: '6',
        label: 'Expired'
      }

      ]
    }
  },
  watch: {
    timeList: {
      // deep: true,
      handler(val) {
        // console.log(parseTime)
        if (val != null && val.length > 0) {
          this.paramsData.startDate = parseTime(this.timeList[0], '{y}-{m}-{d}')
          this.paramsData.endDate = parseTime(this.timeList[1], '{y}-{m}-{d}')
          this.getSellandBuyOrderList()
        } else {
          this.paramsData.startDate = ''
          this.paramsData.endDate = ''
          this.getSellandBuyOrderList()
        }
      }
    },
    'paramsData.email': {
      deep: true,
      handler(newVal) {
        if (!newVal) {
          this.getSellandBuyOrderList()
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
    this.getSellandBuyOrderList()
  },
  methods: {
    // 搜索用户邮箱
    searchDataEmail() {
      clearTimeout(this.timeOut)
      this.paramsData.email = this.paramsData.email.trim()
      this.paramsData.page = 1
      this.disabledButton = true
      this.getSellandBuyOrderList()
      this.timeOut = setTimeout(() => {
        this.disabledButton = false
      }, 1000)
    },
    // 请求商户买卖币的订单列表
    getSellandBuyOrderList() {
      // console.log(this.$store.state.user.name.merchantNo)
      this.loading = true
      this.paramsData.merchantNo = this.$store.state.user.name.merchantNo
      getOrderList(this.paramsData).then(res => {
        if (res.returnCode === '0000' && res.data) {
          this.loading = false
          if (this.paramsData.flag === 1) {
            this.sellOrder = res.data.orderList
            this.total = res.data.total
          } else {
            this.sellOrder1 = res.data.orderList
            this.total = res.data.total
            return
          }
        }
      }).catch(() => {
        this.loading = false
      })
      // this.loading = false
    },
    // 更改页数
    handleCurrentChange(val) {
      this.paramsData.page = val
      this.getSellandBuyOrderList()
    },
    // 选择sell 或 buy
    changeSellAndBuy(val) {
      this.paramsData.flag = val
      this.paramsData.orderStatus = ''
      this.paramsData.email = ''
      this.paramsData.page = 1
      // if (val === this.paramsData.flag) {
      //   return
      // }
      if (val === 1) {
        this.getSellandBuyOrderList()
        return
      } else {
        this.getSellandBuyOrderList()
        this.total = 0
      }
    },
    // 根据网络进行跳转
    goToNetwork(val) {
      if (val.network === 'TRX' && val.transactionHash) {
        window.open('https://tronscan.org/#/transaction/' + val.transactionHash)
        return
      } else if (val.network === 'BSC' && val.transactionHash) {
        window.open('https://bscscan.com/tx/' + val.transactionHash)
        return
      } else if (val.network === 'BTC' && val.transactionHash) {
        window.open('https://btc.tokenview.com/cn/tx/' + val.transactionHash)
        return
      } else if (val.network === 'ETH' && val.transactionHash) {
        window.open('https://etherscan.io/tx/' + val.transactionHash)
        return
      } else {
        this.$message({
          type: 'error',
          message: 'The network cannot be turned on at this time'
        })
        this.disabledButton = true
        setTimeout(() => {
          this.disabledButton = false
        }, 3000)
      }
    },
    // 选择更改
    selectBuy(val) {
      // if (val || val === '') {
      this.getSellandBuyOrderList()
      // }
    },
    // 下载
    getdownLoadList() {
      getdownLoad(this.paramsData).then(res => {
        if (res) {
          var myDate = new Date()
          const url = window.URL.createObjectURL(res)
          const link = document.createElement('a')
          link.download = 'Transaction ' + parseTime(myDate, '{y}-{m}-{d}') + '.xls'
          link.style.display = 'none'
          link.href = url
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
          this.$message({
            type: 'success',
            message: 'download success'
          })
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
  .offRamp-container{
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    background: #F4F7FE;
    padding: 0px 30px 0;
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
        font-family: RobotoBold;
        background: #FFFFFF;
        box-shadow: 0px -15px 20px -5px rgba(177, 202, 239, 0.5);
        position: relative;
        z-index: 2;
      }
    }
      .offRamp-content{
        width: 100%;
        height: 88%;
        background: #FFFFFF;
        box-shadow: 0px 0px 20px 0px rgba(177, 202, 239, 0.5);
        border-radius: 20px;
        position: relative;
        z-index: 1;
        top: 10px;
        padding: 20px 50px 0;
        .offRamp-conTop{
          width: 200%;
          display: flex;
          margin-top: 20px;
          color: #5A6070FF;
          // background: #FBFCFF;
          font-family: RobotoLight;
          div{
            width: 100px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            font-size: 12px;
            background: #FBFCFF;
            border: 1px solid #E8EAEEFF;
            cursor: pointer;
          }
          div:first-child{
            border-radius: 5px 0 0 5px;
            border-right: none;
          }
          div:last-child{
            border-radius: 0px 5px 5px 0px;
            // border-right: none;
          }
          .active{
            background: #40A1FBFF;
            color: #FFFFFF;
          }
        }
        .offRamp-con{
          width: 100%;
          ::v-deep .el-table__empty-block {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
          }
            .el-table{
              width: 100% !important;
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
                height: 45px !important;
                padding: 0 !important;
                background: #F4F7FF;
              }
              & ::v-deep th, td{
                font-family: SF Pro !important;
                color: #123077;
                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;
              }
              & ::v-deep .el-table__row td{
                  font-family: SF Pro !important;
                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;
              }
              & ::v-deep.cell{
                font-family: SF Pro !important;
                line-height: 18px !important;
              }
              & ::v-deep tr td{
                padding: auto;
                line-height: 10px !important;
                border-bottom: 1px solid #E8EAEE;
              }
            }
        }
      }
  }
  .order-top{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 12px;
    >div{
      margin-right: 20px;
    }
    // justify-content: space-between;
    .el_date{
      display: flex;
      width: 220px;
      margin-right: 20px;

     ::v-deep .el-date-editor{
       width: 100%;
       font-family: RobotoLight;
       input{
          font-size: 12px;
       }
     }
    }
    .el_search{
      height: 100%;
      display: flex;
      align-items: center;
      ::v-deep .el-input{
        border-radius: 5px 0 0 5px;
      }
      ::v-deep .el-input::placeholder{
        font-size: 12px;
      }
      ::v-deep .el-input input{
        border-right: none;
        font-family: RobotoLight;
        border-radius: 5px 0 0 5px;
        font-size: 12px;
      }
      ::v-deep .el-button{
        // background: #40A1FBFF;
        color: #FFFFFF;
        font-family: RobotoBold;
        border-radius:  0 5px 5px 0;
      }
    }
    .el_select{
      ::v-deep input{
        width: 140px;
        font-size: 12px;
      }
    }
    .el_download{
      .el-button{
        // display: flex;
        // align-items: center;
       span{
          font-size: 12px;
          font-family: RobotoBold;
          margin: 0;
          // margin-left: 5px;
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
