import { isDefined } from '@Engine/Utils';
import type { MeshToonMaterialParameters } from 'three';
import { Color, Vector3 } from 'three';

import type { IActorConfig, IActorMaterialConfig, IActorParams } from '../Models';

export function actorAdapter(config: IActorConfig): IActorParams {
  const { materialParams, position, ...rest } = config;
  return {
    ...rest,
    ...getAdaptedMaterialParams(materialParams),
    position: new Vector3(position.x, position.y, position.z)
  };
}

function getAdaptedMaterialParams(materialParams: IActorMaterialConfig): {
  materialParams: MeshToonMaterialParameters | undefined;
} {
  const hasColor: boolean = isDefined(materialParams?.color);
  const color: Color | undefined = hasColor ? new Color(materialParams.color) : undefined;
  return { materialParams: { ...materialParams, color } };
}
