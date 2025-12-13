import type { MeshToonMaterialParameters } from 'three';
import { Color } from 'three';

import type { IActorConfig, IActorMaterialConfig, IActorParams } from '@/Engine/Actor/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: IActorConfig): IActorParams {
  const { materialParams, position, rotation, layers, animations, scale, ...rest } = config;

  return {
    ...rest,
    ...getAdaptedMaterialParams(materialParams),
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}

function getAdaptedMaterialParams(materialParams: IActorMaterialConfig): {
  materialParams: MeshToonMaterialParameters | undefined;
} {
  const hasColor: boolean = isDefined(materialParams?.color);
  const color: Color | undefined = hasColor ? new Color(materialParams.color) : undefined;
  return { materialParams: { ...materialParams, color } };
}
