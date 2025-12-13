import { isDefined } from '@Anarchy/Shared/Utils';
import { vueTranslationService } from '@Showcases/i18n';
import { eventsService } from '@Showcases/Menu/services';
import { useMenuOptionsStore } from '@Showcases/Menu/stores/MenuOptionsStore';
import type { TFromMenuEvent, TMenuOptions, TToMenuEvent } from '@Showcases/Shared';
import { createPinia } from 'pinia';
import type { Observable, Subject } from 'rxjs';
import type { App as VueApp } from 'vue';
import { createApp } from 'vue';

import App from './App.vue';

export async function initMenuApp(id: string, fromMenuBus$: Subject<TFromMenuEvent>, toMenuBus$: Observable<TToMenuEvent>, options?: TMenuOptions): Promise<void> {
  const uiApp: VueApp<Element> = createApp(App);
  await vueTranslationService.waitInitialReady();
  uiApp.use(createPinia());
  eventsService.setFromMenuBus(fromMenuBus$);
  eventsService.setToMenuBus(toMenuBus$);
  uiApp.mount(id);
  if (isDefined(options)) useMenuOptionsStore().setState(options);
  console.log(`[GUI] GUI app initialized at element with ID "${id}"`);
}
