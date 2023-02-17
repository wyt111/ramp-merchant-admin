<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>
<style>
.Order_popper {
  background-color: #262627 !important;
  border-color: none !important;
  border-radius: 5px !important;
  color: #fff;
  opacity: .95;
  }
 .Order_popper .popper__arrow::after{
    border-top-color: #262627 !important;
 }

</style>

