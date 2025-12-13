import type { ActorType } from '@/Engine/Domains/Actor/Constants';
import type { IActorParams } from '@/Engine/Domains/Actor/Models';
import type { IEuler3dConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithCoordsXYZ } from '@/Engine/Mixins';

export type IActorConfig = Omit<IActorParams, 'materialParams' | 'position' | 'rotation'> &
  Readonly<{
    type: ActorType;
    width: number;
    height: number;
    materialParams: IActorMaterialConfig;
    position: IWithCoordsXYZ;
    rotation?: IEuler3dConfig;
    castShadow: boolean;
  }>;

export type IActorMaterialConfig = Readonly<{
  color: string;
}>;
