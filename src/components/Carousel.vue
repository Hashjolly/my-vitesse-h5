<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue'

const emit = defineEmits(['poi-selected'])
const poiStore = usePoiStore()
const pois = ref(poiStore.pois)
const currentIndex = ref(0)

watch(() => poiStore.pois, (newPois) => {
  pois.value = newPois
})

function getImageUrl(poi) {
  if (poi.properties.images && poi.properties.images.length > 0) {
    return `${poiStore.imageApiUrl}/${poi.properties.image_dir}/${poi.properties.images[0].file}`
  }
  return ''
}

function next() {
  if (currentIndex.value < pois.value.features.length - 1) {
    currentIndex.value++
  }
  else {
    currentIndex.value = 0
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
  else {
    currentIndex.value = pois.value.features.length - 1
  }
}

function onPoiSelected(index) {
  const poi = pois.value.features[index]
  if (poi && poi.geometry.type === 'Point') {
    const coordinates = [poi.geometry.coordinates[0], poi.geometry.coordinates[1]]
    emit('poi-selected', coordinates)
  }
}
</script>

<template>
  <div v-touch:swipe.left="next" v-touch:swipe.right="prev" class="carousel-container pt-3">
    <button class="icon-btn mx-2" rel="noreferrer" @click="prev">
      <div i-ri-arrow-left-circle-line />
    </button>
    <div class="carousel">
      <div v-for="(poi, index) in pois.features" :key="index" class="carousel-item" :class="{ active: index === currentIndex }">
        <img :src="getImageUrl(poi)" alt="POI Image" @click="onPoiSelected(index)">
        <p>{{ poi.properties.name }}</p>
      </div>
    </div>
    <button class="icon-btn mx-2" rel="noreferrer" @click="next">
      <div i-ri-arrow-right-circle-line />
    </button>
  </div>
</template>

<style scoped>
.carousel-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.carousel {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.carousel-item {
  flex: 0 0 100%;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease;
}

.carousel-item.active {
  display: flex;
}

.carousel-item img {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
}

.carousel-item p {
  margin-top: 10px;
  font-size: 1.2em;
}
</style>
