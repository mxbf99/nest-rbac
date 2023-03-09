<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ZTable from '@/components/table/table.vue'
import MenuForm from './form.vue'
import { DeleteMenu, MenuList } from '@/api/system/menu'

const tableConfig = {
  rowKey: 'id',
  treeProps: {
    children: 'children'
  }
}
const tableColumns = reactive([
  {
    prop: 'name',
    label: '菜单名称'
  },
  {
    prop: 'path',
    label: '路由地址'
  },
  {
    prop: 'icon',
    label: '图标',
    width: '100',
    type: 'custom'
  },
  {
    prop: 'permission',
    label: '权限标识'
  },
  {
    prop: 'sort',
    label: '排序'
  },
  {
    prop: 'status',
    label: '状态',
    type: 'custom'
  },
  {
    prop: 'created_at',
    label: '创建时间',
    type: 'date'
  },
  {
    prop: 'operation',
    label: '操作',
    width: '160',
    type: 'custom'
  }
])

//表格数据
const tableData = ref([])
const loading = ref(false)
const getList = () => {
  loading.value = true
  MenuList({})
    .then((res: any) => {
      tableData.value = res
    })
    .finally(() => {
      loading.value = false
    })
}
//表单相关
const formVisible = ref(false)
const formTitle = ref('')
const formType = ref('')
const formData = ref({})
const handleFormSuccess = () => {
  formVisible.value = false
  formData.value = {}
  getList()
}

const handleFormClose = () => {
  formVisible.value = false
  formData.value = {}
}

const handleAdd = () => {
  formType.value = 'add'
  formTitle.value = '新增菜单'
  formVisible.value = true
}
const handleEdit = (row: any) => {
  formData.value = { ...row }
  formType.value = 'edit'
  formTitle.value = '编辑菜单'
  formVisible.value = true
}
const handleDelete = (row: any) => {
  ElMessageBox.confirm('此操作将删除该菜单, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    DeleteMenu(row.id)
      .then(() => {
        ElMessage.success('删除成功')
        getList()
      })
      .catch(() => {
        ElMessage.error('删除失败')
      })
  })
}

onMounted(() => {
  getList()
})
</script>
<template>
  <div>
    <el-card shadow="never">
      <el-row justify="space-between" style="margin-bottom: 20px">
        <div>
          <el-button
            type="primary"
            icon="Plus"
            v-hasPermission="'system:menu:create'"
            @click="handleAdd"
            >新增</el-button
          >
        </div>
        <div>
          <el-button icon="RefreshRight"></el-button>
          <el-button icon="Operation"></el-button>
        </div>
      </el-row>
      <z-table
        :data="tableData"
        :config="tableConfig"
        :columns="tableColumns"
        v-loading="loading"
      >
        <template #icon="{ row }">
          <el-icon v-if="row.icon">
            <component :is="row.icon" />
          </el-icon>
        </template>
        <template #status="{ row }">
          <el-tag v-if="row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
        <template #operation="{ row }">
          <el-button
            type="primary"
            link
            v-hasPermission="'system:menu:update'"
            @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            link
            v-hasPermission="'system:menu:delete'"
            @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </z-table>
    </el-card>

    <menu-form
      v-model:visible="formVisible"
      :title="formTitle"
      :type="formType"
      :data="formData"
      @success="handleFormSuccess"
      @cancel="handleFormClose"
    ></menu-form>
  </div>
</template>
<style scoped></style>
