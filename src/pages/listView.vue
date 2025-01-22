<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div pt-4>
    <div text-4xl>
      <div i-carbon-application-mobile inline-block />
    </div>
    <p m-2>
      <a rel="noreferrer" href="https://github.com/YunLeFun/vitesse-h5" target="_blank">
        Vitesse H5
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
