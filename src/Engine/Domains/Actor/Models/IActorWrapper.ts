import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { ActorTag } from '@/Engine/Domains/Actor/Constants';
import type { IMovable, IRotatable, IScalable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

import type { IMesh } from './IMesh';

export type IActorWrapper = IWrapper<IMesh> & IMovable & IRotatable & IScalable & IWithObject3d & IWithTags<ActorTag>;
