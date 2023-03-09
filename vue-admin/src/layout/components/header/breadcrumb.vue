<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbs = computed(() => {
  const { matched } = route
  const result = matched.map((item) => {
    const { meta } = item
    return {
      path: item.path,
      name: meta.title
    }
  })
  return result
})
</script>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <template v-for="item in breadcrumbs" :key="item.path">
        <el-breadcrumb-item
          :to="item.path"
          v-if="item.name && item.path != '/dashboard'"
        >
          {{ item.name }}
        </el-breadcrumb-item></template
      >
    </el-breadcrumb>
  </div>
</template>
<style scoped></style>
