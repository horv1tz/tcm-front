<template>
  <button class="screen-close" @click="emit('click')">&times;</button>
</template>

<script setup lang="ts">
  const emit = defineEmits(['screen-close'])
</script>

<style lang="scss" scoped>
  .screen-close {
    position: absolute;
    top: 46px;
    right: 16px;
    border: none;
    background: transparent;
    color: $primary-color;
    font-size: 32px;
    line-height: 32px;
    padding: 10px;
    cursor: pointer;
  }
</style>
