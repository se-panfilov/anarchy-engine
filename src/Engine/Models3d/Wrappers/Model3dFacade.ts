import type { AnimationClip } from 'three';

import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import type { TAnimationsPack, TAnimationsService } from '@/Engine/Animations/Models';
import { withModel3dFacadeEntities } from '@/Engine/Models3d/Mixins';
import type { TModel3dFacade, TModel3dPack, TModels3dFacadeParams } from '@/Engine/Models3d/Models';
import { applyPosition, applyRotation, applyScale } from '@/Engine/Models3d/Services/Models3dServiceHelper';
import type { TOptional } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

import { createModels3dEntities } from './Model3dFacadeUtils';

export function Model3dFacade(params: TModels3dFacadeParams, animationsService: TAnimationsService): TModel3dFacade {
  const entities: TModel3dPack = createModels3dEntities(params, animationsService);
  const facade = AbstractFacade(withModel3dFacadeEntities(entities), FacadeType.Model3d, params);

  // TODO (S.Panfilov) CWP test this method, if it works correctly (animations are played for cloned model)
  // Be aware that this clone method doesn't save the facade to the registry, use clone() method of the service instead
  function _clone(overrides?: TOptional<TModel3dPack>): TModel3dFacade {
    const model = entities.model.clone();
    const animations: TAnimationsPack = {};
    // eslint-disable-next-line functional/immutable-data
    if (isNotDefined(overrides?.animations)) Object.entries(entities.animations).forEach(([key, value]: [string, AnimationClip]): void => void (animations[key] = value.clone()));

    let mixer = overrides?.mixer;
    let actions = overrides?.actions;
    if (isNotDefined(overrides?.mixer || overrides?.actions)) {
      const actionsPack = animationsService.createActions(model, animations);
      mixer = actionsPack.mixer;
      actions = actionsPack.actions;
    }

    return Model3dFacade({ ...entities, model, animations, mixer, actions, clonedFrom: facade.id, ...overrides }, animationsService);
  }

  const getPack = (): TModel3dPack => entities;

  //apply model params
  if (isDefined(params.scale)) applyScale(entities.model, params.scale);
  if (isDefined(params.rotation)) applyRotation(entities.model, params.rotation);
  if (isDefined(params.position)) applyPosition(entities.model, params.position);

  return {
    ...facade,
    getPack,
    _clone
  };
}
