<script setup lang="ts">
import MenuNavigation from 'packages/MainMenu/Components/MenuNavigation.vue';
import MenuRouterView from 'packages/MainMenu/Components/MenuRouterView.vue';
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
