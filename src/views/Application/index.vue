<template>
  <div ref="application" class="application-container">
    <div class="order-content">
      <el-table
        ref="table"
        :height="tableHeight"
        :data="paymentData"
        max-height="600"
        border
        :lazy="true"
        :cell-style="{padding: '4px 0 4px 0'}"
        :header-cell-style="{fontFamily:'SF Pro !important'}"
      >
        <el-table-column
          prop="appName"
          label="Application Name"
          align="center"
          width="140"
        />
        <el-table-column
          prop="appId"
          label="App ID"
          align="center"
          width="160"
        />
        <el-table-column
          prop="appSecrete"
          label="Secret"
          align="center"
          width="100"
        />
        <el-table-column
          prop="productCode"
          label="Product"
          align="center"
          width="110"
        />
        <el-table-column
          prop="callbackUrl"
          label="Callback Url"
          align="center"
          min-width="180"
        />
        <!-- <el-table-column
          prop="ipConfig"
          label="IP"
          align="center"
          width="100"
        /> -->
        <el-table-column
          label="Creation Time"
          align="center"
          prop="createdTime"
          width="160"
        />
        <el-table-column
          label="Status"
          align="center"
          width="70"
        >
          <template slot-scope="scope">
            {{ scope.row.status==1?$t('nav.application_enable'):$t('nav.application_disable') }}
          </template>
        </el-table-column>
        <el-table-column
          label="Action"
          align="center"
          width="100"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">{{ $t('nav.application_View') }}</el-button>
            <el-button type="text" size="small" @click="handleState(scope.row)">{{ scope.row.status==1?$t('nav.application_Take'):$t('nav.application_lapse') }}</el-button>
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
    <router-view />
  </div>
</template>
<script>

import { merchantList, setApplication } from '../../api/user'
export default {
  name: 'Application',
  data() {
    return {
      tableHeight: 45,
      paymentData: [
        {
          Application: '0'
        }
      ]
    }
  },
  watch: {
    '$store.state.user.productCode': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          sessionStorage.setItem('vuex', JSON.stringify(this.$store.state))
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - (window.innerHeight - this.$refs.application.clientHeight) - 80
    }, 100)
    this.merchantListApp()
  },
  methods: {
    handleClick(val) {
      this.$router.push({
        path: '/Application/collction',
        query: {
          id: val.merchantAppId
        }

      })
      // console.log(val)
    },
    handleState(val) {
      val.status = !val.status
      val.status = val.status === true ? 1 : 0
      setApplication(val, val.merchantAppId).then(res => {
        // console.log(res)
        if (res.returnCode === '0000') {
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.merchantListApp()
        }
      })
    },
    merchantListApp() {
      merchantList().then(res => {
        if (res.returnCode === '0000' && res.data) {
          this.paymentData = res.data
          // console.log(res.data)
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.application-container{
  width: 95%;
  height: 93%;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgb(177 202 239 / 50%);
   border-radius: 10px;
  padding: 30px  40px 30px;
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translate(-50%,-50%);
  // margin: 20px auto 0;
  // position: relative;
   .order-content{
    width: 100%;
    margin: 20px 0 0 0px;
    .payment-pagination{
      margin-top: 10px;
      display: flex;
    justify-content: center;
    }
    .el-table{
  font-size: 12px;
  font-family: 'SF Pro';
  font-weight: 400;
  color: #333333;
  border-radius: 5px;
  & ::v-deep thead{
    font-size: 12px;
    font-family: 'SF Pro';
    font-weight: 400;
    color: #333333;
  }
  & ::v-deep th{
    background: #F7F9FC;
  }
  & ::v-deep th, td{
    color: #123077;
    font-family: SF Pro;
    border-bottom: 1px solid #E8EAEE;
    border-right: 1px solid #E8EAEE;
  }
  & ::v-deep .el-table__row td{
    color: #5A6070;
    border-bottom: 1px solid #E8EAEE;
    border-right: 1px solid #E8EAEE;
  }
  & ::v-deep tr td{
    border: 1px solid #E8EAEE;
  }
}
.el-table--group, .el-table--border{
  border: 1px solid #E8EAEE;
}
  }
  .payment-pagination{
    ::v-deep .number{
      background: #FFFFFF;
      font-family: 'SF Pro';
      color: #9AA8C3;
      font-size: 12px;
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
}
</style>
