<template>
  <div class="subcategory-list">
    <div
      v-for="subCategory in subcategoryList"
      :key="subCategory.id"
      class="item"
      @click="setSubcategoryForSearch(subCategory.name)"
    >
      <span>{{ subCategory.name }}</span>
      <arrow-right width="20" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'
  import { ICategoryList } from '~/services/interfaces'
  import ArrowRight from '~/components/icons/ArrowRight.vue'

  interface IProps {
    subcategoryList: ICategoryList[]
  }

  const props = defineProps<IProps>()
  const { subcategoryList } = toRefs(props)

  const emit = defineEmits(['set-subcategory-for-map'])

  const setSubcategoryForSearch = (categoryName: any) => {
    emit('set-subcategory-for-map', categoryName)
  }
</script>

<style lang="scss" scoped>
  .subcategory-list {
    padding-top: 12px;
  }
  .item {
    margin: 0 24px;
    padding: 24px 0;
    border-bottom: 1px solid rgba(39, 39, 39, 0.2);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
