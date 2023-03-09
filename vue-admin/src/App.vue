<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  background: #f5f5f5;
}
</style>
