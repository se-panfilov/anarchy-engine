import type { TAnimationsResourceConfig } from '@Engine/Animations';
import type { TAudioResourceConfig } from '@Engine/Audio';
import type { TEnvMapResourceConfig } from '@Engine/EnvMap';
import type { TModel3dResourceConfig } from '@Engine/Models3d';
import type { TTextureResourceConfig } from '@Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  animations: ReadonlyArray<TAnimationsResourceConfig>;
  audio: ReadonlyArray<TAudioResourceConfig>;
  envMaps: ReadonlyArray<TEnvMapResourceConfig>;
  models3d: ReadonlyArray<TModel3dResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
