import { Color, Vector2 } from 'three';

import type { ILightConfig, ILightParams, ILightShadowParams, LightShadowConfig } from '@/Engine/Domains/Light/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';
import { EulerWrapper, Vector3Wrapper } from '@/Engine/Wrappers';

export function getParams(config: ILightConfig): ILightParams {
  const { position, rotation, scale, color, shadow, ...rest } = config;
  return {
    ...rest,
    ...getLightColorParams(color),
    ...getLightShadowParams(shadow),

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

function getLightColorParams(colorStr: string): Readonly<{ color: Color }> {
  return { color: new Color(colorStr) };
}

function getLightShadowParams(shadow: LightShadowConfig | undefined): Readonly<{ shadow: ILightShadowParams }> | undefined {
  if (isNotDefined(shadow)) return undefined;
  return { shadow: { ...shadow, mapSize: new Vector2(shadow.mapSize.x, shadow.mapSize.y) } };
}
