import { useNuxtApp } from '#imports'

export default {
  fetchCategory: async () => {
    const { $http } = useNuxtApp()
    const { data } = await $http.get('/api/category')
    return data.value
  },
  fetchSubCategory: async () => {
    const { $http } = useNuxtApp()
    const { data } = await $http.get('/api/category/subcategory')
    return data.value
  },
  fetchSubCategoryById: async (id: any) => {
    const { $http } = useNuxtApp()
    const { data } = await $http.get(`/api/category/subcategory/${id}`)
    return data.value
  },
  fetchChronologyRoute: async (params: object) => {
    const url = 'https://691b-95-174-102-182.ngrok-free.app/api/predict'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(resp => resp.json())
    return response
  },
  fetchRandom: async () => {
    const { $http } = useNuxtApp()
    const { data } = await $http.get(`/api/random`)
    return data.value
  }
}
