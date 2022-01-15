<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header" data-flex="main:justify">
          <BreadCrumb :breadList="breadList" />
          <div class="page-info">
            <IconArrow @changeFold="changeFold" />
            <UserInfo />
          </div>
        </el-header>
        <el-main class="page-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import NavMenu from "@/components/nav-menu.vue"
import IconArrow from "@/components/icon-arrow.vue"
import UserInfo from "@/components/user-info.vue"
import BreadCrumb from "@/components/breadcrumb.vue"

import { defineComponent, computed, ref } from "vue"
import { storeType } from "@/store"
import { useRoute } from "vue-router"
import { breadUrl } from "@/utils/mapMenu/mapMenu"

export default defineComponent({
  setup() {
    const isCollapse = ref()
    const changeFold = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    const store = storeType()
    const menuList = computed(() => store.state.login.menus)

    const route = useRoute()
    const breadList = computed(() => breadUrl(menuList.value, route.path))

    return {
      changeFold,
      isCollapse,
      breadList
    }
  },
  components: { NavMenu, IconArrow, UserInfo, BreadCrumb }
})
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
