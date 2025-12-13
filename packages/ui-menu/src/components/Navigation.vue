<script setup lang="ts">
import { Routes } from '@Menu/constants';
import type { TNavOption } from '@Menu/models';
import { eventsService } from '@Menu/services';
import { useMenuOptionsStore } from '@Menu/stores/MenuOptionsStore';
import { useRouterStore } from '@Menu/stores/RouterStore';

// TODO DESKTOP: test i18n (for desktop also)
// TODO DESKTOP: add version to html body
// TODO DESKTOP: add init event with version and platform

defineProps<{
  options: ReadonlyArray<TNavOption>;
}>();
</script>

<template>
  <div class="menu-navigation">
    <ul class="menu-navigation__list">
      <!--            <li class="menu-navigation__list-item">-->
      <!--              <button type="button" class="menu-navigation__button" @click="eventsService.emitContinue()">Continue</button>-->
      <!--            </li>-->
      <!--            <li class="menu-navigation__list-item">-->
      <!--              <button type="button" class="menu-navigation__button" @click="eventsService.emitStartNew()">Start new game</button>-->
      <!--            </li>-->
      <!--            <li class="menu-navigation__list-item">-->
      <!--              <button type="button" class="menu-navigation__button" @click="eventsService.emitLoad()">Load game</button>-->
      <!--            </li>-->
      <!--            <li class="menu-navigation__list-item">-->
      <!--              <button type="button" class="menu-navigation__button" @click="menuRouterStore.go(Routes.Settings)">Settings</button>-->
      <!--            </li>-->
      <!--            <li class="menu-navigation__list-item">-->
      <!--              <button type="button" class="menu-navigation__button" @click="menuRouterStore.go(Routes.Graphics)">Graphics</button>-->
      <!--            </li>-->
      <!--            <li class="menu-navigation__list-item">-->
      <!--              <button type="button" class="menu-navigation__button" @click="menuRouterStore.go(Routes.Audio)">Audio</button>-->
      <!--            </li>-->
      <!--            <li class="menu-navigation__list-item">-->
      <!--              <button type="button" class="menu-navigation__button" @click="menuRouterStore.go(Routes.Localization)">Localization</button>-->
      <!--            </li>-->
      <!--            <li class="menu-navigation__list-item">-->
      <!--              <button type="button" class="menu-navigation__button" @click="eventsService.emitClose()">Close menu</button>-->
      <!--            </li>-->
      <!--            <li v-if="useMenuOptionsStore().showExitBtn" class="menu-navigation__list-item">-->
      <!--              <button type="button" class="menu-navigation__button -exit">Exit to desktop</button>-->
      <!--            </li>-->
      <li v-for="option in options" :key="option.id" class="menu-navigation__list-item">
        <button type="button" class="menu-navigation__button" @click="option.action()">
          {{ option.label }}
        </button>
      </li>
    </ul>
  </div>
</template>
