import type { Group, Mesh, Object3D, Object3DEventMap } from 'three';

import type { TEulerWrapper } from '@/Engine/Euler';
import type { TModel3dConfig, TModel3dParams } from '@/Engine/Models3d/Models';
import { isDefined } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

export const applyScale = (model: Group | Mesh | Object3D, scale: TVector3Wrapper): void => void model.scale.copy(scale.entity);
export const applyRotation = (model: Group | Mesh | Object3D, rotation: TEulerWrapper): void => void model.rotation.copy(rotation.entity);
export const applyPosition = (model: Group | Mesh | Object3D, position: TVector3Wrapper): void => void model.position.copy(position.entity);
export function applyCastShadow(model: Group | Mesh | Object3D, castShadow: boolean = false): void {
  if (!castShadow) return;

  model.traverse((object: Mesh | Group | Object3D<Object3DEventMap>) => {
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(object.castShadow)) object.castShadow = true;
  });
}

export const isPrimitive = (model: TModel3dConfig | TModel3dParams): boolean => isDefined(model.primitiveType);
