import type { Group, Mesh, Object3D, Object3DEventMap } from 'three';

import type { TEulerWrapper } from '@/Engine/Euler';
import type { TModel3dComplexConfig, TModel3dComplexFacade, TModel3dComplexParams, TModel3dPrimitiveConfig, TModel3dPrimitiveFacade, TModel3dPrimitiveParams } from '@/Engine/Models3d/Models';
import { isDefined } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

export const applyScaleToModel3d = (model: Group | Mesh | Object3D, scale: TVector3Wrapper): void => void model.scale.copy(scale.entity);
export const applyRotationToModel3d = (model: Group | Mesh | Object3D, rotation: TEulerWrapper): void => void model.rotation.copy(rotation.entity);
export const applyPositionToModel3d = (model: Group | Mesh | Object3D, position: TVector3Wrapper): void => void model.position.copy(position.entity);
export function applyCastShadowToModel3d(model: Group | Mesh | Object3D, castShadow: boolean = false): void {
  if (!castShadow) return;

  model.traverse((object: Mesh | Group | Object3D<Object3DEventMap>) => {
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(object.castShadow)) object.castShadow = true;
  });
}

export const isPrimitive = (model: TModel3dComplexConfig | TModel3dComplexParams | TModel3dPrimitiveConfig | TModel3dPrimitiveParams): model is TModel3dPrimitiveConfig | TModel3dPrimitiveParams =>
  isDefined((model as TModel3dPrimitiveParams).primitive);
export const isPrimitiveFacade = (model: TModel3dComplexFacade | TModel3dPrimitiveFacade): model is TModel3dPrimitiveFacade => isDefined((model as TModel3dPrimitiveFacade).getPrimitive);
