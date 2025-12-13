import { FogFactory } from '@/Engine/Fog/Factory';
import type { IFogFactory, IFogParams, IFogService, IFogWrapper } from '@/Engine/Fog/Models';

export function FogService(): IFogService {
  const factory: IFogFactory = FogFactory();

  function createFog(params: IFogParams): IFogWrapper {
    return factory.create(params);
  }

  return { createFog };
}

export const fogService: IFogService = FogService();
