import type { Group, Mesh, Object3D, Object3DEventMap } from 'three';

import type { TEulerWrapper } from '@/Engine/Euler';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';
import type { TVector3Wrapper } from '@/Engine/Vector';

export const applyScaleToModel3d = (model: Group | Mesh | Object3D, scale: TVector3Wrapper): void => void model.scale.copy(scale.entity);
export const applyRotationToModel3d = (model: Group | Mesh | Object3D, rotation: TEulerWrapper): void => void model.rotation.copy(rotation.entity);
export const applyPositionToModel3d = (model: Group | Mesh | Object3D, position: TVector3Wrapper): void => void model.position.copy(position.entity);

export function applyObject3dParamsToModel3d(model3d: Group | Mesh | Object3D, { visible, castShadow, receiveShadow, frustumCulled, renderOrder }: Partial<TObject3DParams>): void {
  if (isDefined(visible)) applyWithTraverseToModel3d(model3d, 'visible', visible);
  if (isDefined(castShadow)) applyWithTraverseToModel3d(model3d, 'castShadow', castShadow);
  if (isDefined(receiveShadow)) applyWithTraverseToModel3d(model3d, 'receiveShadow', receiveShadow);
  if (isDefined(frustumCulled)) applyWithTraverseToModel3d(model3d, 'frustumCulled', frustumCulled);
  if (isDefined(renderOrder)) applyWithTraverseToModel3d(model3d, 'renderOrder', renderOrder);
}

type TModelOrGroup = Group | Mesh | Object3D;

type TValueType<T, K extends keyof T> = K extends keyof T ? T[K] : never;

function applyWithTraverseToModel3d<K extends keyof TModelOrGroup>(model: TModelOrGroup, name: K, value: TValueType<TModelOrGroup, K>): void {
  model.traverse((object: Mesh | Group | Object3D<Object3DEventMap>) => {
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(object[name])) object[name] = value;
  });
}
