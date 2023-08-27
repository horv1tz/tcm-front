<template>
  <div class="category-list">
    <button
      v-for="category in categories"
      :key="category.value.id"
      :class="['category-button', { 'category-active': activeId === category.value.id }]"
      @click="emit('select-category', category.value.id)"
    >
      {{ category.value.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useSettingsStore } from '~/stores/settings'
  import { storeToRefs } from 'pinia'
  import { toRefs } from 'vue'

  interface IProps {
    activeId: number
  }

  const settingsStore = useSettingsStore()
  const { categories } = storeToRefs(settingsStore)

  const props = defineProps<IProps>()
  const { activeId } = toRefs(props)

  const emit = defineEmits<{
    'select-category': [categoryId: number]
  }>()
</script>

<style lang="scss" scoped>
  .category-list {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .category-button {
    border-radius: 4.5px;
    background: rgba(188, 154, 255, 0.85);
    box-shadow: 0 9px 18px 0 rgba(0, 0, 0, 0.05);
    border: none;
    padding: 12px 28px;
    cursor: pointer;

    color: $white-color;
    text-align: center;
    font-size: 11.25px;
    font-weight: 600;
    line-height: 110%;
    letter-spacing: -0.225px;

    &.category-active {
      background: $white-color;
      color: $black-color;
    }
  }
</style>
