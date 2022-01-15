import { App } from "vue"
import "element-plus/dist/index.css"
import {
  ElButton, ElForm, ElFormItem, ElTable, ElTabs, ElTabPane,
  ElInput, ElCheckbox, ElLink, ElContainer, ElAside,
  ElHeader, ElMain, ElSubMenu, ElMenu, ElMenuItem, ElIcon,
  ElDropdown, ElDropdownItem, ElDropdownMenu, ElAvatar, ElMessageBox,
  ElMessage, ElRow, ElCol, ElSelect, ElOption, ElDatePicker,
  ElBreadcrumb, ElBreadcrumbItem, ElTableColumn, ElSwitch,
  ElPagination, ElImage, ElDialog, ElTree, ElCard
} from "element-plus"
import pageSearch from "@/components/page-search.vue"
import pageContent from "@/components/page-content.vue"
import pageModal from "@/components/page-modal.vue"
import Tree from "@/base-ui/tree/YhTree.vue"
import Card from "@/base-ui/card/YhCard.vue"
import BaseEchart from '@/base-ui/echart/base-echart.vue'

const components = [ElLink, ElButton, ElForm, ElFormItem,
  ElTable, ElTabs, ElTabPane, ElInput, ElCheckbox,
  ElContainer, ElHeader, ElMain, ElSubMenu, ElMenu,
  ElAside, ElMenuItem, ElIcon, ElDropdownItem,
  ElDropdown, ElDropdownMenu, ElAvatar, ElMessageBox,
  ElMessage, ElRow, ElCol, ElSelect, ElOption, ElDatePicker,
  ElBreadcrumb, ElBreadcrumbItem, ElTableColumn, ElSwitch,
  ElPagination, ElImage, ElDialog, ElTree, ElCard
]

export function regComponent(app: App): void {
  for (const item of components) {
    app.component(item.name, item)
  }
  app.component(pageSearch.name, pageSearch)
  app.component(pageContent.name, pageContent)
  app.component(pageModal.name, pageModal)
  app.component(Tree.name, Tree)
  app.component(Card.name, Card)
  app.component(BaseEchart.name, BaseEchart)
}
