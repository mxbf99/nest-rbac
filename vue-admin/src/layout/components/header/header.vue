<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from './breadcrumb.vue'
import Controls from './controls.vue'

const emit = defineEmits(['collapseChange'])

const isCollapse = ref(false)
const handleIconClick = () => {
  isCollapse.value = !isCollapse.value
  emit('collapseChange', isCollapse.value)
}
</script>
<template>
  <div class="header">
    <div class="collapse-icon" @click="handleIconClick">
      <el-icon size="28px">
        <component :is="isCollapse ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <Breadcrumb />
    <Controls />
  </div>
</template>
<style scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
}

.collapse-icon {
  margin-right: 20px;
  cursor: pointer;
}
</style>
