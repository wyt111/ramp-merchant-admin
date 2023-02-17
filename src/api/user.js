import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function searchOrder(data) {
  return request({
    url: '/order/query',
    method: 'post',
    data
  })
}
export function getMerchant(data) {
  return request({
    url: '/merchant/crypto/list',
    method: 'post',
    data
  })
}
export function setMerchantState(data) {
  return request({
    url: '/merchant/crypto/updateState',
    method: 'post',
    data
  })
}

export function getpayWatList() {
  return request({
    url: '/merchant/payWay/list',
    method: 'get'
  })
}

export function maechantInit() {
  return request({
    url: '/apply/init',
    method: 'get'
  })
}
// 申请提交列表
export function createMerchant(data) {
  return request({
    url: '/apply/create',
    method: 'post',
    data
  })
}
// 获取app配置列表
export function merchantList() {
  return request({
    url: '/app/list',
    method: 'get'
  })
}
// 查看app
export function getApplication(data, urlId) {
  return request({
    url: '/app/' + urlId,
    method: 'GET',
    data
  })
}
// 修改商户app信息
export function setApplication(data, urlId) {
  return request({
    url: '/app/' + urlId,
    method: 'post',
    data
  })
}
// 能力管理列表
export function getCryptoList(data) {
  return request({
    url: '/crypto/list',
    method: 'GET',
    params: { ...data }
  })
}
// 设置买卖币状态
export function setCryptoState(urlId, data) {
  return request({
    url: '/crypto/' + urlId,
    method: 'post',
    data
  })
}
// 上传图片
export function uploadImages(data) {
  return request({
    url: '/apply/pic/upload',
    method: 'POST',
    data: data
  })
}
// 出款方式请求列表
export function getSellPayout(data) {
  return request({
    url: '/withdraw/list',
    method: 'GET',
    params: { ...data }
  })
}
// 出款方式请求列表
export function getBuyList(data) {
  return request({
    url: '/payment-method/list',
    method: 'GET',
    params: { ...data }
  })
}
// 设置支付方式
export function setCollectionState(urlId, data) {
  return request({
    url: '/payment-method/' + urlId,
    method: 'post',
    data
  })
}
// 设置收款方式
export function setSelltionState(urlId, data) {
  return request({
    url: '/withdraw/' + urlId,
    method: 'post',
    data
  })
}
// 退出登陆
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
// 订单列表
export function getOrderList(data) {
  return request({
    url: 'order/orderList',
    method: 'post',
    data
  })
}
// 下载
export function getdownLoad(data) {
  return request({
    url: 'order/downLoad',
    method: 'post',
    responseType: 'blob',
    data
  })
}
