<template>
  <div class="offRamp-container">
    <div class="offRamp-title">
      <p :class="active==1?'active':''" @click="active=1">pay In</p>
      <p :class="active==2?'active':''" @click="active=2">pay Out</p>
    </div>
    <div v-if="active==1" class="offRamp-content">
      <div class="offRamp-con">
        <el-table
          ref="table"
          max-height="500"
          :data="paymentData.result"
          border
          :lazy="true"
        >
          <el-table-column

            label="收款方式"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover" style="margin-right:20px">
                <img :src="scope.row.logoUrl" alt="" style="width: 150px;height: 150px">
                <img slot="reference" :src="scope.row.logoUrl" style="width: 30px;height: 30px;">
              </el-popover>
              <span style="position: absolute;top:15px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sellEnable"
            label="收款币种"
            align="center"
          />
          <el-table-column
            prop="network"
            label="结算币种"
            align="center"
          />
          <el-table-column
            prop="price"
            label="Fee"
            align="center"
          />
          <el-table-column
            prop="sellEnable"
            label="Settlement Period"
            align="center"
          />
          <el-table-column
            label="Action"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.buyEnable"
              />
            <!-- <el-button type="text" size="small" style="font-weight: bold">Detail</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- <div v-if="total>1" class="payment-pagination">
          <el-pagination
            background
            layout="prev, pager, next, total"
            :current-page="formInline.pageNo"
            :page-size="formInline.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div> -->
      </div>
    </div>
    <div v-if="active==2" class="offRamp-content">
      <div class="offRamp-con">
        <el-table
          ref="table"
          :height="tableHeight"

          border
          :lazy="true"
        >
          <el-table-column
            prop="sellEnable"
            label="收款方式"
            align="center"
          />
          <el-table-column
            prop="network"
            label="收款币种"
            align="center"
          />
          <el-table-column
            prop="price"
            label="通道"
            align="center"
          />
          <el-table-column
            prop="sellEnable"
            label="Fee"
            align="center"
          />

        </el-table>
        <!-- <div v-if="total>1" class="payment-pagination">
          <el-pagination
            background
            layout="prev, pager, next, total"
            :current-page="formInline.pageNo"
            :page-size="formInline.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OffRamp',
  data() {
    return {
      active: 1,
      paymentData: {
        'total': 89,
        'pageIndex': 1,
        'result': [
          {
            'name': 'ACH',
            'fullName': 'Alchemy Pay',
            'network': 'BSC',
            'price': 1.83000000,
            'logoUrl': 'https://alchemywalletdownload.oss-cn-hongkong.aliyuncs.com/alchemypay/crypto-images/1INCH.svg',
            'buyEnable': 1, // 1-是，0-否
            'sellEnable': 1
          },
          {
            'name': 'AAVE',
            'fullName': 'Aave',
            'network': 'ETH',
            'logoUrl': 'https://alchemywalletdownload.oss-cn-hongkong.aliyuncs.com/alchemypay/crypto-images/AAVE.svg',
            'buyEnable': 1,
            'sellEnable': 1
          },
          {
            'name': 'ACH',
            'fullName': 'Alchemy Pay',
            'network': 'ETH',
            'logoUrl': 'https://alchemywalletdownload.oss-cn-hongkong.aliyuncs.com/alchemypay/crypto-images/ACH.svg',
            'buyEnable': 1,
            'sellEnable': 1
          }
        ],
        'totalPage': 9
      },

      tableHeight: 46
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.tableHeight = window.innerHeight - 370
    // }, 100)
  }
}
</script>
<style lang="scss" scoped>
  .offRamp-container{
    width: 100%;
    height: 95%;
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
                color: #123077;
                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;
              }
              & ::v-deep .el-table__row td{

                border-bottom: 1px solid #E8EAEE;
                border-right: 1px solid #E8EAEE;
              }
              & ::v-deep tr td{
                border-bottom: 1px solid #E8EAEE;
              }
            }
        }
      }
  }
</style>
