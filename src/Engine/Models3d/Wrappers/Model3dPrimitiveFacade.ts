import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import { withModel3dPrimitiveFacadeEntities } from '@/Engine/Models3d/Mixins';
import type { TModel3dPrimitiveEntities, TModel3dPrimitiveFacade, TModel3dPrimitiveFacadeParams, TModel3dPrimitivePack } from '@/Engine/Models3d/Models';
import { applyCastShadowToModel3d, applyPositionToModel3d, applyRotationToModel3d, applyScaleToModel3d, createModels3dPrimitiveEntities } from '@/Engine/Models3d/Utils';
import type { TOptional } from '@/Engine/Utils';
import { isDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

export function Model3dPrimitiveFacade(params: TModel3dPrimitiveFacadeParams): TModel3dPrimitiveFacade {
  const entities: TModel3dPrimitiveEntities = createModels3dPrimitiveEntities(params);
  const facade = AbstractFacade(withModel3dPrimitiveFacadeEntities(entities), FacadeType.Model3d, params);

  // TODO 8.0.0. MODELS: Remove duplication: extract getPack to utils
  const getPack = (): TModel3dPrimitivePack => ({ ...entities, clonedFrom: facade.id });

  // TODO 8.0.0. MODELS: Remove duplication: extract _clone to utils
  // Be aware that this clone method doesn't save the facade to the registry, use clone() method of the service instead
  function _clone(overrides: TOptional<TModel3dPrimitivePack> = {}): TModel3dPrimitiveFacade {
    const _overrides = omitInObjectWithoutMutation(overrides, ['clonedFrom']);
    return Model3dPrimitiveFacade({ ...getPack(), clonedFrom: facade.id, ..._overrides });
  }

  // TODO 8.0.0. MODELS: apply all the params form object3d
  // TODO 8.0.0. MODELS: Remove duplication: extract applying of params to utils
  //applying model's params
  if (isDefined(params.scale)) applyScaleToModel3d(entities.model, params.scale);
  if (isDefined(params.rotation)) applyRotationToModel3d(entities.model, params.rotation);
  if (isDefined(params.position)) applyPositionToModel3d(entities.model, params.position);
  if (isDefined(params.castShadow)) applyCastShadowToModel3d(entities.model, params.castShadow);

  return {
    ...facade,
    getPack,
    _clone
  };
}
