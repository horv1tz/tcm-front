<template>
  <div :class="['first-screen']">
    <div class="container">
      <header class="header">
        <logo-icon class="logo" />
        <p class="header-title">Как бы вы хотели провести время</p>
      </header>
      <div class="content">
        <screen-card v-for="category in categories" :key="category.id" :card="category" />
      </div>
      <button class="button" @click="goToApp()">Поехали</button>
    </div>
  </div>
</template>

<script setup>
  import LogoIcon from '~/components/icons/LogoIcon.vue'
  import ScreenCard from '~/components/FirstScreen/ScreenCard.vue'
  import appRepository from '~/services/repositories/app-repository'
  import { toRefs } from 'vue'
  import { useSettingsStore } from '~/stores/settings'

  const settingsStore = useSettingsStore()
  const goToApp = () => {
    settingsStore.setInitialProject(false)
  }

  const fetchCategory = await appRepository.fetchCategory()
  const fetchSubCategory = await appRepository.fetchSubCategory()

  const filterSubcategory = id => {
    const filteredCategory = fetchSubCategory.filter(({ categoryId }) => categoryId === id)
    return filteredCategory.map(subcategory => ({
      id: subcategory.id,
      name: subcategory.name
    }))
  }

  let categories = toRefs(
    fetchCategory.map(category => ({
      id: category.id,
      name: category.nameCategory,
      subcategory: filterSubcategory(category.id),
      isSelect: false
    }))
  )

  settingsStore.setCategories(categories)
</script>

<style lang="scss" scoped>
  .first-screen {
    background: url('~/assets/images/first-screen-bg.png') center center / cover no-repeat;
    width: 100%;
    height: 100vh;
    transition: 0.6s 0.135s;

    &.hidden-screen {
      opacity: 0;

      .header {
        .logo {
          top: -1000px;
        }
        &-title {
          left: -1000px;
        }
      }
      .content {
        left: -1000px;
      }
      .button {
        transform: scale(0);
      }
    }

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;

      .logo {
        position: relative;
        top: 0;
        transition: 0.8s;
      }

      &-title {
        margin-top: 20px;
        width: 60%;
        text-align: center;
        color: $white-color;

        position: relative;
        left: 0;
        transition: 0.8s 0.05s;
      }
    }
    .content {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: 320px;
      overflow-y: auto;

      position: relative;
      left: 0;
      transition: 0.6s 0.07s;

      &::-webkit-scrollbar {
        width: 6px;

        &-track {
          background: transparent; /* цвет дорожки */
        }
        &-thumb {
          background-color: rgb(0 0 0 / 20%);
          border-radius: 3px;
          border: 1px solid transparent;
        }
      }
    }
    .button {
      margin-top: 40px;
      width: 100px;
      height: 100px;
      border-radius: 50px;
      background: linear-gradient(39deg, #fcc879 0%, #fe8f7e 100%);
      color: $white-color;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-inline: auto;
      cursor: pointer;
      border: none;

      transition: 0.6s 0.1s;
    }
  }
</style>
