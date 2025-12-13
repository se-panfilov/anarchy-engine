import type { TEnvMapResourceConfig } from '@/Engine/EnvMap';
import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/Material';
import type { TModel3dResourceConfig } from '@/Engine/Models3d';
import type { TTextureResourceConfig } from '@/Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  envMaps: ReadonlyArray<TEnvMapResourceConfig>;
  materials: ReadonlyArray<TMaterialPackConfig<TMaterialTexturePack>>;
  models3d: ReadonlyArray<TModel3dResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
