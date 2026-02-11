import type { TLocale } from '@Anarchy/I18N/Models/TLocale';

import type { TMessages } from './TMessages';

export type TLocalesMapping = Partial<Record<TLocale['id'], () => Promise<TMessages>>>;
