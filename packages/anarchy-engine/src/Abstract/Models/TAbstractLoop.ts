import type { TNoSpread } from '@hellpig/anarchy-engine/Mixins';
import type { Subject } from 'rxjs';

export type TAbstractLoop<T> = Readonly<{
  tick$: Subject<T>;
}> &
  TNoSpread;
