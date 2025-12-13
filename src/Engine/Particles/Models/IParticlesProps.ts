import type { IMaterialPackParams, IPointsMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { IWithName } from '@/Engine/Mixins';

export type IParticlesProps = Readonly<{
  material: IMaterialPackParams<IPointsMaterialTexturePack>;
}> &
  IWithName;
