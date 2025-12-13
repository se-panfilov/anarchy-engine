import type { TWrapper } from '@/Engine/Abstract';
import type { TWithMaterial } from '@/Engine/Material';
import type { IScalable, TMovable3dXYZ, TRotatable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { IWithTextures } from '@/Engine/Texture';
import type { IMesh } from '@/Engine/ThreeLib';

export type TActorWrapperAsync = TWrapper<IMesh> & TMovable3dXYZ & TRotatable & IScalable & TWithObject3d & TWithMaterial & IWithTextures & TWithTagsMixin;
