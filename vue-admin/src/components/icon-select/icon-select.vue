<script setup lang="ts">
import * as Icons from '@element-plus/icons-vue'
import { computed, reactive } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
<template>
  <el-select v-model="value" placeholder="请选择图标" filterable clearable>
    <template #prefix v-if="value">
      <el-icon>
        <component :is="value" />
      </el-icon>
    </template>
    <template v-for="icon in Object.keys(Icons)" :key="icon">
      <el-option :label="icon" :value="icon">
        <div class="option">
          <el-icon>
            <component :is="icon" />
          </el-icon>
          <span>{{ icon }}</span>
        </div>
      </el-option>
    </template>
  </el-select>
</template>
<style lang="less" scoped>
.el-select {
  width: 100%;
}

.option {
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
}
</style>
