import type { ReplaySubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TEntity } from '@/Engine/Abstract';

import type { TActorEntities } from './TActorEntities';

export type TActor = TEntity<TActorEntities> &
  Readonly<{
    position$: ReplaySubject<Vector3>;
    rotation$: ReplaySubject<Euler>;
    scale$: ReplaySubject<Vector3 | undefined>;
  }>;
