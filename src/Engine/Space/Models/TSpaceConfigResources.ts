import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TEnvMapResourceConfig } from '@/Engine/EnvMap';
import type { TMaterialConfig } from '@/Engine/Material';
import type { TModel3dConfig } from '@/Engine/Models3d';
import type { TTextureResourceConfig } from '@/Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  envMapTextures: ReadonlyArray<TEnvMapResourceConfig>;
  // TODO 9.0.0. RESOURCES: Would be nice if all resources will use TAbstractResourceConfig to load
  materials: ReadonlyArray<TMaterialConfig>;
  models3d: ReadonlyArray<TModel3dConfig>;
  particlesTextures: ReadonlyArray<TAbstractResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
