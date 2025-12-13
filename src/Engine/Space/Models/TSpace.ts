import type { Observable } from 'rxjs';

import type { TEntity } from '@/Engine/Abstract';

import type { TSpaceEntities } from './TSpaceEntities';

export type TSpace = TEntity<TSpaceEntities> &
  Readonly<{
    built$: Observable<void>;
  }>;
