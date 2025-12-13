import type { Observable } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TFacade } from '@/Engine/Abstract';

import type { TActorFacadeEntities } from './TActorFacadeEntities';

// TODO 8.0.0. MODELS: choose one – either TActorWrapper or TActorFacade
export type TActorFacade = TFacade<TActorFacadeEntities> &
  Readonly<{
    position$: Observable<Vector3>;
    rotation$: Observable<Euler>;
  }>;
