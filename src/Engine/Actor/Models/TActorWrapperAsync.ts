import type { TWrapper } from '@/Engine/Abstract';
import type { TWithSpatialCell } from '@/Engine/Collisions/Models';
import type { TWithKinematic } from '@/Engine/Kinematic';
import type { TWithMaterial } from '@/Engine/Material';
import type { TMovable3dXYZ, TRotatable, TScalable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TWithOptionalPhysicsBody } from '@/Engine/Physics';
import type { TWithTextures } from '@/Engine/Texture';
import type { TMesh } from '@/Engine/ThreeLib';

export type TActorWrapperAsync = TWrapper<TMesh> &
  TMovable3dXYZ &
  TRotatable &
  TScalable &
  TWithObject3d &
  TWithMaterial &
  TWithTextures &
  TWithOptionalPhysicsBody &
  TWithKinematic &
  TWithSpatialCell &
  TWithTagsMixin;
