<script setup lang="ts">
import { DeleteUser, UserList } from '@/api/system/user'
import Search from '@/components/search/search.vue'
import ZTable from '@/components/table/table.vue'
import UserForm from './form.vue'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const searchItems = reactive([
  {
    label: '用户名',
    prop: 'username',
    type: 'input',
    placeholder: '请输入用户名'
  },
  {
    label: '手机号',
    prop: 'phone',
    type: 'input',
    placeholder: '请输入手机号'
  },
  {
    label: '邮箱',
    prop: 'email',
    type: 'input',
    placeholder: '请输入邮箱'
  },
  {
    label: '状态',
    prop: 'status',
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
    prop: 'username',
    label: '用户名'
  },
  {
    prop: 'phone',
    label: '手机号'
  },
  {
    prop: 'email',
    label: '邮箱'
  },
  {
    prop: 'roles',
    label: '角色',
    width: '160',
    type: 'custom'
  },
  {
    prop: 'status',
    label: '状态',
    width: '80',
    type: 'custom'
  },
  {
    prop: 'created_at',
    label: '创建时间',
    type: 'date'
  },
  {
    prop: 'updated_at',
    label: '更新时间',
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
//分页相关
const pagination = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 20
})
const handleCurrentChange = (val: number) => {
  pagination.currentPage = val
  getList()
}
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  pagination.currentPage = 1
  getList()
}
//表格数据
const tableData = ref([])
const loading = ref(false)
const getList = () => {
  loading.value = true
  const pageInfo = {
    page: pagination.currentPage,
    page_size: pagination.pageSize
  }
  const params = Object.assign({}, queryParam, pageInfo)
  UserList(params)
    .then((res: any) => {
      tableData.value = res.list
      pagination.total = res.total
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
  formTitle.value = '新增用户'
  formVisible.value = true
}
const handleEdit = (row: any) => {
  formData.value = { ...row }
  formType.value = 'edit'
  formTitle.value = '编辑用户'
  formVisible.value = true
}
const handleDelete = (row: any) => {
  ElMessageBox.confirm('此操作将删除该用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    DeleteUser(row.id)
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
            v-hasPermission="'system:user:create'"
            @click="handleAdd"
            >新增</el-button
          >
          <!-- <el-button type="danger" icon="Delete">删除</el-button>
          <el-button icon="Download">导出</el-button>
          <el-button icon="Upload">导入</el-button> -->
        </div>
        <div>
          <el-button icon="RefreshRight" @click="getList"> </el-button>
          <el-button icon="Operation"></el-button>
        </div>
      </el-row>
      <z-table
        :data="tableData"
        :columns="tableColumns"
        selection
        v-loading="loading"
      >
        <template #status="{ row }">
          <el-tag v-if="row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
        <template #roles="{ row }">
          <template v-for="item in row.roles" :key="item.id">
            <el-tag type="info">{{ item.name }}</el-tag></template
          >
        </template>
        <template #operation="{ row }">
          <el-button
            type="primary"
            link
            v-hasPermission="'system:user:update'"
            @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            link
            v-hasPermission="'system:user:delete'"
            @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </z-table>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[20, 50, 100, 200, 500]"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page="pagination.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <user-form
      v-model:visible="formVisible"
      :title="formTitle"
      :type="formType"
      :data="formData"
      @success="handleFormSuccess"
      @cancel="handleFormClose"
    ></user-form>
  </div>
</template>
<style scoped></style>
