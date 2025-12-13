import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { ActorTag } from '@/Engine/Domains/Actor/Constants';
import type { IWithMaterialActor } from '@/Engine/Domains/Material';
import type { IWithTexturesActor } from '@/Engine/Domains/Texture';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

import type { IMesh } from './IMesh';

export type IActorWrapper = IWrapper<IMesh> & IMovable3dXYZ & IRotatable & IScalable & IWithObject3d & IWithMaterialActor & IWithTexturesActor & IWithTags<ActorTag>;
