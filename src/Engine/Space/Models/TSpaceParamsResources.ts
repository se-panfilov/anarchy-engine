import type { TAnimations } from '@/Engine/Animations';
import type { TAnyAudio } from '@/Engine/Audio';
import type { TEnvMapTexture } from '@/Engine/EnvMap';
import type { TMaterials } from '@/Engine/Material';
import type { TModel3d } from '@/Engine/Models3d';
import type { TTexture } from '@/Engine/Texture';

export type TSpaceParamsResources = Readonly<{
  animations: ReadonlyArray<TAnimations>;
  audio: ReadonlyArray<TAnyAudio>;
  envMaps: ReadonlyArray<TEnvMapTexture>;
  materials: ReadonlyArray<TMaterials>;
  models3d: ReadonlyArray<TModel3d>;
  textures: ReadonlyArray<TTexture>;
}>;
