import Mock from 'mockjs'
import loginAPI from './login'
import tableAPI from './tableData'

// 模拟数据API

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

//表格相关
Mock.mock(/\/table\/page/, 'get', tableAPI.page)
Mock.mock(/\/table\/getTable/, 'get', tableAPI.getTable())
Mock.mock(/\/table\/add/, 'post', tableAPI.createTable)
Mock.mock(/\/table\/put\.*/, 'put', tableAPI.updateTable)

export default Mock
