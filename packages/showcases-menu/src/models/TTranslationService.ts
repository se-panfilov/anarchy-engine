import type { TTranslateService } from '@Anarchy/i18n';
import type { Locales } from '@Showcases/Shared';

export type TTranslationService = TTranslateService<Locales> &
  Readonly<{
    waitInitialReady: () => Promise<void>;
  }>;
