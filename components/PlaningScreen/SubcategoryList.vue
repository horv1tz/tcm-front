<template>
  <div class="subcategory-list">
    <label v-for="subCategory in subcategoryList" :key="subCategory.id" class="item">
      <span>{{ subCategory.name }}</span>
      <input
        v-show="false"
        type="checkbox"
        name="subcategory"
        :checked="subCategory.selected"
        @change="subCategory.selected = !subCategory.selected"
      />
      <plus-icon v-if="!subCategory.selected" width="20" />
      <minus-icon v-else width="20" />
    </label>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'
  import { ICategoryList } from '~/services/interfaces'
  import PlusIcon from '~/components/icons/PlusIcon.vue'
  import MinusIcon from '~/components/icons/MinusIcon.vue'

  interface IProps {
    subcategoryList: ICategoryList[]
  }

  const props = defineProps<IProps>()
  const { subcategoryList } = toRefs(props)
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
