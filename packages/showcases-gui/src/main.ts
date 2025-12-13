import { eventsService } from '@Showcases/GUI/services';
import { initVueI18n, vueTranslationService } from '@Showcases/i18n';
import type { TFromGuiEvent, TToGuiEvent } from '@Showcases/Shared';
import { createPinia } from 'pinia';
import type { Observable, Subject } from 'rxjs';
import type { App as VueApp } from 'vue';
import { createApp } from 'vue';
import type { I18n } from 'vue-i18n';

import App from './App.vue';

const i18n: I18n = initVueI18n();

//When call any store outside of a component, we need to pass the pinia instance explicitly (to avoid issues when multiple apps are running, e.g. menu + gui)
export const guiPinia = createPinia();

export async function initGuiApp(id: string, fromGuiBus$: Subject<TFromGuiEvent>, toGuiBus$: Observable<TToGuiEvent>): Promise<void> {
  const app: VueApp<Element> = createApp(App);
  app.use(i18n);
  await vueTranslationService.waitInitialReady();
  vueTranslationService.connectVueI18n(i18n);
  app.use(guiPinia);
  eventsService.setFromGuiBus(fromGuiBus$);
  eventsService.setToGuiBus(toGuiBus$);
  app.mount(id);
  console.log(`[GUI] GUI app initialized at element with ID "${id}"`);
}
