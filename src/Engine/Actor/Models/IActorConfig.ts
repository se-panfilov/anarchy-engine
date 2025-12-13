import type { ActorType } from '@/Engine/Actor/Constants';
import type { IWithConfigId, IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { IActorProps } from './IActorProps';

export type IActorConfig = IActorProps &
  Readonly<{
    type: ActorType;
    width: number;
    height: number;
    castShadow: boolean;
  }> &
  IWithConfigId &
  IObject3DPropConfig &
  IWithReadonlyTags<string>;
