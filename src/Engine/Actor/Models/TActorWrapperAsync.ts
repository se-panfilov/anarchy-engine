import type { TWrapper } from '@/Engine/Abstract';
import type { TWithMaterial } from '@/Engine/Material';
import type { TScalable, TMovable3dXYZ, TRotatable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TWithTextures } from '@/Engine/Texture';
import type { IMesh } from '@/Engine/ThreeLib';

export type TActorWrapperAsync = TWrapper<IMesh> & TMovable3dXYZ & TRotatable & TScalable & TWithObject3d & TWithMaterial & TWithTextures & TWithTagsMixin;
