<script setup lang="ts">
import './assets/style.scss';

import Navigation from '@Menu/components/Navigation.vue';
import RouterView from '@Menu/components/RouterView.vue';
</script>

<template>
  <div class="main-menu">
    <Navigation class="main-menu__item -navigation" />
    <RouterView class="main-menu__item -view" />
  </div>
</template>
