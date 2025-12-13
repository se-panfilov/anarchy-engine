import type { TLocalesMapping, TTranslationService } from '@Anarchy/i18n';
import { TranslationService } from '@Anarchy/i18n';
import { locales } from '@Showcases/Menu/i18n';
import type { TVueTranslationService } from '@Showcases/Menu/models';
import { ShowcasesFallbackLocale, ShowcasesLocales } from '@Showcases/Shared';
import type { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs';
import type { ShallowRef } from 'vue';
import { onBeforeUnmount, onMounted, shallowRef } from 'vue';

// TODO DESKTOP: extract this service to shared package: has to be reused in UI level
export function VueTranslationService(localesMapping: TLocalesMapping = locales): TVueTranslationService {
  // TODO DESKTOP: this initialization has to be the same as in the app (and UI), so we need a storage layer
  const i18n: TTranslationService = TranslationService(ShowcasesLocales['en-US'], ShowcasesFallbackLocale, localesMapping);

  const isReadyPromise: Promise<void> = new Promise<void>((resolve, reject): void => {
    const subscription$: Subscription = i18n.ready$.pipe(filter((isReady: boolean): boolean => isReady)).subscribe({
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

  const $t = (id: string, params?: Record<string, string> | Observable<Record<string, string>>): ShallowRef<string> => toRef(i18n.t$(id, params));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(i18n, { waitInitialReady, toRef, $t });
}

export const vueTranslationService: TVueTranslationService = VueTranslationService();
