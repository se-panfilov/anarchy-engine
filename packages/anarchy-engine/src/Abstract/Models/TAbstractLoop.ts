import type { TNoSpread } from '@Engine/Mixins';
import type { Subject } from 'rxjs';

export type TAbstractLoop<T> = Readonly<{
  tick$: Subject<T>;
}> &
  TNoSpread;
