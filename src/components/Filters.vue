<script setup lang="ts">
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['filterSelected'])
const selectedFilter = ref<string | null>(null)
function selectFilter(filter: string) {
  selectedFilter.value = filter
  emit('filterSelected', filter)
}
</script>

<template>
  <div class="filters pl-4">
    <span>Filtres:</span>
    <button :class="{ active: selectedFilter === 'musées' }" @click="selectFilter('musées')">
      Musées
    </button>
    <button :class="{ active: selectedFilter === 'monuments' }" @click="selectFilter('monuments')">
      Monuments
    </button>
    <button :class="{ active: selectedFilter === 'restaurants' }" @click="selectFilter('restaurants')">
      Restaurants
    </button>
    <button :class="{ active: selectedFilter === 'activités' }" @click="selectFilter('activités')">
      Activités
    </button>
    <button :class="{ active: selectedFilter === 'arrêts' }" @click="selectFilter('arrêts')">
      Arrêts
    </button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: White;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #666666;
}

button.active {
  background-color: #dc1b22;
  color: white;
}
</style>
