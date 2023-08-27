<template>
  <div class="screen">
    <div class="global-content-screen content-screen-container">
      <close-screen @click="emit('screen-close')" />

      <div class="container screen-container">
        <div class="content">
          <header class="header">
            <p class="title">Куда сходить сегодня?</p>
            <category-list
              :active-id="categoryId"
              class="header__category-list"
              @select-category="setCategoryId($event)"
            />
          </header>
          <div class="content-body">
            <subcategory-list
              :subcategory-list="subcategoryByCategory"
              сlass="content-body__subcategory-list"
              @set-subcategory-for-map="setSubCategoryForMap($event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CategoryList from '~/components/CategoryList.vue'
  import SubcategoryList from '~/components/CategoryScreen/SubcategoryList.vue'
  import { ref } from 'vue'
  import appRepository from '~/services/repositories/app-repository'
  import CloseScreen from '~/components/ui/CloseScreen.vue'

  const emit = defineEmits(['screen-close', 'set-subcategory-for-map'])

  let categoryId = ref(1)

  const setCategoryId = async (id: any): void => {
    categoryId.value = id
    await createSubCategoryById()
  }

  let subcategoryByCategory = ref([])

  const createSubCategoryById = async (): void => {
    const findSubCategory = await appRepository.fetchSubCategoryById(categoryId.value)
    subcategoryByCategory.value = findSubCategory
  }

  await createSubCategoryById()

  const setSubCategoryForMap = (subcategoryName: any) => {
    emit('set-subcategory-for-map', subcategoryName)
    emit('screen-close')
  }
</script>

<style lang="scss" scoped>
  .screen {
    position: relative;

    &-container {
      padding-block: 16px;

      .content {
        margin-top: 20px;
        margin-bottom: 20px;
        height: calc(100vh - 100px);
        overflow-y: auto;
      }
    }
  }
  .content {
    .header {
      .title {
        color: $white-color;
        font-size: 16px;
        font-weight: 700;
        line-height: 110%; /* 17.6px */
        letter-spacing: -0.32px;
      }
      &__category-list {
        margin-top: 24px;
      }
    }
  }
  .content-screen-container {
    background: linear-gradient(223deg, #ad84ff 0%, #8550ef 50.87%, #8550ef 100%);
  }
  .content-body {
    height: 400px;
    overflow-y: auto;
    margin-top: 24px;
    background: $white-color;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgb(0 0 0 / 5%);
  }
</style>
