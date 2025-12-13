import { createPinia } from 'pinia';
import type { App as VueApp } from 'vue';
import { createApp } from 'vue';

import App from './App.vue';

export function initMenuApp(id: string): void {
  const menuApp: VueApp<Element> = createApp(App);
  menuApp.use(createPinia());
  menuApp.mount(id);
  console.log(`[UI MENU] Menu app initialized at element with ID "${id}"`);
}
