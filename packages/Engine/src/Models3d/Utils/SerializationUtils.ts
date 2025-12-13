import type { AnimationAction } from 'three';

import type { TAnimationStateParams } from '@/Engine/Animations';
import { applyAnimationActionProperties } from '@/Engine/Animations';
import type { TModel3d, TModel3dParams } from '@/Engine/Models3d/Models';
import { isDefined } from '@/Engine/Utils';

export function applyAnimationsState(model3d: TModel3d, params: TModel3dParams): void {
  if (isDefined(params.animationsState)) {
    params.animationsState.forEach((state: TAnimationStateParams): void => {
      const action: AnimationAction = model3d.actions[state.name];
      applyAnimationActionProperties(action, state);
    });
  }
}
