import type { TDeepWriteable } from '@Anarchy/Shared/Utils';
import type { TMenuOptions } from '@Showcases/Shared';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import { runtimeEnv } from '../../env';

export const useMenuOptionsStore = defineStore('menuOptionsStore', () => {
  const state: TDeepWriteable<TMenuOptions> = reactive({
    showExitBtn: runtimeEnv.VITE_SHOW_EXIT_BTN ?? true
  });

  const setState = (options: TMenuOptions): void => void Object.assign(state, { ...options });
  const showExitBtn = computed(() => state.showExitBtn);

  return { showExitBtn, setState };
});
