import type { TEnvMapResourceConfig } from '@/Engine/EnvMap';
import type { TMaterialConfig } from '@/Engine/Material';
import type { TModel3dResourceConfig } from '@/Engine/Models3d';
import type { TTextureResourceConfig } from '@/Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  envMapTextures: ReadonlyArray<TEnvMapResourceConfig>;
  // TODO 9.0.0. RESOURCES: Guess "materials" should use strings to use textures.
  materials: ReadonlyArray<TMaterialConfig>;
  // TODO 9.0.0. RESOURCES: Would be nice if TModel3dConfig will extends from TAbstractResourceConfig
  models3d: ReadonlyArray<TModel3dResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
