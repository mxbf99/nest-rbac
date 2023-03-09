<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Search from '@/components/search/search.vue'
import ZTable from '@/components/table/table.vue'
import roleForm from './form.vue'
import { DeleteRole, RoleList } from '@/api/system/role'
import useOptionStore from '@/stores/option'

const searchItems = reactive([
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    placeholder: '请选择状态',
    options: [
      {
        label: '启用',
        value: 1
      },
      {
        label: '禁用',
        value: 0
      }
    ]
  }
])

const tableColumns = reactive([
  {
    prop: 'name',
    label: '角色名称'
  },
  {
    prop: 'tag',
    label: '角色标识'
  },
  {
    prop: 'desc',
    label: '角色描述'
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

//查询参数
const queryParam = reactive({})
const handleSearch = (val: any) => {
  Object.assign(queryParam, val)
  getList()
}

//表格数据
const tableData = ref([])
const loading = ref(false)
const getList = () => {
  loading.value = true
  RoleList(queryParam)
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
  formTitle.value = '新增角色'
  formVisible.value = true
}
const handleEdit = (row: any) => {
  formData.value = row
  formType.value = 'edit'
  formTitle.value = '编辑角色'
  formVisible.value = true
}
const handleDelete = (row: any) => {
  ElMessageBox.confirm('此操作将删除该角色, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    DeleteRole(row.id)
      .then(() => {
        ElMessage.success('删除成功')
        getList()
      })
      .catch(() => {
        ElMessage.error('删除失败')
      })
  })
}

getList()
</script>
<template>
  <div>
    <search
      :formItems="searchItems"
      :loading="loading"
      @searchClick="handleSearch"
      @restClick="handleSearch"
    >
    </search>
    <el-card shadow="never">
      <el-row justify="space-between" style="margin-bottom: 20px">
        <div>
          <el-button
            type="primary"
            icon="Plus"
            v-hasPermission="'system:role:create'"
            @click="handleAdd"
            >新增</el-button
          >
        </div>
        <div>
          <el-button icon="RefreshRight"></el-button>
          <el-button icon="Operation"></el-button>
        </div>
      </el-row>
      <z-table :data="tableData" :columns="tableColumns" v-loading="loading">
        <template #status="{ row }">
          <el-tag v-if="row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
        <template #operation="{ row }">
          <el-button
            type="primary"
            link
            @click="handleEdit(row)"
            v-hasPermission="'system:role:update'"
            >编辑</el-button
          >
          <el-button
            type="danger"
            link
            v-hasPermission="'system:role:delete'"
            @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </z-table>
    </el-card>

    <role-form
      v-model:visible="formVisible"
      :title="formTitle"
      :type="formType"
      :data="formData"
      @success="handleFormSuccess"
      @cancel="handleFormClose"
    ></role-form>
  </div>
</template>
<style scoped></style>
