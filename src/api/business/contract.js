import request from '@/utils/request'

// 查询合同列表
export function listContract(query) {
  return request({
    url: '/business/contract/list',
    method: 'get',
    params: query
  })
}

// 查询合同详细
export function getContract(id) {
  return request({
    url: '/business/contract/' + id,
    method: 'get'
  })
}

// 新增合同
export function addContract(data) {
  return request({
    url: '/business/contract',
    method: 'post',
    data: data
  })
}

// 修改合同
export function updateContract(data) {
  return request({
    url: '/business/contract',
    method: 'put',
    data: data
  })
}

// 删除合同
export function delContract(id) {
  return request({
    url: '/business/contract/' + id,
    method: 'delete'
  })
}

// 导出合同
export function exportContract(query) {
  return request({
    url: '/business/contract/export',
    method: 'get',
    params: query
  })
}