<script setup lang="ts">
import { reactive } from 'vue'
interface IFormItem {
  label?: string
  prop: string
  type: string
  labelWidth?: string
  value?: any
  placeholder?: string
  options?: any[]
}
interface IProps {
  config?: any
  formItems: IFormItem[]
  loading?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  config: {
    inline: true
  }
})
const emit = defineEmits<{
  (event: 'searchClick', ...args: any[]): void
  (event: 'restClick', ...args: any[]): void
}>()
const form: any = {}
for (const item of props.formItems) {
  form[item.prop] = item.value ?? ''
}
const formData = reactive(form)

// 搜索
const search = () => {
  emit('searchClick', formData)
}
// 重置
const rest = () => {
  for (const item of props.formItems) {
    formData[item.prop] = item.value ?? ''
  }
  emit('restClick', formData)
}
</script>
<template>
  <el-card shadow="never" :body-style="{ paddingBottom: '2px' }">
    <el-form v-bind="props.config">
      <template v-for="item in formItems" :key="item.prop">
        <el-form-item v-bind="item">
          <template v-if="item.type == 'input'">
            <el-input
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
            />
          </template>
          <template v-else-if="item.type == 'select'">
            <el-select
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              clearable
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </template>
          <template v-else-if="item.type == 'date-picker'">
            <el-date-picker
              v-model="formData[item.prop]"
              type="daterange"
              :placeholder="item.placeholder"
              clearable
            />
          </template>
          <template v-else-if="item.type == 'custom'">
            <slot :name="item.prop"></slot>
          </template>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          :disabled="loading"
          @click="search"
          >查询</el-button
        >
        <el-button icon="Refresh" :disabled="loading" @click="rest"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
