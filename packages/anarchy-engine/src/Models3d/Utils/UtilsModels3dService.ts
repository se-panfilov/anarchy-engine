import type { TRawModel3d } from '@Anarchy/Engine/Models3d/Models';
import type { TEulerLike, TObject3DParams, TObject3DPropConfig } from '@Anarchy/Engine/ThreeLib';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { Group, Mesh, Object3D, Object3DEventMap, Vector3Like } from 'three';
import { Euler } from 'three';

export const applyScaleToModel3d = (model: TRawModel3d, scale: Vector3Like): void => {
  void model.scale.copy(scale);
};
export const applyRotationToModel3d = (model: TRawModel3d, rotation: TEulerLike): void => void model.rotation.copy(new Euler(rotation.x, rotation.y, rotation.z, rotation.order ?? 'XYZ'));
export const applyPositionToModel3d = (model: TRawModel3d, position: Vector3Like): void => void model.position.copy(position);

export function applyObject3dParamsToModel3d(model3d: TRawModel3d, { visible, castShadow, receiveShadow, frustumCulled, renderOrder }: Partial<TObject3DParams | TObject3DPropConfig>): void {
  if (isDefined(visible)) applyWithTraverseToModel3d(model3d, 'visible', visible);
  if (isDefined(castShadow)) applyWithTraverseToModel3d(model3d, 'castShadow', castShadow);
  if (isDefined(receiveShadow)) applyWithTraverseToModel3d(model3d, 'receiveShadow', receiveShadow);
  if (isDefined(frustumCulled)) applyWithTraverseToModel3d(model3d, 'frustumCulled', frustumCulled);
  if (isDefined(renderOrder)) applyWithTraverseToModel3d(model3d, 'renderOrder', renderOrder);
}

type TValueType<T, K extends keyof T> = K extends keyof T ? T[K] : never;

function applyWithTraverseToModel3d<K extends keyof TRawModel3d>(model: TRawModel3d, name: K, value: TValueType<TRawModel3d, K>): void {
  model.traverse((object: Mesh | Group | Object3D<Object3DEventMap>) => {
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(object[name])) object[name] = value;
  });
}
