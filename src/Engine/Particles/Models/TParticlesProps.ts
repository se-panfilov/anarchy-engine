import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithName } from '@/Engine/Mixins';

export type TParticlesProps = Readonly<{
  material: TMaterialPackParams<TMaterialTexturePack>;
}> &
  TWithName;
