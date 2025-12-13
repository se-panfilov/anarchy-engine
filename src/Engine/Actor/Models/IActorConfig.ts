import type { ActorTag, ActorType } from '@/Engine/Actor/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { IActorProps } from './IActorProps';

export type IActorConfig = Omit<IActorProps, 'materialParams'> &
  Readonly<{
    type: ActorType;
    width: number;
    height: number;
    materialParams: IActorMaterialConfig;
    castShadow: boolean;
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags<ActorTag>;

export type IActorMaterialConfig = Readonly<{
  color: string;
}>;
