import type { ActorParams } from '@Engine/Models/ActorParams';

export interface ActorConfig extends Omit<ActorParams, 'materialParams'> {
  readonly type: 'sphere';
  readonly width: number;
  readonly height: number;
  readonly materialParams: ActorMaterialConfig;
}

export interface ActorMaterialConfig {
  readonly color: string;
}
