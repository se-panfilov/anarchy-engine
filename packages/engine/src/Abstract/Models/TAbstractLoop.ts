import type { Subject } from 'rxjs';

import type { TNoSpread } from '@/Mixins';

export type TAbstractLoop<T> = Readonly<{
  tick$: Subject<T>;
}> &
  TNoSpread;
