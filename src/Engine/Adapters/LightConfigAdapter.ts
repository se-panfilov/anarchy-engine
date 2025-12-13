import type { LightConfig, LightShadowConfig } from '@Engine/Launcher/Models';
import type { LightParams, LightShadowParams } from '@Engine/Models';
import { Color, Vector2, Vector3 } from 'three';
import { isNotDefined } from '@Engine/Utils';

export function lightAdapter(config: LightConfig): LightParams {
  const { position, color, shadow, ...rest } = config;
  return {
    ...rest,
    ...getLightColorParams(color),
    ...getLightShadowParams(shadow),
    position: new Vector3(position.x, position.y, position.z)
  };
}

function getLightColorParams(colorStr: string): { color: Color } {
  return { color: new Color(colorStr) };
}

function getLightShadowParams(shadow: LightShadowConfig | undefined): { shadow: LightShadowParams } | undefined {
  if (isNotDefined(shadow)) return undefined;
  return { shadow: { ...shadow, mapSize: new Vector2(shadow.mapSize.x, shadow.mapSize.y) } };
}
