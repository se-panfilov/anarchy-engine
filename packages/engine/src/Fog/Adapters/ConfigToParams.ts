import { Color } from 'three';

import type { TFogConfig, TFogParams } from '@/Fog/Models';

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
