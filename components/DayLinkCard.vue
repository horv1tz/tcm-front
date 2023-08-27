<template>
  <div class="cards">
    <h3>Вы можете посетить эти места</h3>
    <hr style="margin: 12px 0" />
    <div class="cards-list">
      <div v-for="item in randomDaylicks" :key="item.id" class="item" @click="emit('set-daylick')">
        <p class="title">{{ item.name }}</p>
        <p class="rating">
          Оценка: <span>{{ item.rating }}</span>
        </p>
        <app-checkbox />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import appRepository from '~/services/repositories/app-repository'
  import AppCheckbox from '~/components/ui/AppCheckbox.vue'

  const randomDaylicks = await appRepository.fetchRandom()
  const emit = defineEmits(['set-daylick'])
</script>

<style lang="scss" scoped>
  .title {
    font-size: 16px;
    font-weight: 500;
  }
  .rating {
    font-size: 14px;

    span {
      color: #18bd1b;
    }
  }

  .cards-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    height: 350px;
    overflow-y: auto;
  }
  .item {
    display: flex;
    flex-direction: column;
    padding-bottom: 12px;
    padding-inline: 20px;
    border-bottom: 1px solid rgba(120 120 120 / 15%);
    flex: 1 1 100%;
  }
</style>
