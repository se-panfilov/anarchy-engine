import type { ActorParams } from '@Engine/Models/ActorParams';
import type { Vector3dConfig } from '@Engine/Launcher/Models/Vector3dConfig';

export interface ActorConfig {
  readonly params: ActorConfigParams;
  readonly position: Vector3dConfig;
  readonly castShadow: boolean;
}

export interface ActorMaterialConfig {
  readonly color: string;
}

interface ActorConfigParams extends Omit<ActorParams, 'materialParams'> {
  readonly type: ActorType;
  readonly width: number;
  readonly height: number;
  readonly materialParams: ActorMaterialConfig;
}

export type ActorType = 'sphere' | 'plane';
