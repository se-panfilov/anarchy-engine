import type { TWrapper } from '@/Engine/Abstract';
import type { TWithMaterial } from '@/Engine/Material';
import type { TMovable3dXYZ, TRotatable, TScalable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TWithPhysicsBody } from '@/Engine/Physics';
import type { TWithTextures } from '@/Engine/Texture';
import type { TMesh } from '@/Engine/ThreeLib';

export type TActorWrapperAsync = TWrapper<TMesh> & TMovable3dXYZ & TRotatable & TScalable & TWithObject3d & TWithMaterial & TWithTextures & TWithPhysicsBody & TWithTagsMixin;
