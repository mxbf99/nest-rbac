<script setup lang="ts">
import { computed, reactive } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible'])
const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const onClose = () => {
  visible.value = false
}

const form = reactive({
  name: ''
})
</script>

<template>
  <div>
    <el-dialog v-model="visible" title="菜单" center @on-close="onClose">
      <el-form>
        <el-form-item label="菜单名称">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style scoped></style>
