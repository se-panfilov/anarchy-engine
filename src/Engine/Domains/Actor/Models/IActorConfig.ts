import type { IVector3dConfig } from '@Engine/Domains/ThreeLib';

import type { IActorParams, IActorType } from '../Models';

export type IActorConfig = Omit<IActorParams, 'materialParams' | 'position'> &
  Readonly<{
    type: IActorType;
    width: number;
    height: number;
    materialParams: IActorMaterialConfig;
    position: IVector3dConfig;
    castShadow: boolean;
  }>;

export type IActorMaterialConfig = Readonly<{
  color: string;
}>;
