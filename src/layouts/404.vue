<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main p="x4 y10" text="center dark:gray-200">
    <TopAppBar />
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <RouterView />
    <div>
      <button btn text-sm mt-8 @click="router.back()">
        {{ t('button.back') }}
      </button>
    </div>
    <BottomNavBar />
  </main>
</template>
