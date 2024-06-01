<template>
  <div class="screen">
    <div class="global-content-screen content-screen-container">
      <close-screen @click="$emit('screen-close')" />

      <div class="container screen-container">
        <div class="content">
          <div v-if="optimalRouteIsShown">
            <h2 class="title">Оптимальный маршрут по вашим предпочтениям</h2>
            <optimal-route :optroute="optimalRoutes" class="routes" />

            <button class="content-body__button" @click="openMap()">
              <span>Открыть карту</span>
            </button>
          </div>
          <div v-else>
            <header class="header">
              <p class="title">Составим план, какие места можно посетить</p>
              <arrow-left class='goback-arw' v-if="bc.trail.length>2" width="20" @click='goback'/>
              <category-list
                  :bc="bc"
                  :active-id="categoryId"
                  class="header__category-list"
                  @select-category="setCategoryId"
              />
            </header>
            <div :class="['content-body', { wiggle: !categoryWasSelect }]">
              <subcategory-list
                  :subcategory-list="subcategoryByCategory"
                  :bc="bc"
                  class="content-body__subcategory-list"
                  @catsel='catsel'
                  @deeper='deeper'
              />
            </div>
            <button class="content-body__button" @click="fetchOptimalRoute">
              <span v-if="isLoading" class="loader"></span>
              <span v-else>К путешествию</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref, computed
} from 'vue'
import CategoryList from '~/components/CategoryList.vue'
import SubcategoryList from './SubcategoryList.vue'
import CloseScreen from '~/components/ui/CloseScreen.vue'
import OptimalRoute from '~/components/PlaningScreen/OptimalRoute.vue'
// import appRepository from '~/services/repositories/app-repository' // Удалено, так как больше не используется

import { useSettingsStore } from '~/stores/settings'
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { Breadcrumbs } from '~/services/misc/breadcrumbs.ts'


import ArrowLeft from "~/components/icons/ArrowLeft.vue";


import axios from 'axios';
import {
  APIURL
} from '~/services/misc/constants.ts'

export default {
  components: {CategoryList, SubcategoryList, CloseScreen, OptimalRoute, ArrowLeft},
  props: [],
  setup(props, ctx) {
    const settingsStore = useSettingsStore()
    const { categories } = storeToRefs(settingsStore);
    const bc = ref(new Breadcrumbs(categories.value))

    const choices = []

    const categoryId = ref(1)
    const subcategoryByCategory = computed(()=>{
      return []
    })
    const categoryWasSelect = ref(true)
    const optimalRouteIsShown = ref(false)
    const isLoading = ref(false)
    const optimalRoutes = ref([])

    const setCategoryId = async (id: any) => {
      categoryId.value = id
      bc.value.switchLast(id)
    }

    const catsel = (id, selflag) => {
      if(selflag){
        choices.push(id)
      } else {
        const index = choices.indexOf(id);
        if (index > -1) {
          choices.splice(index, 1);
        }
      }
      console.log(choices)
    }

    const deeper = (id) => {
      bc.value.deeper(id)
    }

    const goback = () => {
      bc.value.goBack()
    }

    const fetchOptimalRoute = async () => {
      if (choices.length > 0) {
        // const formData = filterCat.map(item => item.name)
        isLoading.value = true
        let temp_places = [{
            "id": 1,
            "name": "Кинотеатр A",
            "description": "Самый лучший кинотеатр в округе",
            "categoryId": 4,
            "latitude": 55.7558,
            "longitude": 37.6176,
            "pOptions": [
              1,
              2,
              3
            ]
          },
          {
            "id": 2,
            "name": "Парк развлечений B",
            "description": "Чтобы весело провести время",
            "categoryId": 5,
            "latitude": 59.9343,
            "longitude": 30.3351,
            "pOptions": [
              4,
              5,
              6
            ]
          },
          {
            "id": 3,
            "name": "Арт-музей С",
            "description": "Высокое искусство",
            "categoryId": 7,
            "latitude": 48.8566,
            "longitude": 2.3522,
            "pOptions": [
              7,
              8,
              9
            ]
          },
          {
            "id": 4,
            "name": "Исторический музей D",
            "description": "Известный исторический музей",
            "categoryId": 8,
            "latitude": 51.5074,
            "longitude": -0.1278,
            "pOptions": [
              10,
              11,
              12
            ]
          },
          {
            "id": 5,
            "name": "Место 5",
            "description": "Описание места 5",
            "categoryId": 3,
            "latitude": 40.7128,
            "longitude": -74.006,
            "pOptions": [
              13,
              14,
              15
            ]
          },
          {
            "id": 6,
            "name": "Место 6",
            "description": "Описание места 6",
            "categoryId": 3,
            "latitude": 34.0522,
            "longitude": -118.2437,
            "pOptions": [
              16,
              17,
              18
            ]
          }
        ]
        let home = {
          id: 0,
          name: "Дом",
          description: "Ваше домашнее местоположение",
          latitude: 55.6858985,
          longitude: 37.5843767,
        }

        let coords_picker = []
        coords_picker.push(home)

        for (const c of choices) {
          let sel = temp_places.filter(e=>e.categoryId===c)
          if(sel.length){
            coords_picker.push(sel[0])
          }
        }
        coords_picker.push(home)

        coords_picker = coords_picker.map(e=>{
          e.details = e.description
          return e
        })

        // Фейковые данные оптимального маршрута
        const Response = {
          items: [{
              id: 1,
              name: 'Маршрут 1',
              details: 'Детали маршрута 1'
            },
            {
              id: 2,
              name: 'Маршрут 2',
              details: 'Детали маршрута 2'
            },
            {
              id: 3,
              name: 'Маршрут 3',
              details: 'Детали маршрута 3'
            }
          ]
        }


        optimalRoutes.value = coords_picker
        optimalRouteIsShown.value = true
        isLoading.value = false
      }
    }

    const openMap = () => {
      optimalRouteIsShown.value = false
      ctx.emit('screen-close')
    }

    return {
      fetchOptimalRoute,
      openMap,
      setCategoryId,
      optimalRoutes,
      categoryId,
      subcategoryByCategory,
      optimalRouteIsShown,
      isLoading,
      bc,
      catsel,
      deeper,
      goback
    }
  }
}

</script>

<style lang="scss" scoped>

.goback-arw{
  margin-top:1em;
  cursor: pointer;
}

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
      line-height: 110%;
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
      10% {
        transform: translateX(-10px);
      }
      15% {
        transform: translateX(10px);
      }
      20% {
        transform: translateX(-10px);
      }
      25% {
        transform: translateX(10px);
      }
      30% {
        transform: translateX(0);
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
    line-height: 110%;
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
