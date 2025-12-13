import type { TTranslationService } from '@Anarchy/i18n';
import type { Observable } from 'rxjs';
import type { ShallowRef } from 'vue';

export type TVueTranslationService = TTranslationService &
  Readonly<{
    waitInitialReady: () => Promise<void>;
    toRef: (obs$: Observable<string>) => ShallowRef<string>;
    $t: (id: string, params?: Record<string, string> | Observable<Record<string, string>>) => ShallowRef<string>;
  }>;
