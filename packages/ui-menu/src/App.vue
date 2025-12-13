<script setup lang="ts">
import './assets/style.scss';

import MenuNavigation from '@Menu/components/MenuNavigation.vue';
import MenuRouterView from '@Menu/components/MenuRouterView.vue';
</script>

<template>
  <div class="main-menu">
    <MenuNavigation class="main-menu__navigation" />
    <MenuRouterView class="main-menu__view" />
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
