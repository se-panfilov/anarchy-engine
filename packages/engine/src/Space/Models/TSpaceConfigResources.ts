import type { TAnimationsResourceConfig } from '@/Animations';
import type { TAudioResourceConfig } from '@/Audio';
import type { TEnvMapResourceConfig } from '@/EnvMap';
import type { TModel3dResourceConfig } from '@/Models3d';
import type { TTextureResourceConfig } from '@/Texture';

export type TSpaceConfigResources = Readonly<{
  animations: ReadonlyArray<TAnimationsResourceConfig>;
  audio: ReadonlyArray<TAudioResourceConfig>;
  envMaps: ReadonlyArray<TEnvMapResourceConfig>;
  models3d: ReadonlyArray<TModel3dResourceConfig>;
  textures: ReadonlyArray<TTextureResourceConfig>;
}>;
