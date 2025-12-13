import type { AnimationMixer } from 'three';

import type { TAnimationActions } from './TAnimationActions';
import type { TRawModel } from '@/Engine/Models3d';

export type TAnimationActionsPack = Readonly<{
  model: TRawModel;
  mixer: AnimationMixer;
  actions: TAnimationActions;
}>;
