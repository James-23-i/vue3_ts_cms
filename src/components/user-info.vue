<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar style="margin-right: 10px" size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="logout">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户管理</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { ElMessageBox, ElMessage } from "element-plus"
import { storeType } from "@/store"
import { useRouter } from "vue-router"
import Cache from "@/utils/cache/cache"

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = storeType()
    const name = computed(() => store.state.login.userInfo.name)
    const logout = () => {
      ElMessageBox.confirm("确定要退出登录吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          router.push("/login")
          Cache.delCache("token")
          Cache.delCache("userInfo")
          Cache.delCache("menus")
          ElMessage({
            type: "success",
            message: "退出登录"
          })
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消登录"
          })
        })
    }
    return {
      name,
      logout
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>


