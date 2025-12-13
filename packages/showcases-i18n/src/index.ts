import { BehaviorSubject } from 'rxjs';

const loaders = import.meta.glob('../locales/*.json', { eager: false }) as Record<string, () => Promise<unknown>>;
const pathFor = (loc: TLocale): string => `../locales/${loc}.json`;

const state$ = new BehaviorSubject<TI18nState>({
  locale: initial.locale,
  fallbackLocale: initial.fallbackLocale ?? initial.locale
});
