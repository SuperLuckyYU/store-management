import request from '@/utils/request'

// 查询运维信息列表
export function listMaintain(query) {
  return request({
    url: '/business/maintain/list',
    method: 'get',
    params: query
  })
}

// 查询运维信息详细
export function getMaintain(id) {
  return request({
    url: '/business/maintain/' + id,
    method: 'get'
  })
}

// 新增运维信息
export function addMaintain(data) {
  return request({
    url: '/business/maintain',
    method: 'post',
    data: data
  })
}

// 修改运维信息
export function updateMaintain(data) {
  return request({
    url: '/business/maintain',
    method: 'put',
    data: data
  })
}

// 删除运维信息
export function delMaintain(id) {
  return request({
    url: '/business/maintain/' + id,
    method: 'delete'
  })
}

// 导出运维信息
export function exportMaintain(query) {
  return request({
    url: '/business/maintain/export',
    method: 'get',
    params: query
  })
}