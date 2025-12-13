import { isDefined } from '@Anarchy/Shared/Utils';
import { initVueI18n, vueTranslationService } from '@Showcases/i18n';
import { eventsService } from '@Showcases/Menu/services';
import { menuPinia } from '@Showcases/Menu/stores/CreatePinia';
import { useMenuOptionsStore } from '@Showcases/Menu/stores/MenuOptionsStore';
import type { TFromMenuEvent, TMenuOptions, TToMenuEvent } from '@Showcases/Shared';
import type { Observable, Subject } from 'rxjs';
import type { App as VueApp } from 'vue';
import { createApp } from 'vue';
import type { I18n } from 'vue-i18n';

import App from './App.vue';

const i18n: I18n = initVueI18n();

export async function initMenuApp(id: string, fromMenuBus$: Subject<TFromMenuEvent>, toMenuBus$: Observable<TToMenuEvent>, options?: TMenuOptions): Promise<void> {
  const app: VueApp<Element> = createApp(App);
  app.use(i18n);
  await vueTranslationService.waitInitialReady();
  vueTranslationService.connectVueI18n(i18n);
  app.use(menuPinia);
  eventsService.setFromMenuBus(fromMenuBus$);
  eventsService.setToMenuBus(toMenuBus$);
  app.mount(id);
  if (isDefined(options)) useMenuOptionsStore(menuPinia).setState(options);
  console.log(`[UI MENU] Menu app initialized at element with ID "${id}"`);
}
