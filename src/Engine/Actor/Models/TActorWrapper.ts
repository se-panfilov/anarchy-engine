import type { Observable } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TWithCollisions } from '@/Engine/Collisions';
import type { TWithKinematic } from '@/Engine/Kinematic';
import type { TMovable3dXYZ, TRotatable, TScalable, TWithTagsMixin } from '@/Engine/Mixins';
import type { TModel3dFacade } from '@/Engine/Models3d';
import type { TWithOptionalPhysicsBody } from '@/Engine/Physics';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';

export type TActorWrapper = TWrapper<TModel3dFacade> &
  TMovable3dXYZ &
  TRotatable &
  TScalable &
  TWithOptionalPhysicsBody &
  TWithKinematic &
  TWithSpatial &
  TWithCollisions &
  TWithUpdateSpatialCell &
  TWithTagsMixin &
  Readonly<{
    position$: Observable<Vector3>;
    rotation$: Observable<Euler>;
  }>;
