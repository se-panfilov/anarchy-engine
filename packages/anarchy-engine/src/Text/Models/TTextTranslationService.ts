import type { Observable } from 'rxjs';

export type TTextTranslationService = Readonly<{
  translate$: (id: string, params?: Record<string, string> | Observable<Record<string, string>>) => Observable<string>;
  locale$: Observable<any | Readonly<{ font?: string }>>;
  getCurrentLocale: () => any | Readonly<{ font?: string }>;
  // formatNumber$: (value: number | Observable<number>, options?: FormatNumberOptions | Observable<FormatNumberOptions | undefined>) => Observable<string>;
  // formatDate$: (value: number | Date | Observable<number | Date>, options?: FormatDateOptions | Observable<FormatDateOptions | undefined>) => Observable<string>;
}>;
