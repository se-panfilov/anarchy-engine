import type { TReactiveTranslationMixin, TTranslationService } from '@Anarchy/i18n/Models';
import { isDefined, toObservable$ } from '@Anarchy/Shared/Utils';
import type { FormatNumberOptions, IntlShape } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { Observable } from 'rxjs';
import { combineLatest, distinctUntilChanged, filter, map, shareReplay, tap } from 'rxjs';

export function ReactiveTranslationMixin(service: Omit<TTranslationService, keyof TReactiveTranslationMixin>): TReactiveTranslationMixin {
  function translate$(id: string, params?: Record<string, string> | Observable<Record<string, string>>): Observable<string> {
    const params$ = toObservable$(params ?? {});
    return combineLatest([service.locale$, params$]).pipe(
      map(([, p]) => {
        const intl = service.getCurrentIntl();
        return [intl, p];
      }),
      filter((intl, _p) => isDefined(intl)),
      map(([intl, p]) => (intl as IntlShape).formatMessage({ id, defaultMessage: id }, p)),
      distinctUntilChanged(),
      tap((value: string): string => {
        if (value === id) console.warn(`[TranslationService]: Can't find translation for "${id}".`);
        return value;
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  function formatNumber$(value: number | Observable<number>, options?: FormatNumberOptions | Observable<FormatNumberOptions | undefined>): Observable<string> {
    return combineLatest([service.locale$, toObservable$(value), toObservable$(options)]).pipe(
      map(([, v, o]) => {
        const intl = service.getCurrentIntl();
        return [intl, v, o];
      }),
      filter((intl, _p) => isDefined(intl)),
      map(([intl, v, o]) => (intl as IntlShape).formatNumber(v, o)),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  function formatDate$(value: number | Date | Observable<number | Date>, options?: FormatDateOptions | Observable<FormatDateOptions | undefined>): Observable<string> {
    return combineLatest([service.locale$, toObservable$(value), toObservable$(options)]).pipe(
      map(([, v, o]) => {
        const intl = service.getCurrentIntl();
        return [intl, v, o];
      }),
      filter((intl, _p) => isDefined(intl)),
      map(([intl, v, o]) => (intl as IntlShape).formatDate(v, o)),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  return { translate$, formatNumber$, formatDate$ };
}
