import type { ActorConfig, ActorMaterialConfig } from '@Engine/Launcher/Models';
import { Color, Vector3 } from 'three';
import type { ActorParams } from '@Engine/Models';
import type { MeshToonMaterialParameters } from 'three';
import { isDefined } from '@Engine/Utils';

export function actorAdapter(config: ActorConfig): ActorParams {
  const { materialParams, position, ...rest } = config;
  return {
    ...rest,
    ...getAdaptedMaterialParams(materialParams),
    position: new Vector3(position.x, position.y, position.z)
  };
}

function getAdaptedMaterialParams(materialParams: ActorMaterialConfig): {
  materialParams: MeshToonMaterialParameters | undefined;
} {
  const hasColor: boolean = isDefined(materialParams?.color);
  const color: Color | undefined = hasColor ? new Color(materialParams.color) : undefined;
  return { materialParams: { ...materialParams, color } };
}
