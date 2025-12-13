import { Fog } from 'three';

import type { IFogWrapper } from '@/Engine/Fog/Models';

export function FogService() {
  function createFog(): IFogWrapper {
    return new Fog(0x000000, 0.015, 100);
  }
}
