<script setup lang="ts">
import useSettingStore from '@/stores/user.js'
import screenfull from 'screenfull'

const settingStore = useSettingStore()
const userInfo = settingStore.userInfo

const toggleScreenfull = () => {
  screenfull.toggle()
}
</script>
<template>
  <div class="controls">
    <el-tooltip class="control" effect="dark" content="全屏">
      <el-icon @click="toggleScreenfull" :size="20"><FullScreen /></el-icon>
    </el-tooltip>

    <div class="info">
      <el-avatar
        :size="30"
        src="https://s2.loli.net/2022/04/07/gw1L2Z5sPtS8GIl.gif?imageView2/1/w/80/h/80"
      />
      <el-dropdown>
        <span class="name"
          >{{ userInfo.username }}
          <el-icon><CaretBottom /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="settingStore.logout"
              >退出登录</el-dropdown-item
            >
            <el-dropdown-item>个人中心</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style lang="less" scoped>
.controls {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .el-icon {
    margin-right: 10px;
  }
}
.info {
  display: flex;
  align-items: center;

  .el-avatar {
    margin-right: 8px;
  }
  .name {
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }
}
</style>
