import type { TTranslationService } from '@Anarchy/i18n';
import type { Observable } from 'rxjs';
import type { ShallowRef } from 'vue';
import type { I18n } from 'vue-i18n';

export type TVueTranslationService = TTranslationService &
  Readonly<{
    connectVueI18n: (i18n: I18n) => void;
    toRef: (obs$: Observable<string>) => ShallowRef<string>;
    waitInitialReady: () => Promise<void>;
  }>;
