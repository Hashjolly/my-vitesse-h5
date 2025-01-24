import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePoiStore = defineStore('poi', () => {
  // New state and actions for POIs
  const pois = ref(null)
  const imageApiUrl = import.meta.env.VITE_APP_IMAGE_API_URL as string

  async function fetchPois() {
    try {
      const poiApi = import.meta.env.VITE_APP_POI_API_URL as string
      const response = await fetch(poiApi)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      pois.value = data
    }
    catch (error) {
      console.error('Erreur lors de la récupération des POIs :', error)
    }
  }

  function setPois(data: any) {
    pois.value = data
  }

  return {
    pois,
    imageApiUrl,
    fetchPois,
    setPois,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePoiStore, import.meta.hot))
