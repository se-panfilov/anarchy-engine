import type { TAnimationStateParams } from '@Anarchy/Engine/Animations';
import { applyAnimationActionProperties } from '@Anarchy/Engine/Animations/Utils';
import type { TModel3d, TModel3dParams } from '@Anarchy/Engine/Models3d/Models';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { AnimationAction } from 'three';

export function applyAnimationsState(model3d: TModel3d, params: TModel3dParams): void {
  if (isDefined(params.animationsState)) {
    params.animationsState.forEach((state: TAnimationStateParams): void => {
      const action: AnimationAction = model3d.actions[state.name];
      applyAnimationActionProperties(action, state);
    });
  }
}
