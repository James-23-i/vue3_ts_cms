import pageContent from "@/components/page-content.vue"
import { ref } from "vue"

export function usePage() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const queryForm = (val: any) => {
    // 网络请求
    pageContentRef.value?.getData(val)
  }
  const resetForm = () => {
    // 网络请求
    pageContentRef.value?.getData()
  }
  return {queryForm, resetForm, pageContentRef}
}
