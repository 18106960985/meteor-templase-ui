import Mock from 'mockjs'
import { param2Obj } from '@/utils'

// 表格数据模拟

const List=[];
const count=100;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    account: 'meteor@increment',
    name: '@first',
    sex: '@integer(0, 2)',
    description: '@title(5, 10)',
    updTime: '@datetime',
    updName: '@first'
  }))
}

export default {
  page: (config) => {
    //从url中拦截数据
    console.log(config)
    const {  name, page = 1, limit = 20, sort } = param2Obj(config.url)
    //过滤数据
    let mockList = List.filter(item => {
      if (name && item.title.indexOf(name) < 0) return false
      return true
    })
    // 排序
    if (sort === '-id') {
      mockList = mockList.reverse()
    }
    //分页
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getTable:()=>({//表格数据
      id:1,
      name:' 七月流星',
      account:"admin",
      sex: 1,
      description:'初级全栈攻城师',
      updTime: +new Date(),
      updName:'七月流星',
  }),
  createTable:()=>({
    message:'success'
  }),
  updateTable:()=>({
    message:'success'
  })
}
