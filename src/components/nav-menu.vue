<template>
  <el-menu
    class="el-menu-vertical"
    :default-active="activeId"
    :collapse="collapse"
    background-color="#0c2135"
    text-color="#b7bdc3"
    active-text-color="#0a60bd"
  >
    <template v-for="subItem in menuList" :key="subItem.id">
      <template v-if="subItem.type === 1">
        <el-sub-menu :index="subItem.id + ''">
          <template #title>
            <i :class="subItem.icon"></i>
            <span>{{ subItem.name }}</span>
          </template>
          <template v-for="item in subItem.children" :key="item.id">
            <template v-if="item.type === 2">
              <el-menu-item :index="item.id + ''" @click="toRouter(item)">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="subItem.id + ''">
          <i :class="subItem.icon"></i>
          <span>{{ subItem.name }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue"
import { storeType } from "@/store"

import { useRouter, useRoute } from "vue-router"
import { mapRouteUrl } from "@/utils/mapMenu/mapMenu"

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = storeType()
    const activeId = ref("")
    const menuList = computed(() => store.state.login.menus)
    activeId.value = mapRouteUrl(menuList.value, route.path)?.id.toString()

    const toRouter = (item: any) => {
      router.push({
        path: item.url || ""
      })
    }
    return {
      menuList,
      toRouter,
      activeId
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
}
</style>

