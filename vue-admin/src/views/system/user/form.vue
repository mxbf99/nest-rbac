<script setup lang="ts">
import { CreateUser, UpdateUser } from '@/api/system/user'
import useOptionStore from '@/stores/option'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref, watch } from 'vue'

const form = ref<any>(null)
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  // phone: [
  //   {
  //     required: true,
  //     message: '请输入手机号',
  //     trigger: 'blur'
  //   }
  // ],
  // email: [
  //   {
  //     required: true,
  //     message: '请输入邮箱',
  //     trigger: 'blur'
  //   }
  // ],
  role_ids: [
    {
      required: true,
      message: '请选择角色',
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
const formData = ref<any>(null)
watch(dialogVisible, (val) => {
  if (!val) {
    form.value.resetFields()
    formData.value = props.data
  }
})

const optionStore = useOptionStore()
const roles = optionStore.roles

const submit = () => {
  form.value.validate((valid: boolean) => {
    if (valid) {
      if (props.type === 'add') {
        add()
      } else {
        update()
      }
    }
  })
}

const add = () => {
  CreateUser(formData.value).then(() => {
    ElMessage.success('添加成功')
    emit('success', formData)
  })
}

const update = () => {
  const data = reactive({
    ...formData.value,
    id: props.data.id
  })
  UpdateUser(data.id, data).then(() => {
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
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
      <el-form-item prop="username" label="用户名">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <template v-if="type == 'add'">
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="formData.password"
            maxlength="32"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </template>
      <el-form-item prop="phone" label="手机号">
        <el-input
          v-model="formData.phone"
          maxlength="11"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="role_ids" label="用户角色">
        <el-select v-model="formData.role_ids" multiple placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
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
