import { eventsService } from '@Menu/services';
import { useMenuOptionsStore } from '@Menu/stores/MenuOptionsStore';
import { isDefined } from '@Shared/Utils';
import type { TFromMenuEvent, TMenuOptions, TToMenuEvent } from '@ShowcasesShared';
import { createPinia } from 'pinia';
import type { Observable, Subject } from 'rxjs';
import type { App as VueApp } from 'vue';
import { createApp } from 'vue';

import App from './App.vue';

export function initMenuApp(id: string, fromMenuBus$: Subject<TFromMenuEvent>, toMenuBus$: Observable<TToMenuEvent>, options?: TMenuOptions): void {
  const menuApp: VueApp<Element> = createApp(App);
  menuApp.use(createPinia());
  menuApp.mount(id);
  eventsService.setFromMenuBus(fromMenuBus$);
  eventsService.setToMenuBus(toMenuBus$);
  if (isDefined(options)) useMenuOptionsStore().setState(options);
  console.log(`[UI MENU] Menu app initialized at element with ID "${id}"`);
}
