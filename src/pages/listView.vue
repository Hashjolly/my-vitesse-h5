<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const poiStore = usePoiStore()
const pois = ref(poiStore.pois)
const favorites = ref<string[]>([])

watch(() => poiStore.pois, (newPois) => {
  pois.value = newPois
})

onMounted(() => {
  loadFavorites()
})

function loadFavorites() {
  const storedFavorites = localStorage.getItem('favorites')
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites)
  }
}

function toggleFavorite(poiId: string) {
  if (favorites.value.includes(poiId)) {
    favorites.value = favorites.value.filter(id => id !== poiId)
  }
  else {
    favorites.value.push(poiId)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const favoritePois = computed(() => {
  return pois.value.features.filter(poi => favorites.value.includes(poi.id))
})

function getImageUrl(poi) {
  if (poi.properties.images && poi.properties.images.length > 0) {
    return `${poiStore.imageApiUrl}/${poi.properties.image_dir}/${poi.properties.images[0].file}`
  }
  return ''
}
</script>

<template>
  <div class="list-view">
    <div v-if="favorites.length === 0" class="empty-favorites">
      <p>Votre liste Favoris est vide.</p>
      <p>Utilisez le bouton "Favoris" pour ajouter ou retirer un lieu de votre liste</p>
    </div>
    <div v-else class="favorite-list">
      <h2>Vos Favoris</h2>
      <div v-for="poi in favoritePois" :key="poi.id" class="poi-item">
        <div class="poi-background" :style="{ backgroundImage: `url(${getImageUrl(poi)})` }">
          <div class="poi-overlay">
            <h3>{{ poi.properties.name }}</h3>
            <p>Informations, contacts et tarifs</p>
            <button class="favorite-btn favorite" @click="toggleFavorite(poi.id)">
              <i class="icon-btn" i-ri-star-fill />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="poi-list">
      <div v-for="poi in pois.features" :key="poi.id" class="poi-item">
        <div class="poi-background" :style="{ backgroundImage: `url(${getImageUrl(poi)})` }">
          <div class="poi-overlay">
            <h3>{{ poi.properties.name }}</h3>
            <p>Informations, contacts et tarifs</p>
            <button class="favorite-btn" :class="{ favorite: favorites.includes(poi.id) }" @click="toggleFavorite(poi.id)">
              <i class="icon-btn" :class="favorites.includes(poi.id) ? 'i-ri-star-fill' : 'i-ri-star-line'" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-view {
  padding: 20px;
}

.empty-favorites {
  text-align: center;
  margin-bottom: 20px;
}

.favorite-list, .poi-list {
  margin-bottom: 20px;
}

.poi-item {
  position: relative;
  margin-bottom: 20px;
}

.poi-background {
  background-size: cover;
  background-position: center;
  height: 200px;
  display: flex;
  align-items: flex-end;
}

.poi-overlay {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
  color: white;
  padding: 10px;
  width: 100%;
}

.favorite-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}

.favorite-btn.favorite {
  color: red;
}
</style>
