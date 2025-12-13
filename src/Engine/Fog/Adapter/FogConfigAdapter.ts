import { Color } from 'three';

import type { IFogConfig, IFogParams } from '@/Engine/Fog/Models';

export function configToParams(config: IFogConfig): IFogParams {
  const { color, ...rest } = config;

  return {
    ...rest,
    ...getColorParams(color)
  };
}

function getColorParams(colorStr: string): Readonly<{ color: Color }> {
  return { color: new Color(colorStr) };
}
