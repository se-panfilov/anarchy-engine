import type { TLocalesMapping, TTranslationService } from '@Anarchy/i18n';
import { TranslationService } from '@Anarchy/i18n';
import { locales } from '@Showcases/Menu/i18n';
import type { TTranslationService } from '@Showcases/Menu/models';
import { Locales } from '@Showcases/Shared';
import type { Subscription } from 'rxjs';
import { filter } from 'rxjs';

export function VueTranslationService(localesMapping: TLocalesMapping<Locales> = locales): TTranslationService {
  const i18n: TTranslationService<Locales> = TranslationService<Locales>(Locales.en, Locales.en, localesMapping);

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

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(i18n, { waitInitialReady });
}

export const vueTranslationService: TTranslationService = VueTranslationService();
