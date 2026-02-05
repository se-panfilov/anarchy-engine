import type { TAnimationStateParams } from '@hellpig/anarchy-engine/Animations';
import { applyAnimationActionProperties } from '@hellpig/anarchy-engine/Animations/Utils';
import type { TModel3d, TModel3dParams } from '@hellpig/anarchy-engine/Models3d/Models';
import { isDefined } from '@hellpig/anarchy-shared/Utils';
import type { AnimationAction } from 'three';

export function applyAnimationsState(model3d: TModel3d, params: TModel3dParams): void {
  if (isDefined(params.animationsState)) {
    params.animationsState.forEach((state: TAnimationStateParams): void => {
      const action: AnimationAction = model3d.actions[state.name];
      applyAnimationActionProperties(action, state);
    });
  }
}
