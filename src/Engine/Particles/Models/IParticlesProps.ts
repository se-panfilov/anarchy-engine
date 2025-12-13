import type { IMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { IWithName } from '@/Engine/Mixins';

export type IParticlesProps = Readonly<{
  material: IMaterialPackParams<TMaterialTexturePack>;
}> &
  IWithName;
