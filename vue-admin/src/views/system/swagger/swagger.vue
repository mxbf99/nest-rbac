<script setup lang="ts">
const url = `${import.meta.env.VITE_API_URL}/swagger#/`
</script>
<template>
  <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
</template>
<style scoped></style>
