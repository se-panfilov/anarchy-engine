import type { IFogService, IFogWrapper } from '@/Engine/Fog/Models';
import { ColorWrapper, FogFactory } from '@/Engine';

export function FogService(): IFogService {
  function createFog(): IFogWrapper {
    // TODO (S.Panfilov)  debug
    // return new Fog(0x000000, 0.015, 100);
    FogFactory().create({ color: ColorWrapper('#000000').entity, near: 0.015, far: 100 });
  }

  return { createFog };
}
