import type { TTranslateService } from '@Anarchy/i18n/Models';
import { isDefined, toObservable$ } from '@Anarchy/Shared/Utils';
import type { FormatNumberOptions, IntlShape } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { Observable } from 'rxjs';
import { combineLatest, distinctUntilChanged, filter, map, shareReplay } from 'rxjs';

type TReactiveTranslationMixin = Readonly<{
  $t: (id: string, params?: Record<string, string> | Observable<Record<string, string>>) => Observable<string>;
  $n: (value: number | Observable<number>, options?: FormatNumberOptions | Observable<FormatNumberOptions | undefined>) => Observable<string>;
  $d: (value: number | Date | Observable<number | Date>, options?: FormatDateOptions | Observable<FormatDateOptions | undefined>) => Observable<string>;
}>;

export function ReactiveTranslationMixin<TLocale extends string>(service: TTranslateService<TLocale>): TReactiveTranslationMixin {
  const intlReady$: Observable<IntlShape<string>> = service.intl$.pipe(filter(isDefined), distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));

  function $t(id: string, params?: Record<string, string> | Observable<Record<string, string>>): Observable<string> {
    const params$ = toObservable$(params ?? {});
    return combineLatest([intlReady$, params$]).pipe(
      map(([intl, p]) => intl.formatMessage({ id, defaultMessage: id }, p)),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  function $n(value: number | Observable<number>, options?: FormatNumberOptions | Observable<FormatNumberOptions | undefined>): Observable<string> {
    return combineLatest([intlReady$, toObservable$(value), toObservable$(options)]).pipe(
      map(([intl, v, o]) => intl.formatNumber(v, o)),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  function $d(value: number | Date | Observable<number | Date>, options?: FormatDateOptions | Observable<FormatDateOptions | undefined>): Observable<string> {
    return combineLatest([intlReady$, toObservable$(value), toObservable$(options)]).pipe(
      map(([intl, v, o]) => intl.formatDate(v, o)),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  return { $t, $n, $d };
}
