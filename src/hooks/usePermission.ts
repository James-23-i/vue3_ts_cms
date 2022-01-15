import { storeType } from "@/store"

export function usePermission() {
  const store = storeType()
  const permissArr = store.state.login.permission
  // 根据权限是否展示按钮
  const isBtnPermission = (pageName: string, btnType: string) => {
    const permission = `system:${pageName}:${btnType}`
    return !!permissArr.find(item => item === permission)
  }
  return { isBtnPermission }
}
