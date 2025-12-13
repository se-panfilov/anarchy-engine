import { eventsService } from '@Menu/services';
import { useMenuOptionsStore } from '@Menu/stores/MenuOptionsStore';
import { isDefined } from '@Shared/Utils';
import type { TMenuEvent, TMenuOptions } from '@ShowcasesShared';
import { createPinia } from 'pinia';
import type { Subject } from 'rxjs';
import type { App as VueApp } from 'vue';
import { createApp } from 'vue';

import App from './App.vue';

export function initMenuApp(id: string, bus: Subject<TMenuEvent>, options?: TMenuOptions): void {
  const menuApp: VueApp<Element> = createApp(App);
  menuApp.use(createPinia());
  menuApp.mount(id);
  eventsService.setBus(bus);
  if (isDefined(options)) useMenuOptionsStore().setState(options);
  console.log(`[UI MENU] Menu app initialized at element with ID "${id}"`);
}
