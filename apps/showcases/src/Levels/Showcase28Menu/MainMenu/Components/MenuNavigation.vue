<script setup lang="ts">
import { useMenuRouterStore } from '@/Levels/Showcase28Menu/MainMenu/Stores/MenuRouterStore';
import { MenuRoutes } from '@/Levels/Showcase28Menu/MainMenu/Constants';
import { closeMainMenu } from '@/Levels/Showcase28Menu/MainMenuService';

// TODO DESKTOP: test i18n (for desktop also)

const menuRouterStore = useMenuRouterStore();
</script>

<template>
  <div class="menu-navigation">
    <ul class="menu-navigation__list">
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -graphics" @click="menuRouterStore.go(MenuRoutes.Graphics)">Graphics</button>
      </li>
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -audio" @click="menuRouterStore.go(MenuRoutes.Audio)">Audio</button>
      </li>
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -localization" @click="menuRouterStore.go(MenuRoutes.Localization)">Localization</button>
      </li>
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -close-menu" @click="closeMainMenu()">Close menu</button>
      </li>
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -exit">Exit to desktop</button>
      </li>
    </ul>
  </div>
</template>
