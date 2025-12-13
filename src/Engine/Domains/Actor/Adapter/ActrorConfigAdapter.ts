import type { MeshToonMaterialParameters } from 'three';
import { Color } from 'three';

import type { IActorConfig, IActorMaterialConfig, IActorParams } from '@/Engine/Domains/Actor/Models';
import { isDefined } from '@/Engine/Utils';
import { EulerWrapper, Vector3Wrapper } from '@/Engine/Wrappers';

export function getParams(config: IActorConfig): IActorParams {
  const { materialParams, position, rotation, ...rest } = config;
  return {
    ...rest,
    ...getAdaptedMaterialParams(materialParams),
    position: Vector3Wrapper(position),
    rotation: rotation ? EulerWrapper(rotation) : undefined
  };
}

function getAdaptedMaterialParams(materialParams: IActorMaterialConfig): {
  materialParams: MeshToonMaterialParameters | undefined;
} {
  const hasColor: boolean = isDefined(materialParams?.color);
  const color: Color | undefined = hasColor ? new Color(materialParams.color) : undefined;
  return { materialParams: { ...materialParams, color } };
}
