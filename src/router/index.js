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
        meta:{ title:'generatorCode', icon: 'generator', onChange:true}
      },

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
