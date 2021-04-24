import request from '@/utils/request'

// 查询交易列表
export function listTransaction(query) {
  return request({
    url: '/business/transaction/list',
    method: 'get',
    params: query
  })
}

// 查询交易详细
export function getTransaction(id) {
  return request({
    url: '/business/transaction/' + id,
    method: 'get'
  })
}

// 新增交易
export function addTransaction(data) {
  return request({
    url: '/business/transaction',
    method: 'post',
    data: data
  })
}

// 修改交易
export function updateTransaction(data) {
  return request({
    url: '/business/transaction',
    method: 'put',
    data: data
  })
}

// 删除交易
export function delTransaction(id) {
  return request({
    url: '/business/transaction/' + id,
    method: 'delete'
  })
}

// 导出交易
export function exportTransaction(query) {
  return request({
    url: '/business/transaction/export',
    method: 'get',
    params: query
  })
}

// 添加交易
export function payTransation(data) {
  return request({
    url: '/business/pay',
    method: 'post',
    data: data
  })
}
