import { eventsService } from '@Showcases/GUI/services';
import { vueTranslationService } from '@Showcases/i18n';
import type { TFromGuiEvent, TToGuiEvent } from '@Showcases/Shared';
import { createPinia } from 'pinia';
import type { Observable, Subject } from 'rxjs';
import type { App as VueApp } from 'vue';
import { createApp } from 'vue';

import App from './App.vue';

export async function initGuiApp(id: string, fromGuiBus$: Subject<TFromGuiEvent>, toGuiBus$: Observable<TToGuiEvent>): Promise<void> {
  const guiApp: VueApp<Element> = createApp(App);
  await vueTranslationService.waitInitialReady();
  guiApp.use(createPinia());
  eventsService.setFromGuiBus(fromGuiBus$);
  eventsService.setToGuiBus(toGuiBus$);
  guiApp.mount(id);
  console.log(`[GUI] GUI app initialized at element with ID "${id}"`);
}
