<script setup lang="ts">
import { CreateMenu, UpdateMenu } from '@/api/system/menu'
import useOptionStore from '@/stores/option'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref, watch } from 'vue'
import IconSelect from '@/components/icon-select/icon-select.vue'

const form = ref<any>(null)
const props = defineProps<{
  title?: string
  visible: boolean
  type: string
  data?: any
}>()
const emit = defineEmits<{
  (event: 'update:visible', visible: boolean): void
  (event: 'update:data', data: any): void
  (event: 'success', formData: any): void
  (event: 'cancel'): void
}>()

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})
watch(
  () => props.visible,
  (val) => {
    if (val) {
      form.value?.resetFields()
    }
  }
)
const data = computed({
  get: () => ({
    type: 1,
    link: 0,
    sort: 0,
    hidden: 0,
    cache: 1,
    status: 1,
    ...props.data,
    parent_id: props.data?.parent_id ?? 0,
    icon: props.data?.icon ?? ''
  }),
  set: (val) => emit('update:data', val)
})
const formData = ref<any>(null)
watch(data, (val) => {
  formData.value = val
})

const rules = reactive({
  name: [
    {
      required: true,
      message: '请输入菜单名称',
      trigger: 'blur'
    }
  ],
  path: []
})

const optionStore = useOptionStore()
const menus = [
  {
    id: 0,
    name: '顶级菜单'
  },
  ...optionStore.menus
]

const submit = () => {
  if (props.type === 'add') {
    add()
  } else if (props.type === 'edit') {
    update()
  }
}

const add = () => {
  CreateMenu(formData.value).then(() => {
    ElMessage.success('添加成功')
    emit('success', formData)
  })
}

const update = () => {
  const data = reactive({
    ...formData.value,
    id: props.data.id
  })
  UpdateMenu(data.id, data).then(() => {
    ElMessage.success('修改成功')
    emit('success', formData)
  })
}
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="30%"
    center
    draggable
    :close-on-click-modal="false"
    @close="emit('cancel')"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="parent_id" label="上级菜单">
        <el-tree-select
          v-model="formData.parent_id"
          :data="menus"
          :node-key="'id'"
          :render-after-expand="false"
          :props="{
            children: 'children',
            label: 'name'
          }"
          check-strictly
        />
      </el-form-item>
      <el-form-item prop="type" label="菜单类型">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="name" label="菜单名称">
        <el-input
          v-model="formData.name"
          placeholder="请输入菜单名称"
        ></el-input>
      </el-form-item>
      <template v-if="formData.type != 3">
        <el-form-item prop="icon" label="菜单图标">
          <icon-select v-model="formData.icon" />
        </el-form-item>
        <el-form-item prop="link" label="是否外链">
          <el-radio-group v-model="formData.link">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="path" label="路由地址">
          <el-input
            v-model="formData.path"
            placeholder="请输入路由地址"
          ></el-input>
        </el-form-item>
        <template v-if="formData.type == 2 && formData.link == 0">
          <el-form-item prop="component" label="组件路径">
            <el-input
              v-model="formData.component"
              placeholder="请输入组件路径"
            ></el-input>
          </el-form-item>
        </template>
        <el-form-item prop="redirect" label="重定向">
          <el-input
            v-model="formData.redirect"
            placeholder="请输入重定向地址"
          ></el-input>
        </el-form-item>
      </template>

      <template v-if="formData.type !== 1 && formData.link == 0">
        <el-form-item prop="permission" label="权限标识">
          <el-input
            v-model="formData.permission"
            placeholder="请输入权限标识"
          ></el-input>
        </el-form-item>
        <template v-if="formData.type != 3">
          <el-form-item prop="hidden" label="是否隐藏菜单">
            <el-radio-group v-model="formData.hidden">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="cache" label="是否缓存">
            <el-radio-group v-model="formData.cache">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
      </template>
      <el-form-item prop="sort" label="排序">
        <el-input-number
          v-model="formData.sort"
          :min="0"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-switch
          v-model="formData.status"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit"> 确定 </el-button>
        <el-button @click="emit('cancel')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style scoped></style>
