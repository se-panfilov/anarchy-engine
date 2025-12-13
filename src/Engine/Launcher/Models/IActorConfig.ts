import type { IActorType, IActorParams } from '@Engine/Models';
import type { IVector3dConfig } from './IVector3dConfig';

export type IActorConfig = Omit<IActorParams, 'materialParams' | 'position'> &
  Readonly<{
    type: IActorType;
    width: number;
    height: number;
    materialParams: ActorMaterialConfig;
    position: IVector3dConfig;
    castShadow: boolean;
  }>;

export type ActorMaterialConfig = Readonly<{
  color: string;
}>;
