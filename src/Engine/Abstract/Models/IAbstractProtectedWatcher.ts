import type { Observable } from 'rxjs';

import type { IAbstractWatcher } from '@/Engine/Abstract';

export type IAbstractProtectedWatcher<T> = Omit<IAbstractWatcher<T>, 'value$'> &
  Readonly<{
    value$: Observable<T>;
  }>;
