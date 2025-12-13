import { Color } from 'three';

import type { IParticlesConfig, IParticlesParams } from '@/Engine/Particles/Models';

export function configToParams(config: IParticlesConfig): IParticlesParams {
  const { color, ...rest } = config;

  return {
    ...rest,
    ...getColorParams(color)
  };
}

function getColorParams(colorStr: string): Readonly<{ color: Color }> {
  return { color: new Color(colorStr) };
}
