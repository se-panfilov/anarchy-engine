import type { TFogConfig, TFogParams } from '@Anarchy/Engine/Fog/Models';
import { Color } from 'three';

export function configToParams(config: TFogConfig): TFogParams {
  const { color, ...rest } = config;

  return {
    ...rest,
    ...getColorParams(color)
  };
}

function getColorParams(colorStr: string): Readonly<{ color: Color }> {
  return { color: new Color(colorStr) };
}
