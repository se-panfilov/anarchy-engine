import type { IObject3DPropParams } from '@/Engine/Domains/ThreeLib';
import type { IMovable, IRotatable, IScalable, IWithCoordsXYZ, IWithObject3d } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils/index';

export function applyObject3dParams({ visible, castShadow, receiveShadow, frustumCulled, renderOrder }: IObject3DPropParams, obj: IWithObject3d): void {
  if (isDefined(visible)) obj.setVisible(visible);
  if (isDefined(castShadow)) obj.setCastShadow(castShadow);
  if (isDefined(receiveShadow)) obj.setReceiveShadow(receiveShadow);
  if (isDefined(frustumCulled)) obj.setFrustumCulled(frustumCulled);
  if (isDefined(renderOrder)) obj.setRenderOrder(renderOrder);
}

export function applyPosition(position: IWithCoordsXYZ, obj: IMovable): void {
  if (isDefined(position)) obj.setPosition(position.x, position.y, position.z);
}

export function applyRotation(rotation: IWithCoordsXYZ, obj: IRotatable): void {
  if (isDefined(rotation)) obj.setRotation(rotation.x, rotation.y, rotation.z);
}

export function applyScale(scale: IWithCoordsXYZ, obj: IScalable): void {
  if (isDefined(scale)) obj.setScale(scale.x, scale.y, scale.z);
}
