import request from '@/utils/request'

// 查询商铺信息列表
export function listStore(query) {
  return request({
    url: '/business/store/list',
    method: 'get',
    params: query
  })
}

// 查询商铺信息详细
export function getStore(id) {
  return request({
    url: '/business/store/' + id,
    method: 'get'
  })
}

// 新增商铺信息
export function addStore(data) {
  return request({
    url: '/business/store',
    method: 'post',
    data: data
  })
}

// 修改商铺信息
export function updateStore(data) {
  return request({
    url: '/business/store',
    method: 'put',
    data: data
  })
}

// 删除商铺信息
export function delStore(id) {
  return request({
    url: '/business/store/' + id,
    method: 'delete'
  })
}

// 导出商铺信息
export function exportStore(query) {
  return request({
    url: '/business/store/export',
    method: 'get',
    params: query
  })
}