import type { IMaterialPackConfig, IMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { IParticlesProps } from './IParticlesProps';

export type IParticlesConfig = Omit<IParticlesProps, 'material'> &
  Readonly<{
    material: IMaterialPackConfig<IMaterialTexturePack>;
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags;
