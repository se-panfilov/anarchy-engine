import { defineStore } from 'pinia';
import { reactive } from 'vue';

import { MenuRoutes } from '@/Levels/Showcase28Menu/Constants';

export const useMenuRouterStore = defineStore('menuRouter', () => {
  const state = reactive({
    route: MenuRoutes.Home,
    history: [] as ReadonlyArray<MenuRoutes>
  });

  function go(value: MenuRoutes): void {
    // eslint-disable-next-line functional/immutable-data
    state.route = value;
    // eslint-disable-next-line functional/immutable-data
    state.history = [...state.history, value];
  }

  function getPrev(): MenuRoutes {
    if (state.history.length > 1) return state.history[state.history.length - 2];
    return MenuRoutes.Home;
  }

  function goBack(): void {
    if (state.history.length > 1) {
      // eslint-disable-next-line functional/immutable-data
      state.route = getPrev();
      // eslint-disable-next-line functional/immutable-data
      state.history = state.history.slice(0, -1);
    }
  }

  return { go, getPrev, goBack };
});
