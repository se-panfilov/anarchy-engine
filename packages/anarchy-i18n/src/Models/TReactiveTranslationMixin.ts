import type { FormatNumberOptions } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { Observable } from 'rxjs';

export type TReactiveTranslationMixin = Readonly<{
  $t: (id: string, params?: Record<string, string> | Observable<Record<string, string>>) => Observable<string>;
  $n: (value: number | Observable<number>, options?: FormatNumberOptions | Observable<FormatNumberOptions | undefined>) => Observable<string>;
  $d: (value: number | Date | Observable<number | Date>, options?: FormatDateOptions | Observable<FormatDateOptions | undefined>) => Observable<string>;
}>;
