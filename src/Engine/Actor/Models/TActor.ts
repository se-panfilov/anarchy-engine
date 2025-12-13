import type { Observable } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TEntity } from '@/Engine/Abstract';

import type { TActorEntities } from './TActorEntities';

export type TActor = TEntity<TActorEntities> &
  Readonly<{
    position$: Observable<Vector3>;
    rotation$: Observable<Euler>;
  }>;
