import Vue from 'vue'
import Router from 'vue-router'
export const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'introduction',
    meta:{ title:'introduction', icon: 'introduction', onChange:true},
    children: [
      {
        path: 'introduction',
        component: _import('introduction/index'),
        name: 'introduction',
        meta:{ title:'introduction', icon: 'introduction', onChange:true}
      },
      {
        path: 'generatorCode',
        component: _import('app/generatorCode/index'),
        name: 'generatorCode',
        meta:{ title:'generatorCode', icon: 'generate_code', onChange:true}
      },

    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'introduction',
    meta:{ title:'introduction', icon: 'introduction', onChange:true},
    children: [
      {
        path: 'introduction',
        component: _import('introduction/index'),
        name: 'introduction',
        meta:{ title:'introduction', icon: 'introduction', onChange:true}
      },
      {
        path: 'generatorCode',
        component: _import('app/generatorCode/index'),
        name: 'generatorCode',
        meta:{ title:'generatorCode', icon: 'generate_code', onChange:true}
      },

    ]
  },
  { //模板示例
    path: '/example',
    component: Layout,
    redirect: '/example/table/components-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('app/example/table/index'),
        redirect: '/example/table/components-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'components-table', component: _import('app/example/table/componentsTable/index'), name: 'componentsTable', meta: { title: 'componentsTable' }}
        ]
      }
    ]
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/**
 *  动态的菜单列表
 * @type {Array}
 */
export const asyncRouterMap = [

]
