import type { TLocale } from '@Anarchy/i18n';
import type { TUseVueTranslations, TVueTranslationService } from '@Showcases/i18n';
import type { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs';
import type { ShallowRef } from 'vue';
import { onBeforeUnmount, onMounted, shallowRef } from 'vue';

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

  function useTranslations(): TUseVueTranslations {
    const localeRef = shallowRef(showcasesTranslationService.locale$.value);
    let sub: Subscription | undefined;

    // eslint-disable-next-line functional/immutable-data
    onMounted(() => (sub = showcasesTranslationService.locale$.subscribe((locale: TLocale): void => void (localeRef.value = locale))));
    onBeforeUnmount((): void => sub?.unsubscribe());

    const $t = (id: string, params?: Record<string, string>): string => {
      void localeRef.value;
      return showcasesTranslationService.translate(id, params);
    };

    return { $t };
  }

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(showcasesTranslationService, { waitInitialReady, toRef, useTranslations });
}

export const vueTranslationService: TVueTranslationService = VueTranslationService();
