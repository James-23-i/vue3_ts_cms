import { storeType } from "@/store"
import { computed, ref, watch } from "vue"

export function useAction(props: any, isQuery: boolean) {
  // 定义分页传参数据
  const pageParams = ref({ pageNum: 1, pageSize: 10 })
  const store = storeType()
  // setup 相对于 created 只会在组件创建的时候执行一次
  const getData = (queryInfo?: any) => {
    if (!isQuery) return
    store.dispatch("system/getPageList", {
      // url: "/users/list",
      name: props.pageName,
      params: {
        offset: (pageParams.value.pageNum - 1) * pageParams.value.pageSize,
        size: pageParams.value.pageSize,
        ...queryInfo
      }
    })
  }
  // 请求接口数据
  getData()
  const pageData = computed(() => store.getters["system/getPageData"](props.pageName))
  const pageTotal = computed(() => store.getters["system/getPageTotal"](props.pageName))

  // 当分页参数发生改变，重新请求接口
  watch(pageParams, () => getData())

  return { getData, pageData, pageTotal, pageParams }
}
