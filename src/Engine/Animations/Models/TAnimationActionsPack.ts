import type { AnimationMixer, Group, Mesh, Object3D } from 'three';

import type { TAnimationActions } from './TAnimationActions';

export type TAnimationActionsPack = Readonly<{
  model: Group | Mesh | Object3D;
  mixer: AnimationMixer;
  actions: TAnimationActions;
}>;
