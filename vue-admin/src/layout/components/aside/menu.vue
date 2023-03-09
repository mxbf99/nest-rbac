<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import MenuItem from './menu-item.vue'
import { findActiveMenu, type IUserMenu } from '@/utils/menu-route'
import { computed } from 'vue'
import useSettingStore from '@/stores/user'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const settingStore = useSettingStore()
const menus = settingStore.menus

const router = useRouter()
const handleClick = (item: IUserMenu) => {
  const { url, link } = item
  if (link) return window.open(url, '_blank')
  router.push(url)
}

const route = useRoute()
const defaultActive = computed(() => {
  const { path } = route
  const activeMenu = findActiveMenu(menus, path)
  if (activeMenu) {
    return activeMenu.url
  } else {
    return '/dashboard'
  }
})
</script>
<template>
  <div class="menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" class="img" />
      <span class="title" v-show="!isCollapse">vueadmin</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <template v-for="item in menus" :key="item.id">
        <el-menu-item
          :index="item.url"
          @click="handleClick(item)"
          v-if="(item.children?.length === 0 || item.link) && !item.hidden"
        >
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
        <el-sub-menu
          :index="item.url"
          v-if="item.children?.length > 0 && !item.hidden"
        >
          <template #title>
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <menu-item :menuList="item.children"></menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<style lang="less" scoped>
.el-menu {
  border: none;
  user-select: none;
}

.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.menu {
  height: 100%;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15px;

  .img {
    width: 34px;
    height: 34px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    margin-left: 5px;
    overflow: hidden;
  }
}
</style>
