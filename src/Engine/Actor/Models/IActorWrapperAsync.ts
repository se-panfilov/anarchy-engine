import type { IWrapper } from '@/Engine/Abstract';
import type { IWithMaterial } from '@/Engine/Material';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';
import type { IWithTextures } from '@/Engine/Texture';
import type { IMesh } from '@/Engine/ThreeLib';

export type IActorWrapperAsync = IWrapper<IMesh> & IMovable3dXYZ & IRotatable & IScalable & IWithObject3d & IWithMaterial & IWithTextures & IWithTagsMixin;
