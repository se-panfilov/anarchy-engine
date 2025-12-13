import type { TTranslationService } from '@Anarchy/i18n';
import type { Locales } from '@Showcases/Shared';
import type { Observable } from 'rxjs';
import type { ShallowRef } from 'vue';

export type TVueTranslationService = TTranslationService<Locales> &
  Readonly<{
    waitInitialReady: () => Promise<void>;
    toRef: (obs$: Observable<string>) => ShallowRef<string>;
  }>;
