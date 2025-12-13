import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import type { TAnimationsService } from '@/Engine/Animations/Models';
import { withModel3dFacadeEntities } from '@/Engine/Models3d/Mixins';
import type { TModel3dEntities, TModel3dFacade, TModel3dPack, TModels3dFacadeParams } from '@/Engine/Models3d/Models';
import { applyPosition, applyRotation, applyScale } from '@/Engine/Models3d/Services/Models3dServiceHelper';
import type { TOptional } from '@/Engine/Utils';
import { isDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

import { createModels3dEntities } from './Model3dFacadeUtils';

export function Model3dFacade(params: TModels3dFacadeParams, animationsService: TAnimationsService): TModel3dFacade {
  const entities: TModel3dEntities = createModels3dEntities(params, animationsService);
  const facade = AbstractFacade(withModel3dFacadeEntities(entities), FacadeType.Model3d, params);

  const getPack = (): TModel3dPack => omitInObjectWithoutMutation({ ...entities, clonedFrom: facade.id }, ['actions', 'mixer']);

  // TODO check clone method
  // Be aware that this clone method doesn't save the facade to the registry, use clone() method of the service instead
  function _clone(overrides: TOptional<TModel3dPack> = {}): TModel3dFacade {
    const _overrides = omitInObjectWithoutMutation(overrides, ['clonedFrom']);
    return Model3dFacade({ ...getPack(), clonedFrom: facade.id, ..._overrides }, animationsService);
  }

  //applying model's params
  if (isDefined(params.scale)) applyScale(entities.model, params.scale);
  if (isDefined(params.rotation)) applyRotation(entities.model, params.rotation);
  if (isDefined(params.position)) applyPosition(entities.model, params.position);

  return {
    ...facade,
    getPack,
    _clone
  };
}
