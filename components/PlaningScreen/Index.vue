<template>
  <div class="screen">
    <div class="global-content-screen content-screen-container">
      <close-screen @click="emit('screen-close')" />

      <div class="container screen-container">
        <div class="content">
          <div v-if="optimalRouteIsShown">
            <h2 class="title">Оптимальный маршрут по вашим предпочтениям</h2>
            <optimal-route :optimal-routes="optimalRoutes" class="routes" />

            <button class="content-body__button" @click="openMap()">
              <span>Открыть карту</span>
            </button>
          </div>
          <div v-else>
            <header class="header">
              <p class="title">Составим план, какие места можно посетить</p>
              <category-list
                :active-id="categoryId"
                class="header__category-list"
                @select-category="setCategoryId($event)"
              />
            </header>
            <div :class="['content-body', { wiggle: !categoryWasSelect }]">
              <subcategory-list
                :subcategory-list="subcategoryByCategory"
                сlass="content-body__subcategory-list"
              />
            </div>
            <button class="content-body__button" @click="fetchOptimalRoute()">
              <span v-if="isLoading" class="loader"></span>
              <span v-else>К путешествию</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CategoryList from '~/components/CategoryList.vue'
  import SubcategoryList from './SubcategoryList.vue'
  import CloseScreen from '~/components/ui/CloseScreen.vue'
  import { ref } from 'vue'
  import appRepository from '~/services/repositories/app-repository'
  import OptimalRoute from '~/components/PlaningScreen/OptimalRoute.vue'

  const emit = defineEmits(['screen-close'])

  let categoryId = ref(1)

  const setCategoryId = async (id: any): void => {
    categoryId.value = id
    await createSubCategoryById()
  }

  let subcategoryByCategory = ref([])
  let categoryWasSelect = ref(true)
  let optimalRouteIsShown = ref(false)
  let isLoading = ref(false)
  let optimalRoutes = ref([])
  const createSubCategoryById = async (): void => {
    const findSubCategory = await appRepository.fetchSubCategoryById(categoryId.value)
    subcategoryByCategory.value = findSubCategory.map((item: any) => {
      return {
        ...item,
        selected: false
      }
    })
  }
  await createSubCategoryById()

  const fetchOptimalRoute = async () => {
    const filterCat = subcategoryByCategory.value.filter(item => item.selected)

    categoryWasSelect.value = !(filterCat.length <= 0)

    if (filterCat.length > 0) {
      const formData = filterCat.map(item => item.name)

      isLoading.value = true

      try {
        const response = await appRepository.fetchChronologyRoute({
          subcategories: formData
        })
        optimalRouteIsShown.value = true
        optimalRoutes.value = response.items
      } catch (error) {
        alert('Попробуйте ещё раз')
      }
      isLoading.value = false
    }
  }

  const openMap = () => {
    optimalRouteIsShown.value = false
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

        .header {
          background: $primary-color;
          padding: 20px;
          border-radius: 12px;
        }
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
    background: url('~/assets/images/planing-bg.svg') top center / cover no-repeat;
  }
  .content-body {
    height: 200px;
    overflow-y: auto;
    margin-top: 24px;
    background: $white-color;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgb(0 0 0 / 5%);

    &.wiggle {
      animation: wiggle 0.5s;
      border: 1px solid red;

      @keyframes wiggle {
        0% {
          transform: translateX(-10px);
        }
        5% {
          transform: translateX(10px);
        }
      }
    }

    &__button {
      border-radius: 8px;
      background: linear-gradient(3deg, #fcc879 0%, #fe8f7e 100%);
      padding: 20px 28px;
      width: 100%;
      border: none;
      color: $white-color;
      font-size: 16px;
      font-weight: 700;
      line-height: 110%; /* 17.6px */
      letter-spacing: -0.32px;
      text-transform: uppercase;
      cursor: pointer;
      margin-top: 20px;
    }
  }
  .loader {
    width: 24px;
    height: 24px;
    border-top: 3px solid #fff;
    border-left: 3px solid #fff;
    display: inline-block;
    border-radius: 50px;

    animation: rotate 1s linear infinite;

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .title {
    margin-top: 20px;
    color: $black-color;
  }
  .routes {
    margin-top: 32px;
    margin-bottom: 24px;
  }
</style>
