<template>
  <div class="successful-container">
    <img src="@/assets/logos/successful.png" alt="">
    <p>Submitted successful</p>
    <div>We will notify you of the audit result by email within 24 hours, or you can contact your email address
      Inquiry about progress: {{ $store.state.user.ruleForm.contactEmail }}</div>
  </div>
</template>
<script>

export default {
  name: 'Successful'
}
</script>
<style lang="scss" scoped>
.successful-container{
  width: 500px;
  text-align: center;
  img{
    width: 80px;
    height: 80px;
    margin-top: 90px;
  }
  p{
    font-size: 16px;
    font-family:  SF  Pro;
    font-weight: bold;
    color: #5A6070;
    line-height: 19px;
    margin: 0;
    padding: 0;
    margin-top: 20px;
  }
  div{
    font-size: 12px;
    font-family: SF  Pro;
    font-weight: 400;
    color: #A7A7A7;
    line-height: 14px;
    text-align: left;
    margin-top: 20px;
  }
}
</style>
