import type { TLocale } from '@hellpig/anarchy-i18n/Models/TLocale';

import type { TMessages } from './TMessages';

export type TLocalesMapping = Partial<Record<TLocale['id'], () => Promise<TMessages>>>;
