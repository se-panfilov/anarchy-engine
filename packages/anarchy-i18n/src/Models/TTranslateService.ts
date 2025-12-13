import type { FormatNumberOptions, IntlShape } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { BehaviorSubject, Observable, Subject } from 'rxjs';

export type TTranslateService<TLocale extends string> = Readonly<{
  translate: (id: string, params?: Record<string, string>) => string | never;
  formatDate: (value: Date | number, options?: FormatDateOptions) => string;
  formatNumber: (value: number, options?: FormatNumberOptions) => string;
  locale$: BehaviorSubject<TLocale>;
  ready$: BehaviorSubject<boolean>;
  destroy$: Subject<void>;
  intl$: Observable<IntlShape<string> | undefined>;
}>;
