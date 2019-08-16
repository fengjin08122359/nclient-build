import Vue from 'vue'
import Router from 'vue-router'

const Main = () => import('../pages/Main.vue')

Vue.use(Router);

var router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ],
})

router.beforeEach((to, from, next)=>{
  next()
})

export default router