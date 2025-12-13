import type { TMenuEvent } from '@Menu/models';
import { eventsService } from '@Menu/services';
import { createPinia } from 'pinia';
import type { Subject } from 'rxjs';
import type { App as VueApp } from 'vue';
import { createApp } from 'vue';

import App from './App.vue';

export function initMenuApp(id: string, bus: Subject<TMenuEvent>): void {
  const menuApp: VueApp<Element> = createApp(App);
  menuApp.use(createPinia());
  menuApp.mount(id);
  eventsService.setBus(bus);
  console.log(`[UI MENU] Menu app initialized at element with ID "${id}"`);
}
