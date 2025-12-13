import type { TLocale } from '@Anarchy/i18n/Models/TLocale';

import type { TMessages } from './TMessages';

export type TLocalesMapping = Record<TLocale['id'], () => Promise<TMessages>>;
