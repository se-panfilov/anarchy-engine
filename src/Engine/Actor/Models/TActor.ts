import type { BehaviorSubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TEntity } from '@/Engine/Abstract';

import type { TActorEntities } from './TActorEntities';

export type TActor = TEntity<TActorEntities> &
  Readonly<{
    position$: BehaviorSubject<Vector3>;
    rotation$: BehaviorSubject<Euler>;
    scale$: BehaviorSubject<Vector3 | undefined>;
  }>;
