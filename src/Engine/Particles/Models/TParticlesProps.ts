import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { IWithName } from '@/Engine/Mixins';

export type TParticlesProps = Readonly<{
  material: TMaterialPackParams<TMaterialTexturePack>;
}> &
  IWithName;
