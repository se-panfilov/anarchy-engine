import type { IActorParams } from '@Engine/Models';
import type { IVector3dConfig } from './IVector3dConfig';

export interface IActorConfig extends Omit<IActorParams, 'materialParams' | 'position'> {
  readonly type: ActorType;
  readonly width: number;
  readonly height: number;
  readonly materialParams: ActorMaterialConfig;
  readonly position: IVector3dConfig;
  readonly castShadow: boolean;
}

export interface ActorMaterialConfig {
  readonly color: string;
}

export type ActorType = 'sphere' | 'plane';
