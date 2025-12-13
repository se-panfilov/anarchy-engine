import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { ActorTag } from '@/Engine/Domains/Actor/Constants';
import type { IMovableXYZ, IRotatable, IScalable, IWithObject3d, IWithTags, WithTexturesActor } from '@/Engine/Mixins';

import type { IMesh } from './IMesh';

export type IActorWrapper = IWrapper<IMesh> & IMovableXYZ & IRotatable & IScalable & IWithObject3d & WithTexturesActor & IWithTags<ActorTag>;
