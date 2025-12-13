import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { ActorTag } from '@/Engine/Domains/Actor/Constants';
import type { IWithTags } from '@/Engine/Mixins';

import type { IActorAccessors } from './IActorAccessors';
import type { IMesh } from './IMesh';

export type IActorWrapper = IWrapper<IMesh> & IActorAccessors & IWithTags<ActorTag>;
