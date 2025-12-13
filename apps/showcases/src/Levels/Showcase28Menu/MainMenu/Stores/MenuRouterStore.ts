import { defineStore } from 'pinia';
import type { ComputedRef } from 'vue';
import { computed, reactive } from 'vue';

import { MenuRoutes } from '@/Levels/Showcase28Menu/MainMenu/Constants';

export const useMenuRouterStore = defineStore('menuRouter', () => {
  const state: { history: ReadonlyArray<MenuRoutes> } = reactive({
    history: [MenuRoutes.Home]
  });

  const currRoute: ComputedRef<MenuRoutes> = computed(() => state.history[state.history.length - 1]);

  function go(to: MenuRoutes): void {
    // eslint-disable-next-line functional/immutable-data
    state.history = [...state.history, to];
  }

  const prevRoute: ComputedRef<MenuRoutes> = computed((): MenuRoutes => (state.history.length > 1 ? state.history[state.history.length - 2] : MenuRoutes.Home));

  function goBack(): void {
    // eslint-disable-next-line functional/immutable-data
    if (state.history.length > 1) state.history = state.history.slice(0, -1);
  }

  return { go, prevRoute, currRoute, goBack };
});
