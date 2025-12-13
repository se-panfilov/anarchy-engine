import { showcasesTranslationService } from '@Showcases/i18n';
import type { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs';
import type { TVueTranslationService } from 'showcases-menu/src/models';
import type { ShallowRef } from 'vue';
import { onBeforeUnmount, onMounted, shallowRef } from 'vue';

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

  const $t = (id: string, params?: Record<string, string> | Observable<Record<string, string>>): ShallowRef<string> => toRef(showcasesTranslationService.t$(id, params));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(showcasesTranslationService, { waitInitialReady, toRef, $t });
}

export const vueTranslationService: TVueTranslationService = VueTranslationService();
