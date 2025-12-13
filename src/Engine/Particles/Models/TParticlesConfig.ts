import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TParticlesProps } from './TParticlesProps';

export type TParticlesConfig = Omit<TParticlesProps, 'material'> &
  Readonly<{
    // TODO 9.0.0. RESOURCES: Maybe, particles should use a reference to a material preset with overload?
    //material: TWithMaterialConfigPresetWithOverrides;
    material: string;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
