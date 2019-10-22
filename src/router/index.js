import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'ebook'
  },
  {
    path: '/ebook',
    name: 'ebook',
    component: () => import('@/views/reader/index.vue'),
    children: [
      {
        path: ':filename',
        component: () => import('@/components/ebook/EbookReader')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
