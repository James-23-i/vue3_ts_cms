import { ref, computed } from "vue"
import { storeType } from "@/store"
import pageModal from '@/components/page-modal.vue'

export function useModal() {
  const isEdit = ref(false)
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const store = storeType()
  const editId = ref("")
  const detailData = computed(() => store.state.system.detailData)
  const modalTitle = ref("")
  const modalVisible = ref(false)
  return { pageModalRef, editId, detailData, modalTitle, isEdit, store, modalVisible }
}
