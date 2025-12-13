import type { AnimationMixer, Group, Mesh } from 'three';

import type { TAnimationActions } from './TAnimationActions';

export type TAnimationActionsPack = Readonly<{
  model: Mesh | Group;
  mixer: AnimationMixer;
  actions: TAnimationActions;
}>;
