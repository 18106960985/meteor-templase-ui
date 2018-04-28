import request from '@/utils/request'
import {API_ROOT}from '@/utils/lib/commonConstant'
var qs = require('qs');
const API = API_ROOT + "generate"
export function getPage(obj){
  return request({
    url: API + "/page",
    method: 'get',
    params: obj
  })
}


export function  exportCode(obj){
  return request({
    url: API + "/code",
    method: 'post',
    params: {
      tableNames: obj
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    },
    responseType:'blob'
  })

  // return request.post(API + '/code' , qs.stringify({ tableNames: params }, { arrayFormat: 'repeat' }) ,{responseType:'blob'}  );
}
