import type { MeshToonMaterialParameters } from 'three';
import { Color } from 'three';

import type { IActorConfig, IActorMaterialConfig, IActorParams } from '@/Engine/Domains/Actor/Models';
import { isDefined } from '@/Engine/Utils';
import { EulerWrapper, Vector3Wrapper } from '@/Engine/Wrappers';

export function getParams(config: IActorConfig): IActorParams {
  const { materialParams, position, rotation, scale, ...rest } = config;
  return {
    ...rest,
    ...getAdaptedMaterialParams(materialParams),

    // TODO (S.Panfilov) CWP object3dAdapter//////////
    // TODO (S.Panfilov) debug (wtf layers?)
    // layers: config.layers ? (new Layers()).set(config.layers) : undefined,
    layers: undefined,

    // TODO (S.Panfilov) wtf animations?
    animations: [],

    position: Vector3Wrapper(position),
    rotation: isDefined(rotation) ? EulerWrapper(rotation) : undefined,
    scale: isDefined(scale) ? Vector3Wrapper(scale) : undefined
    // TODO (S.Panfilov) End object3dAdapter//////////
  };
}

function getAdaptedMaterialParams(materialParams: IActorMaterialConfig): {
  materialParams: MeshToonMaterialParameters | undefined;
} {
  const hasColor: boolean = isDefined(materialParams?.color);
  const color: Color | undefined = hasColor ? new Color(materialParams.color) : undefined;
  return { materialParams: { ...materialParams, color } };
}
