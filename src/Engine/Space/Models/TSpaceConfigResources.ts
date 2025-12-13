import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TMaterialConfig } from '@/Engine/Material';
import type { TModel3dConfig } from '@/Engine/Models3d';
import type { TTexturePackConfig } from '@/Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  envMapTextures: ReadonlyArray<TAbstractResourceConfig>;
  // TODO 9.0.0. RESOURCES: Would be nice if all resources will use TAbstractResourceConfig to load
  materials: ReadonlyArray<TMaterialConfig>;
  models3d: ReadonlyArray<TModel3dConfig>;
  particlesTextures: ReadonlyArray<TAbstractResourceConfig>;
  textures: ReadonlyArray<TTexturePackConfig>;
}>;
