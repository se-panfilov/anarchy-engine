import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import { withModel3dPrimitiveFacadeEntities } from '@/Engine/Models3d/Mixins';
import type { TModel3dPrimitiveEntities, TModel3dPrimitiveFacade, TModel3dPrimitiveFacadeParams, TModel3dPrimitivePack } from '@/Engine/Models3d/Models';
import { applyCastShadow, applyPosition, applyRotation, applyScale } from '@/Engine/Models3d/Services/Models3dServiceHelper';
import type { TOptional } from '@/Engine/Utils';
import { isDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

import { createModels3dPrimitiveEntities } from './UtilsModel3dFacade';

export function Model3dPrimitiveFacade(params: TModel3dPrimitiveFacadeParams): TModel3dPrimitiveFacade {
  const entities: TModel3dPrimitiveEntities = createModels3dPrimitiveEntities(params);
  const facade = AbstractFacade(withModel3dPrimitiveFacadeEntities(entities), FacadeType.Model3d, params);

  const getPack = (): TModel3dPrimitivePack => ({ ...entities, clonedFrom: facade.id });

  // Be aware that this clone method doesn't save the facade to the registry, use clone() method of the service instead
  function _clone(overrides: TOptional<TModel3dPrimitivePack> = {}): TModel3dPrimitiveFacade {
    const _overrides = omitInObjectWithoutMutation(overrides, ['clonedFrom']);
    return Model3dPrimitiveFacade({ ...getPack(), clonedFrom: facade.id, ..._overrides });
  }

  //applying model's params
  if (isDefined(params.scale)) applyScale(entities.model, params.scale);
  if (isDefined(params.rotation)) applyRotation(entities.model, params.rotation);
  if (isDefined(params.position)) applyPosition(entities.model, params.position);
  if (isDefined(params.castShadow)) applyCastShadow(entities.model, params.castShadow);

  return {
    ...facade,
    getPack,
    _clone
  };
}
