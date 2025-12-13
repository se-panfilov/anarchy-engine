import type { TTranslationService } from '@Anarchy/i18n';
import type { Locales } from '@Showcases/Shared';

export type TTranslationService = TTranslationService<Locales> &
  Readonly<{
    waitInitialReady: () => Promise<void>;
  }>;
