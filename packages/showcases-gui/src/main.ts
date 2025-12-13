import { eventsService } from '@Showcases/GUI/services';
import { vueTranslationService } from '@Showcases/i18n';
import type { TFromGuiEvent, TGuiOptions, TToGuiEvent } from '@Showcases/Shared';
import { createPinia } from 'pinia';
import type { Observable, Subject } from 'rxjs';
import type { App as VueApp } from 'vue';
import { createApp } from 'vue';

import App from './App.vue';

export async function initGuiApp(id: string, fromGuiBus$: Subject<TFromGuiEvent>, toGuiBus$: Observable<TToGuiEvent>, options?: TGuiOptions): Promise<void> {
  const uiApp: VueApp<Element> = createApp(App);
  await vueTranslationService.waitInitialReady();
  uiApp.use(createPinia());
  eventsService.setFromGuiBus(fromGuiBus$);
  eventsService.setToGuiBus(toGuiBus$);
  uiApp.mount(id);
  console.log(`[GUI] GUI app initialized at element with ID "${id}"`);
}
