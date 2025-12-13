import type { Subject } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TAnimationsFsmMachine } from './TAnimationsFsmMachine';

export type TAnimationsFsmWrapper = TWrapper<TAnimationsFsmMachine> &
  Readonly<{
    changed$: Subject<string | number | symbol>;
    send: (event: string | number | symbol) => void;
    getState: () => string | number | symbol;
  }> &
  TDestroyable;
