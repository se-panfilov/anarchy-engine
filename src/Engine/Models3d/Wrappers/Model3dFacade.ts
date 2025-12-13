import type { AnimationClip } from 'three';

import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import type { TAnimationsPack, TAnimationsService } from '@/Engine/Animations/Models';
import { withModel3dFacadeEntities } from '@/Engine/Models3d/Mixins';
import type { TModel3dFacade, TModel3dPack, TModels3dFacadeParams } from '@/Engine/Models3d/Models';

export function Model3dFacade(params: TModels3dFacadeParams, animationsService: TAnimationsService): TModel3dFacade {
  const { actions, mixer } = animationsService.createActions(params.model, params.animations ?? {});
  const entities: TModel3dPack = { ...params, actions, mixer };
  // const entities: TModel3dPack = createModels3d(params);

  // TODO test this method, if it works correctly (animations are played for cloned model)
  function clone(): TModel3dFacade {
    const model = entities.model.clone();
    const animations: TAnimationsPack = {};
    // eslint-disable-next-line functional/immutable-data
    Object.entries(entities.animations).forEach(([key, value]: [string, AnimationClip]): void => void (animations[key] = value.clone()));
    const { mixer, actions } = animationsService.createActions(model, animations);
    return { ...entities, model, animations, mixer, actions };
  }

  return {
    ...AbstractFacade(withModel3dFacadeEntities(entities), FacadeType.Model3d, params),
    clone
  };
}
