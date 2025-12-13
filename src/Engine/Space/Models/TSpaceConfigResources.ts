import type { TEnvMapResourceConfig } from '@/Engine/EnvMap';
import type { TMaterialConfig } from '@/Engine/Material';
import type { TModel3dResourceConfig } from '@/Engine/Models3d';
import type { TTextureResourceConfig } from '@/Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  envMapTextures: ReadonlyArray<TEnvMapResourceConfig>;
  materials: ReadonlyArray<TMaterialConfig>;
  models3d: ReadonlyArray<TModel3dResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
