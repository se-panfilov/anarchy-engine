import type { TWithMaterialConfigPresetWithOverrides } from '@/Engine/MaterialTexturePack';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TParticlesProps } from './TParticlesProps';

export type TParticlesConfig = Omit<TParticlesProps, 'material'> &
  Readonly<{
    // TODO 9.0.0. RESOURCES: Particles should use a reference to a material preset with overload
    material: TWithMaterialConfigPresetWithOverrides;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
