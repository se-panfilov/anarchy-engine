import type { TMaterialConfig } from '@/Engine/Material';
import type { TModel3dConfig } from '@/Engine/Models3d';

export type TSpaceConfigResources = Readonly<{
  models3d: ReadonlyArray<TModel3dConfig>;
  materials: ReadonlyArray<TMaterialConfig>;
  // TODO 9.0.0.: env maps should do preloading here, but applying only from TSpaceConfigEntities
  envMaps: ReadonlyArray<string>;
}>;
