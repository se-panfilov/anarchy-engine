import type { Observable } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TAnimationsFsmMachine } from './TAnimationsFsmMachine';
import type { TEventsFsm, TStatesFsm } from './TAnimationsFsmParams';

export type TAnimationsFsmWrapper = TWrapper<TAnimationsFsmMachine> &
  Readonly<{
    changed$: Observable<TStatesFsm>;
    send: (event: TEventsFsm) => void;
    getState: () => TStatesFsm;
  }> &
  TDestroyable;
