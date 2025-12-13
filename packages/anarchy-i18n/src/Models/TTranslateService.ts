import type { FormatNumberOptions } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { BehaviorSubject } from 'rxjs';

export type TTranslateService<TLocale extends string> = Readonly<{
  translate: (id: string, params?: Record<string, string>) => string | never;
  formatDate: (value: Date | number, options?: FormatDateOptions) => string;
  formatNumber: (value: number, options?: FormatNumberOptions) => string;
  locale$: BehaviorSubject<TLocale>;
  ready$: BehaviorSubject<boolean>;
}>;
