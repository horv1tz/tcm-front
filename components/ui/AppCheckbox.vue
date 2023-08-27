<template>
  <label class="checkbox">
    <checkbox-icon v-if="!!checkboxValue" />
    <checkbox-empty-icon v-else />
    <input
      type="checkbox"
      class="fake"
      :checked="checkboxValue"
      @change="checkboxValue = !checkboxValue"
    />
  </label>
</template>

<script setup lang="ts">
  import CheckboxEmptyIcon from '~/components/icons/CheckboxEmptyIcon.vue'
  import CheckboxIcon from '~/components/icons/CheckboxIcon.vue'
  import { ref } from 'vue'

  const checkboxValue = ref(false)
</script>

<style lang="scss" scoped>
  .checkbox {
    cursor: pointer;
  }
  .fake {
    display: none;
  }
</style>
