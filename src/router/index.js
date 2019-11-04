import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/test/localStorage'
  },
  {
    path: '/test/localStorage',
    name: 'localStorage',
    component: () => import('@/views/test/localStorage.vue'),
  },
  {
    path: '/ebook',
    name: 'ebook',
    component: () => import('@/views/reader/index.vue'),
    children: [
      {
        path: ':filename',
        component: () => import('@/components/ebook/EbookReader/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
