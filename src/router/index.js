import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/enroll',
    component: () => import('@/views/enroll/index'),
    hidden: true,
    meta: { title: 'Individual Applicati' }
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/order',
  //   active: true,
  //   children: [{
  //     path: '/order',
  //     name: 'Order',
  //     component: () => import('@/views/order/index'),
  //     meta: { title: 'Order', icon: 'over', icon1: 'iconRight', Images: require('@/assets/menu-images/over.png'), ImgActive: require('@/assets/menu-images/overSelect.png'), active: true }
  //   }]
  // },

  // {
  //   path: '/cryptos',
  //   component: Layout,
  //   active: false,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Cryptos',
  //       component: () => import('@/views/cryptos/index'),
  //       meta: { title: 'Cryptos', icon: 'Vector', icon1: 'iconRight', Images: require('@/assets/menu-images/Property.png'), ImgActive: require('@/assets/menu-images/PropertySelect.png'), active: false }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/transaction',
    children: [
      {
        path: '/transaction',
        name: 'Transaction',
        component: () => import('@/views/transcation/index'),
        meta: { title: 'nav.Orders_title', icon: 'payment', icon1: 'iconRight', Images: require('@/assets/menu-images/Union.png'), ImgActive: require('@/assets/menu-images/UnionSelect.png'), active: false }
      }
    ]
  },

  // {
  //   path: '/Application',
  //   component: Layout,
  //   children: [{
  //     path: '/Application',
  //     name: 'Application',
  //     component: () => import('@/views/Application/index'),
  //     meta: { title: 'nav.Application_title', icon: 'over', icon1: 'iconRight', Images: require('@/assets/menu-images/applic.png'), ImgActive: require('@/assets/menu-images/applicSelect.png'), active: true },
  //     children: [
  //       {
  //         path: '/Application/collction',
  //         name: 'Application',
  //         component: () => import('@/views/Application/children/collection/index'),
  //         meta: { title: '' }
  //       }
  //     ]
  //   }]
  // },
  {
    path: '/ability',
    component: Layout,
    children: [
      {
        path: '/ability/index',
        name: 'Ability',
        component: () => import('@/views/ability/index'),
        meta: { title: 'nav.Abilty_title', icon: 'payment', icon1: 'iconRight', Images: require('@/assets/menu-images/ability.png'), ImgActive: require('@/assets/menu-images/abilitySelect.png'), active: false },
        children: [
          {
            path: '/ability/index/ramp',
            name: 'Ability',
            component: () => import('@/views/ability/children/ramp/index'),
            meta: { title: '', isActive: 'Ability' }
          },
          {
            path: '/ability/index/crypto',
            name: 'Ability',
            component: () => import('@/views/ability/children/crypto/index'),
            meta: { title: 'Crypto Acquirin', isActive: 'Ability' }
          }
        ]
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    children: [
      {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/account/index'),
        meta: { title: 'nav.account_title', icon: 'payment', icon1: 'iconRight', Images: require('@/assets/menu-images/account.png'), ImgActive: require('@/assets/menu-images/accountSelect.png'), active: false }
      }
    ]
  },
  // {
  //   path: '/order',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     name: 'Order',
  //     component: () => import('@/views/order/index'),
  //     meta: { title: 'Order', Images: require('@/assets/menu-images/Union.png'), ImgActive: require('@/assets/menu-images/UnionSelect.png'), active: false }
  //   }]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
