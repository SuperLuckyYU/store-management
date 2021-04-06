import request from '@/utils/request'

// 查询区域统计数据
export function getStatisticInfo(id) {
  return request({
    url: '/business/statistics/' + id,
    method: 'get',
  })
}
