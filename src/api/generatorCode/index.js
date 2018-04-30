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
  location.href= API+"/code?tableNames="+obj;
}
