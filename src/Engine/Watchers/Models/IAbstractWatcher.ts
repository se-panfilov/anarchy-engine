import type { Subject } from 'rxjs';

import type { IRegistrable } from '@/Engine';

export type IAbstractWatcher<T> = Readonly<{
  type: string;
  value$: Subject<T>;
  destroy$: Subject<void>;
}> &
  IRegistrable;
