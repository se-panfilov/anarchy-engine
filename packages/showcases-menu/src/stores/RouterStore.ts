import { Routes } from '@Showcases/Menu/constants';
import { defineStore } from 'pinia';
import type { ComputedRef } from 'vue';
import { computed, reactive } from 'vue';

export const useRouterStore = defineStore('routerStore', () => {
  const state: { history: ReadonlyArray<Routes> } = reactive({
    history: [Routes.Home]
  });

  const currRoute: ComputedRef<Routes> = computed(() => state.history[state.history.length - 1]);

  function go(to: Routes): void {
    state.history = [...state.history, to];
  }

  const prevRoute: ComputedRef<Routes> = computed((): Routes => (state.history.length > 1 ? state.history[state.history.length - 2] : Routes.Home));

  function goBack(): void {
    if (state.history.length > 1) state.history = state.history.slice(0, -1);
  }

  return { go, prevRoute, currRoute, goBack };
});
