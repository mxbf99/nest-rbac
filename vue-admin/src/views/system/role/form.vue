<script setup lang="ts">
import { CreateRole, UpdateRole } from '@/api/system/role'
import useOptionStore from '@/stores/option'
import { ElMessage } from 'element-plus'
import { computed, nextTick, reactive, ref, watch } from 'vue'

const form = ref<any>(null)
const rules = reactive({
  name: [
    {
      required: true,
      message: '请输入角色名称',
      trigger: 'blur'
    }
  ],
  tag: [
    {
      required: true,
      message: '请输入角色标识',
      trigger: 'blur'
    }
  ]
})

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
watch(dialogVisible, (val) => {
  if (!val) {
    form.value.resetFields()
  }
})

const formData = reactive(
  computed({
    get: () => ({ status: 1, menus: [], ...props.data }),
    set: (val) => emit('update:data', val)
  })
)

// 树
const tree = ref<any>(null)
const defaultTreeProps = {
  children: 'children',
  label: 'name'
}
const optionStore = useOptionStore()
const menus = computed(() => optionStore.menus)
watch(dialogVisible, (val) => {
  if (val) {
    nextTick(() => {
      formData.value.menus.forEach((item: any) => {
        tree.value.setChecked(item.id, true, false)
      })
    })
  } else {
    tree.value.setCheckedKeys([])
  }
  nextTick(() => {
    expandTree('collapse')
  })
})
const expandTree = (type: string) => {
  const treeNodes = tree.value.store.nodesMap
  if (type === 'expand') {
    Object.keys(treeNodes).forEach((key) => {
      treeNodes[key].expand()
    })
  } else if (type === 'collapse') {
    Object.keys(treeNodes).forEach((key) => {
      treeNodes[key].collapse()
    })
  }
}
const handleTreeStatus = (val: any) => {
  if (val) {
    expandTree('expand')
  } else {
    expandTree('collapse')
  }
}
const handleSelectMenu = () => {
  formData.value.menu_ids = [
    ...tree.value.getCheckedKeys(),
    ...tree.value.getHalfCheckedKeys()
  ]
}
const submit = () => {
  if (props.type === 'add') {
    add()
  } else if (props.type === 'edit') {
    update()
  }
}

const add = () => {
  CreateRole(formData.value).then(() => {
    ElMessage.success('添加成功')
    emit('success', formData)
  })
}

const update = () => {
  const data = reactive({
    ...formData.value,
    id: props.data.id
  })
  UpdateRole(data.id, data).then(() => {
    ElMessage.success('修改成功')
    emit('success', formData)
  })
}
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="props.title"
    width="30%"
    center
    draggable
    :close-on-click-modal="false"
    @close="emit('cancel')"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
      <el-form-item prop="name" label="角色名称">
        <el-input
          v-model="formData.name"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="tag" label="角色标识">
        <el-input
          v-model="formData.tag"
          placeholder="请输入角色标识"
        ></el-input>
      </el-form-item>
      <el-form-item prop="desc" label="角色描述">
        <el-input
          v-model="formData.desc"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-switch
          v-model="formData.status"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-checkbox @change="handleTreeStatus">展开</el-checkbox>
      </el-form-item>
      <el-form-item>
        <div class="tree-wrap">
          <el-scrollbar height="200px">
            <el-tree
              ref="tree"
              :data="menus"
              :props="defaultTreeProps"
              node-key="id"
              accordion
              show-checkbox
              @check="handleSelectMenu"
            ></el-tree>
          </el-scrollbar>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit"> 确定 </el-button>
        <el-button @click="emit('cancel')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style scoped>
.tree-wrap {
  width: 100%;
  border: 1px solid #e4e7ed;
}
</style>
