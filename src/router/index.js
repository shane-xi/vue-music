import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Curd from '@/components/Curd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Curd',
      component: Curd
    }
  ]
})
