<script setup lang="ts">
import { Routes } from '@Menu/constants';
import { eventsService } from '@Menu/services';
import { useRouterStore } from '@Menu/stores/RouterStore';
// TODO DESKTOP: extract to... shared?
// import { closeMainMenu } from 'anarchy_engine_showcases/src/Levels/Showcase28Menu/MainMenuService';

// TODO DESKTOP: test i18n (for desktop also)

const menuRouterStore = useRouterStore();
</script>

<template>
  <div class="menu-navigation">
    <ul class="menu-navigation__list">
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -graphics" @click="menuRouterStore.go(Routes.Graphics)">Graphics</button>
      </li>
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -audio" @click="menuRouterStore.go(Routes.Audio)">Audio</button>
      </li>
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -localization" @click="menuRouterStore.go(Routes.Localization)">Localization</button>
      </li>
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -close-menu" @click="eventsService.emitClose()">Close menu</button>
      </li>
      <li class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button -exit">Exit to desktop</button>
      </li>
    </ul>
  </div>
</template>
