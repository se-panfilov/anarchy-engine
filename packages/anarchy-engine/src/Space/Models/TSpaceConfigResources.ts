import type { TAnimationsResourceConfig } from '@hellpig/anarchy-engine/Animations';
import type { TAudioResourceConfig } from '@hellpig/anarchy-engine/Audio';
import type { TEnvMapResourceConfig } from '@hellpig/anarchy-engine/EnvMap';
import type { TModel3dResourceConfig } from '@hellpig/anarchy-engine/Models3d';
import type { TTextureResourceConfig } from '@hellpig/anarchy-engine/Texture';

export type TSpaceConfigResources = Readonly<{
  animations: ReadonlyArray<TAnimationsResourceConfig>;
  audio: ReadonlyArray<TAudioResourceConfig>;
  envMaps: ReadonlyArray<TEnvMapResourceConfig>;
  models3d: ReadonlyArray<TModel3dResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
