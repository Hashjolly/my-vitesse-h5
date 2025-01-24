<script setup lang="ts">
import config from '~/config'
import SplashScreen from './pages/utils/SplashScreen.vue'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: config.title,
  meta: [
    { name: 'description', content: config.description },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? config.mainColor : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})

const isLoading = ref(true)

onMounted(async () => {
  const poisStore = usePoiStore()
  await poisStore.fetchPois()
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>

<template>
  <SplashScreen
    v-show="isLoading"
    class="fullscreen-splash"
  />
  <RouterView v-if="!isLoading" />
</template>
