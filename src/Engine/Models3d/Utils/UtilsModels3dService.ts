import type { Group, Mesh, Object3D, Object3DEventMap } from 'three';

import type { TEulerWrapper } from '@/Engine/Euler';
import type { TModel3dConfig, TModel3dFacade, TModel3dParams } from '@/Engine/Models3d/Models';
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

// TODO 9.0.0. RESOURCES: Are these methods needed?
export const isPrimitive = (model: TModel3dConfig | TModel3dParams): boolean => model.url === QQQQ;
export const isPrimitiveFacade = (model: TModel3dFacade): boolean => isDefined((model as TModel3dPrimitiveFacade).getPrimitive);
