<script setup lang="ts">
import { toggleDark } from '~/composables/dark'

const { t, availableLocales, locale } = useI18n()

function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="flex flex-justify-between text-xl pt-3 pb-2">
    <a class="flex flex-items-center icon-btn mx-4" :class="locale === 'fr' ? '' : '-rotate-y-180'" :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-ri-translate />
    </a>

    <RouterLink icon class="mt-2 logo-btn" to="/" :title="t('button.home')">
      <img src="/logo/logo_rouge.png" alt="Logo" class="logo-image">
    </RouterLink>

    <button class="icon-btn mx-4 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="ri-sun-line dark:ri-moon-line" />
    </button>
  </nav>
</template>

<style scoped>

</style>
