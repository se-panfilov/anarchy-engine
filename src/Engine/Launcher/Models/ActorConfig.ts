import type { ActorParams } from '@Engine/Models/ActorParams';
import type { Vector3dConfig } from '@Engine/Launcher/Models/Vector3dConfig';

export interface ActorConfig extends Omit<ActorParams, 'materialParams'> {
  readonly params: {
    readonly type: ActorType;
    readonly width: number;
    readonly height: number;
    readonly materialParams: ActorMaterialConfig;
  };
  readonly position: Vector3dConfig;
  readonly castShadow: boolean;
}

export interface ActorMaterialConfig {
  readonly color: string;
}

export type ActorType = 'sphere' | 'plane';
