import type { Observable } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TAnimationsFsmMachine } from './TAnimationsFsmMachine';

export type TAnimationsFsmWrapper = TWrapper<TAnimationsFsmMachine> &
  Readonly<{
    changed$: Observable<string | number | symbol>;
    send: (event: string | number | symbol) => void;
    getState: () => string | number | symbol;
  }> &
  TDestroyable;
