import type { TMaterialConfig } from '@/Engine/Material';
import type { TModel3dConfig } from '@/Engine/Models3d';
import type { TTexturePackConfig } from '@/Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  // TODO 9.0.0. RESOURCES: env maps should do preloading here, but applying only from TSpaceConfigEntities
  envMaps: ReadonlyArray<string>;
  materials: ReadonlyArray<TMaterialConfig>;
  models3d: ReadonlyArray<TModel3dConfig>;
  textures: ReadonlyArray<TTexturePackConfig>;
}>;
