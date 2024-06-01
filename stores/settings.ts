import { defineStore } from 'pinia'
import { ISettingState, ICategoryList } from '~/services/interfaces/index'

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingState => ({
    initialProject: true,
    categories: [
      {"id":1,"name":"Развлечения"},
      {"id":2,"name":"Еда"},
      {"id":3,"name":"Отдых"},
      {"id":4,"name":"Кино", "parentId":1},
      {"id":5,"name":"Парки развлечений", "parentId":1},
      {"id":6,"name":"Музеи", "parentId":1},
      {"id":7,"name":"Арт-музеи", "parentId":6},
      {"id":8,"name":"Исторические музеи", "parentId":6},
    ]
  }),
  getters: {},
  actions: {
    setInitialProject(initialProject: boolean): void {
      this.initialProject = initialProject
    },
    setCategories(categories: any[]): void {
      // console.debug('Storing categories', categories)
      // this.categories = categories
    }
  }
})
