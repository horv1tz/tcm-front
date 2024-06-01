<template>
  <div class="screen-card" @click="$emit('select-card', card.id)">
    <header class="screen-card__header">
      <p class="title">{{ card.name }}</p>
      <app-checkbox :checkbox-value="card.isSelect" @change="card.isSelect = !card.isSelect" />
    </header>
    <p class="description">{{ subcategoryList }}</p>
  </div>
</template>

<script lang="ts">
  import AppCheckbox from '~/components/ui/AppCheckbox.vue'
  import { toRefs, computed } from 'vue'

  export default {
    components:{AppCheckbox},
    props:['card', 'children', 'bc'],
    setup(props, ctx) {
      
      const subcategoryList = computed(() => {
        return (props.children || []).map(e=>e.name).join(', ')
      })
      const card = props.card
      return {card, subcategoryList}
    }
  }

  
</script>

<style lang="scss" scoped>
  .screen-card {
    border-radius: 8px;
    background: rgba(188, 154, 255, 0.85);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.05);
    padding: 16px;

    &__header {
      display: flex;
      justify-content: space-between;

      .title {
        color: $white-color;
        font-weight: 600;
        line-height: 110%; /* 17.6px */
        letter-spacing: -0.32px;
      }
    }

    .description {
      margin-top: 8px;
      color: $white-color;
      opacity: 0.8;
      font-size: 12px;
      line-height: 110%;
      letter-spacing: -0.24px;
    }
  }
</style>
