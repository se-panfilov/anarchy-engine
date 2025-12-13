import type { Euler, Group, Mesh, Object3D, Object3DEventMap } from 'three';
import type { Vector3 } from 'three/src/math/Vector3';

import type { TRawModel } from '@/Engine/Models3d/Models';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export const applyScaleToModel3d = (model: Group | Mesh | Object3D, scale: Vector3): void => void model.scale.copy(scale);
export const applyRotationToModel3d = (model: Group | Mesh | Object3D, rotation: Euler): void => void model.rotation.copy(rotation);
export const applyPositionToModel3d = (model: Group | Mesh | Object3D, position: Vector3): void => void model.position.copy(position);

export function applyObject3dParamsToModel3d(model3d: Group | Mesh | Object3D, { visible, castShadow, receiveShadow, frustumCulled, renderOrder }: Partial<TObject3DParams>): void {
  if (isDefined(visible)) applyWithTraverseToModel3d(model3d, 'visible', visible);
  if (isDefined(castShadow)) applyWithTraverseToModel3d(model3d, 'castShadow', castShadow);
  if (isDefined(receiveShadow)) applyWithTraverseToModel3d(model3d, 'receiveShadow', receiveShadow);
  if (isDefined(frustumCulled)) applyWithTraverseToModel3d(model3d, 'frustumCulled', frustumCulled);
  if (isDefined(renderOrder)) applyWithTraverseToModel3d(model3d, 'renderOrder', renderOrder);
}

type TValueType<T, K extends keyof T> = K extends keyof T ? T[K] : never;

function applyWithTraverseToModel3d<K extends keyof TRawModel>(model: TRawModel, name: K, value: TValueType<TRawModel, K>): void {
  model.traverse((object: Mesh | Group | Object3D<Object3DEventMap>) => {
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(object[name])) object[name] = value;
  });
}
