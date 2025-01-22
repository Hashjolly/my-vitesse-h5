<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <nav text-xl my-4>
    <RouterLink class="icon-btn mx-2" to="/" :title="t('button.map')">
      <div i-ri-map-2-fill />
      <p>
        {{ t('button.map') }}
      </p>
    </RouterLink>

    <RouterLink class="icon-btn mx-2" to="/listView" :title="t('button.list')">
      <div i-ri-list-check />
      <p>
        {{ t('button.list') }}
      </p>
    </RouterLink>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://boutique.bordeaux-citytours.com/bordeaux-visiotour" target="_blank" :title="t('button.tickets')">
      <div i-ri-shopping-cart-2-fill />
      <p>
        {{ t('button.tickets') }}
      </p>
    </a>

    <RouterLink class="icon-btn mx-2" to="/about" :title="t('button.infos')">
      <div i-ri-information-line />
      <p>
        {{ t('button.infos') }}
      </p>
    </RouterLink>
  </nav>
</template>
