<script setup lang="ts">
import './assets/style.scss';

import RouterView from '@Menu/components/RouterView.vue';
</script>

<template>
  <div class="main-menu flex flex-col items-center justify-center min-h-full min-w-full">
    <RouterView class="main-menu__item -view" />
  </div>
</template>
