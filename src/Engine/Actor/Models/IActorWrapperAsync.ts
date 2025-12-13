import type { IWrapper } from '@/Engine/Abstract';
import type { IWithMaterialActor } from '@/Engine/Material';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';
import type { IWithTexturesActor } from '@/Engine/Texture';

import type { IMesh } from './IMesh';

export type IActorWrapperAsync = IWrapper<IMesh> & IMovable3dXYZ & IRotatable & IScalable & IWithObject3d & IWithMaterialActor & IWithTexturesActor & IWithTagsMixin;
