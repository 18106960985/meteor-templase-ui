import request from '@/utils/request'
import {API_ROOT}from '@/utils/lib/commonConstant'
var qs = require('qs');
const API = API_ROOT + "generator"
export function getPage(obj){
  return request({
    url: API + "/page",
    method: 'get',
    params: obj
  })
}


export function  exportCode(params){
  return request.post(API + '/code' , qs.stringify({ tableNames: params }, { arrayFormat: 'repeat' }));
}

