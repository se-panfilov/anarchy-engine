import type { FormatNumberOptions } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { Observable } from 'rxjs';

export type TReactiveTranslationMixin = Readonly<{
  translate$: (id: string, params?: Record<string, string> | Observable<Record<string, string>>) => Observable<string>;
  formatNumber$: (value: number | Observable<number>, options?: FormatNumberOptions | Observable<FormatNumberOptions | undefined>) => Observable<string>;
  formatDate$: (value: number | Date | Observable<number | Date>, options?: FormatDateOptions | Observable<FormatDateOptions | undefined>) => Observable<string>;
}>;
