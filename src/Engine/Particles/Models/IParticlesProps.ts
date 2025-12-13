import type { IMaterialPackParams, IMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { IWithName } from '@/Engine/Mixins';

export type IParticlesProps = Readonly<{
  material: IMaterialPackParams<IMaterialTexturePack>;
}> &
  IWithName;
