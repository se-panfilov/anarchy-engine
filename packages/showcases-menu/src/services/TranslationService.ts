import type { TLocalesMapping, TTranslateService } from '@Anarchy/i18n';
import { TranslateService } from '@Anarchy/i18n';
import { locales } from '@Showcases/Menu/i18n';
import type { TTranslationService } from '@Showcases/Menu/models';
import { Locales } from '@Showcases/Shared';
import type { Subscription } from 'rxjs';
import { filter } from 'rxjs';

export function TranslationService(localesMapping: TLocalesMapping<Locales> = locales): TTranslationService {
  const i18n: TTranslateService<Locales> = TranslateService<Locales>(Locales.en, Locales.en, localesMapping);

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

export const translationService: TTranslationService = TranslationService();
