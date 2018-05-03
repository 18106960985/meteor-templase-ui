import request from '@/utils/request'


const API = '/table'
export function page(){
  return request({
    url: API + '/page',
    method: 'get'
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
