import type { TMaterialWrapper } from '@/Engine/Material';
import type { TWithName } from '@/Engine/Mixins';

export type TParticlesProps = Readonly<{
  material: TMaterialWrapper;
}> &
  TWithName;
