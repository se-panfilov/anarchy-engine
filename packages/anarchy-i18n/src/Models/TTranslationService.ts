import type { TLocale } from '@Anarchy/i18n/Models/TLocale';
import type { FormatNumberOptions, IntlShape } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { BehaviorSubject, Observable, Subject } from 'rxjs';

import type { TReactiveTranslationMixin } from './TReactiveTranslationMixin';

export type TTranslationService = Readonly<{
  destroy$: Subject<void>;
  formatDate: (value: Date | number, options?: FormatDateOptions) => string;
  formatNumber: (value: number, options?: FormatNumberOptions) => string;
  getCurrentLocale: () => TLocale;
  intl$: Observable<IntlShape<string> | undefined>;
  locale$: Observable<TLocale>;
  ready$: BehaviorSubject<boolean>;
  setLocale: (locale: TLocale) => Promise<void>;
  translateSafe: (id: string, params?: Record<string, string>) => Promise<string>;
  translate: (id: string, params?: Record<string, string>) => string | never;
}> &
  TReactiveTranslationMixin;
