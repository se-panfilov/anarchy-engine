import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IParticlesProps } from './IParticlesProps';

export type IParticlesConfig = Omit<IParticlesProps, 'color'> &
  Readonly<{
    color: string;
  }> &
  IWithReadonlyTags;
