import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TParticlesProps } from './TParticlesProps';

export type TParticlesConfig = Omit<TParticlesProps, 'material'> &
  Readonly<{
    material: TMaterialPackConfig<TMaterialTexturePack>;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
