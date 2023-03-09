<script setup lang="ts">
import type { UserMenu } from '@/utils/menu-route'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  menuList: {
    type: Array as PropType<UserMenu[]>,
    default: () => []
  }
})

const router = useRouter()
const handleClick = (item: UserMenu) => {
  const { url, link } = item
  if (link) return window.open(url, '_blank')
  router.push(url)
}
</script>
<template>
  <div>
    <template v-for="item in menuList" :key="item.id">
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
          <el-icon v-if="item.icon"> <component :is="item.icon" /> </el-icon
          ><span>{{ item.title }}</span></template
        >
        <menu-item :menuList="item.children"></menu-item>
      </el-sub-menu>
    </template>
  </div>
</template>
<style lang="less" scoped>
.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
