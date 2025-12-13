<script setup lang="ts">
import './assets/style.scss';

import Navigation from '@Menu/components/Navigation.vue';
import RouterView from '@Menu/components/RouterView.vue';
</script>

<template>
  <div class="main-menu">
    <Navigation class="main-menu__navigation" />
    <RouterView class="main-menu__view" />
  </div>
</template>

<style scoped lang="scss">
.main-menu {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>
