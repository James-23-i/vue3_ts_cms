import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

import Cache from '@/utils/cache/cache'
import { firstMenu } from "@/utils/mapMenu/mapMenu"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "about" */ "@/views/login/Login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import(/* webpackChunkName: "about" */ "@/views/main/Main.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import(/* webpackChunkName: "about" */ "@/views/main/not-found/not-found.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    // 当不是到登录页面 并且没有token时，跳转到login
    const token = Cache.getCache('token')
    if (!token) {
      router.push('/login')
    }
  }

  if (to.path === '/main') {
    router.push(firstMenu)
  }
})

export default router
