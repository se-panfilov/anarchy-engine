import type { IWrapper } from '@/Engine/Abstract';
import type { IWithMaterialActor } from '@/Engine/Material';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';
import type { IWithTexturesActor } from '@/Engine/Texture';

export type IParticlesWrapperAsync = IWrapper<IMesh> & IMovable3dXYZ & IRotatable & IScalable & IWithObject3d & IWithMaterialActor & IWithTexturesActor & IWithTagsMixin;
