import type { TLocale } from '@Anarchy/i18n/Models/TLocale';
import type { TMessages } from '@Anarchy/i18n/Models/TMessages';
import type { MessageFormatElement } from '@formatjs/icu-messageformat-parser';
import type { FormatNumberOptions, IntlShape } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { BehaviorSubject, Observable, Subject } from 'rxjs';

import type { TReactiveTranslationMixin } from './TReactiveTranslationMixin';

export type TTranslationService = Readonly<{
  destroy$: Subject<void>;
  formatDate: (value: Date | number, options?: FormatDateOptions) => string;
  formatDateSafe: (value: Date | number, options?: FormatDateOptions) => Promise<string>;
  formatNumber: (value: number, options?: FormatNumberOptions) => string;
  formatNumberSafe: (value: number, options?: FormatNumberOptions) => Promise<string>;
  getCurrentIntl: () => IntlShape | undefined;
  getCurrentLocale: () => TLocale;
  getCurrentMessages: () => TMessages | Record<string, MessageFormatElement[]> | undefined;
  locale$: Observable<TLocale>;
  ready$: BehaviorSubject<boolean>;
  setLocale: (locale: TLocale) => Promise<void>;
  translate: (id: string, params?: Record<string, string>) => string | never;
  translateSafe: (id: string, params?: Record<string, string>) => Promise<string>;
}> &
  TReactiveTranslationMixin;
