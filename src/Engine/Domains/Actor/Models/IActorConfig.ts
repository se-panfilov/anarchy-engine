import type { ActorTag, ActorType } from '@/Engine/Domains/Actor/Constants';
import type { IEuler3dConfig, IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithCoordsXYZ, IWithReadonlyTags } from '@/Engine/Mixins';

import type { IActorProps } from './IActorProps';

export type IActorConfig = Omit<IActorProps, 'materialParams' | 'position' | 'rotation'> &
  Readonly<{
    type: ActorType;
    width: number;
    height: number;
    materialParams: IActorMaterialConfig;
    position: IWithCoordsXYZ;
    rotation?: IEuler3dConfig;
    castShadow: boolean;
  }> & IObject3DPropConfig & IWithReadonlyTags<ActorTag>;

export type IActorMaterialConfig = Readonly<{
  color: string;
}>;
