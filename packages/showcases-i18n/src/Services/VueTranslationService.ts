import type { TLocale } from '@Anarchy/i18n';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { TVueTranslationService } from '@Showcases/i18n';
import type { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs';
import type { ShallowRef } from 'vue';
import { onBeforeUnmount, onMounted, shallowRef } from 'vue';
import type { I18n } from 'vue-i18n';

import { showcasesTranslationService } from './ShowcasesTranslationService';

export function VueTranslationService(): TVueTranslationService {
  let localeSub: Subscription;

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

  function connectVueI18n(i18n: I18n): void {
    localeSub = showcasesTranslationService.locale$.subscribe(({ id: localeId }: TLocale): void => {
      // eslint-disable-next-line functional/immutable-data
      if (i18n.mode === 'legacy') i18n.global.locale = localeId;
      // eslint-disable-next-line functional/immutable-data
      else (i18n.global.locale as any).value = localeId;

      const messages = showcasesTranslationService.getCurrentMessages();
      if (isDefined(messages)) i18n.global.setLocaleMessage(localeId, messages);
      if (isNotDefined(messages)) console.error(`[VueTranslationService]: Cannot load messages for vue-i18n for locale "${localeId}"`);
    });
  }

  const destroySub$: Subscription = showcasesTranslationService.destroy$.subscribe(() => {
    destroySub$.unsubscribe();
    localeSub?.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(showcasesTranslationService, { waitInitialReady, toRef, connectVueI18n });
}

export const vueTranslationService: TVueTranslationService = VueTranslationService();
