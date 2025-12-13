<script setup lang="ts">
import './styles/menu-styles.scss';

import MenuNavigation from '@/Levels/Showcase28Menu/MainMenu/Components/MenuNavigation.vue';
import MenuRouterView from '@/Levels/Showcase28Menu/MainMenu/Components/MenuRouterView.vue';
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
