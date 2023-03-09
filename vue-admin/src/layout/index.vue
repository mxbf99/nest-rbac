<script setup lang="ts">
import { ref } from 'vue'
import Menu from './components/aside/menu.vue'
import Header from './components/header/header.vue'

const isCollapse = ref(false)
const collapseChange = (event: boolean) => {
  isCollapse.value = event
}
</script>
<template>
  <el-container class="layout-container">
    <el-aside :width="isCollapse ? '64px' : '208px'">
      <Menu :is-collapse="isCollapse"></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header @collapse-change="collapseChange"></Header>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <template v-if="$route.meta.cache">
            <keep-alive>
              <component :is="Component">111</component>
            </keep-alive>
          </template>
          <template v-else>
            <component :is="Component"></component>
          </template>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="less" scoped>
.el-aside {
  background: var(--el-bg-color);
  overflow-x: hidden;
  transition: all 0.3s;
}
.el-header {
  background: var(--el-bg-color);
}
.layout-container {
  height: 100vh;
}
.el-footer {
  position: relative;
  bottom: 0;
}
</style>
