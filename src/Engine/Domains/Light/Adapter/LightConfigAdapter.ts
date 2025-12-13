import { Color, Vector2, Vector3 } from 'three';

import type { ILightConfig, ILightParams, ILightShadowParams, LightShadowConfig } from '@/Engine/Domains/Light/Models';
import { isNotDefined } from '@/Engine/Utils';

export function getParams(config: ILightConfig): ILightParams {
  const { position, color, shadow, ...rest } = config;
  return {
    ...rest,
    ...getLightColorParams(color),
    ...getLightShadowParams(shadow),
    position: new Vector3(position.x, position.y, position.z)
  };
}

function getLightColorParams(colorStr: string): Readonly<{ color: Color }> {
  return { color: new Color(colorStr) };
}

function getLightShadowParams(shadow: LightShadowConfig | undefined): Readonly<{ shadow: ILightShadowParams }> | undefined {
  if (isNotDefined(shadow)) return undefined;
  return { shadow: { ...shadow, mapSize: new Vector2(shadow.mapSize.x, shadow.mapSize.y) } };
}
