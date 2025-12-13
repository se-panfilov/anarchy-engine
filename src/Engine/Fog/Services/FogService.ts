import { ColorWrapper } from '@/Engine/Color';
import { FogFactory } from '@/Engine/Fog/Factory';
import type { IFogFactory, IFogService, IFogWrapper } from '@/Engine/Fog/Models';

export function FogService(): IFogService {
  const factory: IFogFactory = FogFactory();

  function createFog(): IFogWrapper {
    return factory.create({ color: ColorWrapper('#000000').entity, near: 0.015, far: 100, tags: [] });
  }

  return { createFog };
}

export const fogService: IFogService = FogService();
