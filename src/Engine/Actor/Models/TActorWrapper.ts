import type { Observable } from 'rxjs';
import type { Euler, Group, Mesh, Object3D, Vector3 } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TWithCollisions } from '@/Engine/Collisions';
import type { TWithKinematic } from '@/Engine/Kinematic';
import type { TMovable3dXYZ, TRotatable, TScalable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TModel3dFacade } from '@/Engine/Models3d';
import type { TWithOptionalPhysicsBody } from '@/Engine/Physics';
import type { TWithSpatial, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';

export type TActorWrapper = TWrapper<Group | Mesh | Object3D> &
  TMovable3dXYZ &
  TRotatable &
  TScalable &
  TWithObject3d &
  TWithOptionalPhysicsBody &
  TWithKinematic &
  TWithSpatial &
  TWithCollisions &
  TWithUpdateSpatialCell &
  TWithTagsMixin &
  Readonly<{
    position$: Observable<Vector3>;
    rotation$: Observable<Euler>;
    getFacade: () => TModel3dFacade;
  }>;
