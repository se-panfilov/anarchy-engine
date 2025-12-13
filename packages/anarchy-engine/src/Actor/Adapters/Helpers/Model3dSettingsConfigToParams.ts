import type { TActorModel3dSettings, TActorModel3dSettingsConfig } from '@Engine/Actor/Models';
import { toQuaternion } from '@Engine/Math';
import { isDefined } from '@Shared/Utils';
import { Vector3 } from 'three';

export function model3dSettingsConfigToParams(settings: TActorModel3dSettingsConfig): TActorModel3dSettings {
  const { positionOffset, rotationOffset, scaleOffset, ...rest } = settings;

  return {
    ...rest,
    positionOffset: isDefined(positionOffset) ? new Vector3(positionOffset.x, positionOffset.y, positionOffset.z) : undefined,
    rotationOffset: isDefined(rotationOffset) ? toQuaternion(rotationOffset) : undefined,
    scaleOffset: isDefined(scaleOffset) ? new Vector3(scaleOffset.x, scaleOffset.y, scaleOffset.z) : undefined
  };
}
