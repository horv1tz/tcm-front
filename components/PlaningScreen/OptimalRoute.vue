<template>
  <div class="routes">
    <div v-for="point in optimalRoutes" :key="point.id" class="point">
      <point-icon class="point-icon" />
      {{ point.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'
  import PointIcon from '~/components/icons/PointIcon.vue'

  interface IRoutes {
    id: number
    name: string
    category: string
    subcategory: string
    rating: number
    coord_x: number
    coord_y: number
    short_descrip: any
  }
  interface IProps {
    optimalRoutes: IRoutes[]
  }

  const props = defineProps<IProps>()
  const { optimalRoutes } = toRefs(props)
</script>

<style lang="scss" scoped>
  .routes {
    border-radius: 4.5px;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.05);
    padding: 32px;

    display: flex;
    flex-direction: column;
    gap: 80px;

    height: 350px;
    overflow-y: auto;
  }
  .point {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    position: relative;

    &:not(:last-child)::after {
      content: '';
      display: block;
      background: url('~/assets/images/point-arrow.svg');
      background-repeat: no-repeat;
      height: 65px;
      width: 10px;
      position: absolute;
      top: 40px;
      left: 12px;
    }

    .point-icon {
      $size: 32px;
      min-width: $size;
      min-height: $size;
      max-width: $size;
      max-height: $size;
    }
  }
</style>
