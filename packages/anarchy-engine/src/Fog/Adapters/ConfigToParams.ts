import type { TFogConfig, TFogParams } from '@hellpig/anarchy-engine/Fog/Models';
import { Color } from 'three';

export function fogConfigToParams(config: TFogConfig): TFogParams {
  const { color, ...rest } = config;

  return {
    ...rest,
    ...getColorParams(color)
  };
}

function getColorParams(colorStr: string): Readonly<{ color: Color }> {
  return { color: new Color(colorStr) };
}
