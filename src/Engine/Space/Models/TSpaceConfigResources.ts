import type { TEnvMapResourceConfig } from '@/Engine/EnvMap';
import type { TMaterialConfig, TMaterialTexturePack } from '@/Engine/Material';
import type { TModel3dResourceConfig } from '@/Engine/Models3d';
import type { TTextureResourceConfig } from '@/Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  envMaps: ReadonlyArray<TEnvMapResourceConfig>;
  materials: ReadonlyArray<TMaterialConfig<TMaterialTexturePack>>;
  models3d: ReadonlyArray<TModel3dResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
