import type { TLocale } from '@Anarchy/i18n';
import type { TVueTranslationService } from '@Showcases/i18n';
import type { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs';
import type { ShallowRef } from 'vue';
import { onBeforeUnmount, onMounted, shallowRef } from 'vue';
import type { I18n } from 'vue-i18n';

import { showcasesTranslationService } from './ShowcasesTranslationService';

export function VueTranslationService(): TVueTranslationService {
  const isReadyPromise: Promise<void> = new Promise<void>((resolve, reject): void => {
    const subscription$: Subscription = showcasesTranslationService.ready$.pipe(filter((isReady: boolean): boolean => isReady)).subscribe({
      next: (): void => {
        subscription$.unsubscribe();
        return resolve();
      },
      error: (error: Error): void => {
        subscription$.unsubscribe();
        reject(error);
      }
    });
  });

  //Make sure that the default and fallback locales are loaded before the app starts
  const waitInitialReady = async (): Promise<void> => isReadyPromise;

  function toRef(obs$: Observable<string>): ShallowRef<string> {
    const ref: ShallowRef<string> = shallowRef<string>('');
    let sub: Subscription | undefined;

    onMounted((): void => {
      // eslint-disable-next-line functional/immutable-data
      sub = obs$.subscribe((value: string): void => void (ref.value = value));
    });

    onBeforeUnmount((): void => sub?.unsubscribe());

    return ref;
  }

  // TODO DESKTOP: destroy with unsubscribe is needed
  function connectVueI18n(i18n: I18n): void {
    const sub: Subscription = showcasesTranslationService.locale$.subscribe(({ id: localeId }: TLocale): void => {
      // eslint-disable-next-line functional/immutable-data
      i18n.global.locale.value = localeId;
      import(`./locales/${localeId}.json`).then((messages) => {
        i18n.global.setLocaleMessage(localeId, messages.default);
      });
    });
  }

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(showcasesTranslationService, { waitInitialReady, toRef, connectVueI18n });
}

export const vueTranslationService: TVueTranslationService = VueTranslationService();
