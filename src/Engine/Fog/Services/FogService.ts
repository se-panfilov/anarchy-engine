import { Fog } from 'three';
import type { IFog } from '@/Engine/Fog/Models';

export function FogService() {
  function createFog(): IFog {
    return new Fog(0x000000, 0.015, 100);
  }
}
