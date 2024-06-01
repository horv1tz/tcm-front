<template>
  <div class="home">
    <first-screen v-show="initialProject" class="home__first-screen" />

    <div class="map-screen">
      <div id="map" style="min-width: 360px; height: 100vh"></div>
    </div>

    <div :class="['screen-slides', { 'screens-shown': !!screenType }]">
      <category-screen
        :class="['home-screen', { 'open-screen': screenType === 'category' }]"
        @screen-close="screenClose()"
        @set-subcategory-for-map="setSubCategoryForMap($event)"
      />
      <planing-screen
        :class="['home-screen', { 'open-screen': screenType === 'planing' }]"
        @screen-close="screenClose()"
      />
      <infos-screen
        :class="['home-screen', { 'open-screen': screenType === 'infos' }]"
        @screen-close="screenClose()"
      />
    </div>

    <menu-bar class="menu-bar" @set-screen-type="screenType = $event" />
  </div>
</template>

<script setup>
  import FirstScreen from '~/components/FirstScreen/Index.vue'
  import InfosScreen from '~/components/InfosScreen/Index.vue'
  import { useSettingsStore } from '~/stores/settings'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import DaylickCard from '~/components/DaylickCard.vue'

  const settingsStore = useSettingsStore()
  const { initialProject } = storeToRefs(settingsStore)

  const screenType = ref('')

  const screenClose = () => {
    screenType.value = ''
  }

  let subcategoryForMap = ref('')
  const setSubCategoryForMap = subcategoryForSearch => {
    subcategoryForMap.value = subcategoryForSearch

    searchByCategory(myMap, subcategoryForMap.value)
  }

  //   YANDEX MAP
  var myMap

  let last_control
  const searchByCategory = (myMap, searchValue = 'Москва') => {
    let searchControl = new window.ymaps.control.SearchControl({
      options: {
        provider: 'yandex#search'
      }
    })

    // Check if the control is on screen
    if(last_control){
      // And remove it to prevent clutter
      myMap.controls.remove(last_control)
    }
    // assign current map control as the last control added
    last_control = searchControl
    // add control to map
    myMap.controls.add(searchControl)

    searchControl.search(searchValue)

    myMap = null
  }

  if (process.client) {
    window.ymaps.ready(init)

    function initMap() {
      if (!myMap) {
        myMap = new ymaps.Map(
          'map',
          {
            center: [55.76, 37.64],
            zoom: 10,
            controls: ['smallMapDefaultSet']
          },
          {
            restrictMapArea: [
              [56.138, 37.111],
              [55.356, 38.129]
            ]
          },
          {
            searchControlProvider: 'yandex#search'
          }
        )
      } else {
        myMap.destroy()
        myMap = null
      }
    }

    function init() {
      initMap()
    }
  }
</script>

<style lang="scss" scoped>
  @import 'assets/scss/mixins.scss';

  .home {
    position: relative;
    min-width: 360px;
    height: 100vh;
    overflow: hidden;

    .screen-slides {
      position: absolute;
      @include background-opacity($black-color, 0.8);
      width: 100%;
      height: calc(100% - 30px);
      top: 0;
      visibility: hidden;
      opacity: 0;
      transition:
        all 0.4s,
        opacity 0.2s;

      &.screens-shown {
        visibility: visible;
        opacity: 1;

        .home-screen.open-screen {
          top: 0;
          z-index: 1;
        }
      }
    }

    &-screen {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 100%;
      transition: 0.4s;
      z-index: 0;
    }

    &__first-screen {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .menu-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
  .map-screen {
    position: relative;
  }
</style>
