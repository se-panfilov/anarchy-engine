import type { TTranslationService } from '@Anarchy/i18n';
import type { Locales } from '@Showcases/Shared';

export type TVueTranslationService = TTranslationService<Locales> &
  Readonly<{
    waitInitialReady: () => Promise<void>;
  }>;
