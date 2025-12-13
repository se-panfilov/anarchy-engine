import { Color, Vector2 } from 'three';

import type { TAnyLightConfig, TLightParams, TLightShadowConfig, TLightShadowParams } from '@/Engine/Light/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TAnyLightConfig): TLightParams {
  const { position, rotation, scale, layers, animations, color, shadow, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations }),
    ...getLightColorParams(color),
    ...getLightShadowParams(shadow)
  };
}

function getLightColorParams(colorStr: string): Readonly<{ color: Color }> {
  return { color: new Color(colorStr) };
}

function getLightShadowParams(shadow: TLightShadowConfig | undefined): Readonly<{ shadow: TLightShadowParams }> | undefined {
  if (isNotDefined(shadow)) return undefined;
  return { shadow: { ...shadow, mapSize: new Vector2(shadow.mapSize.x, shadow.mapSize.y) } };
}
