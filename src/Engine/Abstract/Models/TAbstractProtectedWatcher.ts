import type { Observable } from 'rxjs';

import type { TAbstractWatcher } from '@/Engine/Abstract';

export type TAbstractProtectedWatcher<T> = Omit<TAbstractWatcher<T>, 'value$'> &
  Readonly<{
    value$: Observable<T>;
  }>;
