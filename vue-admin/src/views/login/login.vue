<script setup lang="ts">
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import useSettingStore from '@/stores/user.js'

const inputStyle = {
  height: '44px'
}

const form = reactive({
  account: 'admin',
  password: '123456'
})

const rules: FormRules = {
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const formRef = ref<FormInstance>()
const settingStore = useSettingStore()
const submit = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      settingStore.login(form)
    }
  })
}

const isRemember = ref(false)
</script>
<template>
  <div class="login-container">
    <div class="login-panel">
      <h1 class="title">Vue3 TypesSript Pinia</h1>
      <el-form ref="formRef" :model="form" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input
            v-model="form.account"
            placeholder="请输入用户名"
            :prefix-icon="User"
            :input-style="inputStyle"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
            :prefix-icon="Lock"
            :input-style="inputStyle"
          />
        </el-form-item>
        <!-- <el-form-item>
          <el-checkbox
            v-model="isRemember"
            label="记住密码"
            size="large"
          ></el-checkbox>
        </el-form-item> -->
      </el-form>
      <el-button class="login-btn" type="primary" @click="submit"
        >登录</el-button
      >
    </div>
  </div>
</template>
<style lang="less" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
}

.login-panel {
  width: 400px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);

  .title {
    text-align: center;
    margin-bottom: 60px;
  }

  .login-btn {
    height: 44px;
    width: 100%;
  }
}
</style>
