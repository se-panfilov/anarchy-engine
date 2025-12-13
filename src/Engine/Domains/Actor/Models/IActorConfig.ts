import type { IEuler3dConfig, IVector3dConfig } from '@Engine/Domains/ThreeLib';

import type { ActorType } from '../Constants';
import type { IActorParams } from '../Models';

export type IActorConfig = Omit<IActorParams, 'materialParams' | 'position' | 'rotation'> &
  Readonly<{
    type: ActorType;
    width: number;
    height: number;
    materialParams: IActorMaterialConfig;
    position: IVector3dConfig;
    rotation?: IEuler3dConfig;
    castShadow: boolean;
  }>;

export type IActorMaterialConfig = Readonly<{
  color: string;
}>;
