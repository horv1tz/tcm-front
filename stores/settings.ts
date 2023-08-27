import { defineStore } from 'pinia'
import { ISettingState, ICategoryList } from '~/services/interfaces/index'

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingState => ({
    initialProject: true,
    categories: []
  }),
  getters: {},
  actions: {
    setInitialProject(initialProject: boolean): void {
      this.initialProject = initialProject
    },
    setCategories(categories: ICategoryList[]): void {
      this.categories = categories
    }
  }
})
