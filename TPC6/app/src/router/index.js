import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/author',
    name: 'Authors',
    component: () => import('../views/Authors.vue')
  },
  ,
  {
    path: '/author/:idAut',
    name: 'Author',
    component: () => import('../views/Author.vue')
  },
  {
    path: '/pubs',
    name: 'Pubs',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pubs.vue')
  },
  {
    path: '/pubs/:idPub',
    name: 'Pub',
    component: () => import('../views/Pub.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
