import type { AnimationMixer } from 'three';

import type { TRawModel3d } from '@/Models3d';

import type { TAnimationActions } from './TAnimationActions';

export type TAnimationActionsPack = Readonly<{
  model: TRawModel3d;
  mixer: AnimationMixer;
  actions: TAnimationActions;
}>;
