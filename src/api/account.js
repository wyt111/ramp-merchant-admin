import request from '@/utils/request'

export function postEditPassword(data) {
  return request({
    url: '/account/password/modify',
    method: 'post',
    data
  })
}

export function getAccountDetail() {
  return request({
    url: '/account/detail',
    method: 'get'
  })
}

export function getBindGoogleInfo() {
  return request({
    url: '/account/googleAuth/toBind',
    method: 'get'
  })
}

export function postBindGoogle(data) {
  return request({
    url: '/account/googleAuth/bind',
    method: 'post',
    data
  })
}

export function postRefreshAppSecret(data) {
  return request({
    url: '/account/appSecret/modify',
    method: 'post',
    data
  })
}

export function postSaveIp(data) {
  return request({
    url: '/account/ip/modify',
    method: 'post',
    data
  })
}

export function postCheckCode(data) {
  return request({
    url: '/account/authCode/check',
    method: 'post',
    data
  })
}

export function getFreezeCheck(data) {
  return request({
    url: '/account/freeze/check',
    method: 'get',
    data
  })
}

