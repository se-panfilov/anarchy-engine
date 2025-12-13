import type { TAnimationsResourceConfig } from '@/Engine/Animations';
import type { TEnvMapResourceConfig } from '@/Engine/EnvMap';
import type { TMaterialConfig } from '@/Engine/Material';
import type { TModel3dResourceConfig } from '@/Engine/Models3d';
import type { TTextureResourceConfig } from '@/Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  animations: ReadonlyArray<TAnimationsResourceConfig>;
  envMaps: ReadonlyArray<TEnvMapResourceConfig>;
  materials: ReadonlyArray<TMaterialConfig>;
  models3d: ReadonlyArray<TModel3dResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
