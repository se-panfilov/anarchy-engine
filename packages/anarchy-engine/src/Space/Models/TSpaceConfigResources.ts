import type { TAnimationsResourceConfig } from '@Anarchy/Engine/Animations';
import type { TAudioResourceConfig } from '@Anarchy/Engine/Audio';
import type { TEnvMapResourceConfig } from '@Anarchy/Engine/EnvMap';
import type { TModel3dResourceConfig } from '@Anarchy/Engine/Models3d';
import type { TTextureResourceConfig } from '@Anarchy/Engine/Texture';

export type TSpaceConfigResources = Readonly<{
  animations: ReadonlyArray<TAnimationsResourceConfig>;
  audio: ReadonlyArray<TAudioResourceConfig>;
  envMaps: ReadonlyArray<TEnvMapResourceConfig>;
  models3d: ReadonlyArray<TModel3dResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
