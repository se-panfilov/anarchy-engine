<script setup lang="ts">
import MenuRouterView from '@/Levels/Showcase28Menu/MainMenu/Components/MenuRouterView.vue';
import MenuNavigation from '@/Levels/Showcase28Menu/MainMenu/Components/MenuNavigation.vue';
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
