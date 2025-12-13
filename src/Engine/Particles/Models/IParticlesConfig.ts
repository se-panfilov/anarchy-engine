import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { IParticlesProps } from './IParticlesProps';

export type IParticlesConfig = IParticlesProps &
  // Readonly<{
  //   width: number;
  //   height: number;
  //   castShadow: boolean;
  // }> &
  IObject3DPropConfig &
  IWithReadonlyTags;
