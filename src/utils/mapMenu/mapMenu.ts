import { IBreadItem } from '@/components/types'
import { RouteRecordRaw } from 'vue-router'

export let firstMenu: any = null

export function mapMenu(menu: any[]): RouteRecordRaw[] {
  // 1、默认先加载所有路由
  const routes: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = []
  // 查找路径
  const filePath = require.context('../../router/main', true, /\.ts/)
  // 拼接
  filePath.keys().forEach(item => {
    const route = require('../../router/main' + item.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2、根据菜单获取路由
  const _useMenuFun = (menu: any[]) => {
    // 遍历菜单
    menu.map(item => {
      if (item.type === 2) {
        // 当type为2时，查找对应菜单
        const route = allRoutes.find(v => v.path === item.url)
        if (route) routes.push(route)
        // 保留第一个菜单
        if (!firstMenu) {
          firstMenu = route
        }
      } else {
        // 当type为1时，递归调用
        _useMenuFun(item?.children)
      }
    })
  }
  _useMenuFun(menu)

  return routes
}

export function breadUrl(menu: any[], path: string) {
  const breadList: IBreadItem[] = []
  mapRouteUrl(menu, path, breadList)
  return breadList
}

// 使用递归获取路由url
export function mapRouteUrl(menu: any[], path: string, breadList?: IBreadItem[]): any {
  // return menu.map(item => {
  //   if (item.type === 1) {
  //     const list = mapRouteUrl(item?.children || [], path)
  //     if (list) return list
  //   }
  //   if (item.type === 2 && item.url === path) {
  //     debugger
  //     return item
  //   }
  // })
  for (const item of menu) {
    if (item.type === 1) {
      const list = mapRouteUrl(item?.children || [], path)
      // 必须在list存在时才return，当type为2时不存在，就return item
      if (list) {
        breadList?.push({ name: item.name, path: item.url })
        breadList?.push({ name: list.name, path: list.url })
        return list
      }

    } else if (item.type === 2 && item.url === path) {
      return item
    }
  }
}

// 返回菜单按钮权限数组
export function getPermission(menuList: any[]) {
  const permissonArr: string[] = []
  const _treeData = (menu: any[]) => {
    menu.map(item => {
      if (item.type === 1 || item.type === 2) {
        _treeData(item.children || [])
      } else if (item.type === 3) {
        permissonArr.push(item.permission)
      }
    })
  }
  _treeData(menuList)
  return permissonArr
}

// 根据角色返回对应的菜单权限
export function getRoleLeaf(menuList: any[]) {
  const leafArr: string[] = []
  const _treeData = (menu: any[]) => {
    menu.map(item => {
      if (item.children) {
        _treeData(item.children || [])
      } else {
        leafArr.push(item.id)
      }
    })
  }
  _treeData(menuList)
  return leafArr
}

