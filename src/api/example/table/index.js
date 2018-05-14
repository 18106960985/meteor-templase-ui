import request from '@/utils/request'


const API = '/table'
export function page(query){
  return request({
    url: API + '/page',
    method: 'get',
    params:query
  })
}

export function getTable() {
  return request({
    url: API+ '/getTable',
    method:'get'
  })

}

export function addObj(){
  return request({
    url: API+ '/add',
    method: 'post'
  })
}

export function putObj(){
  return request({
    url: API +'/put',
    method: 'put'
  })

}
