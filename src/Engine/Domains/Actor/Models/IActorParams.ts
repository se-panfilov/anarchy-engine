import type { ActorTag } from '@/Engine/Domains/Actor/Constants';
import type { IObject3DPropParams } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IActorProps } from './IActorProps';

export type IActorParams = IActorProps & IObject3DPropParams & IWithReadonlyTags<ActorTag>;
