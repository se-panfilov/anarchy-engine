import type { Euler, Vector2 } from 'three';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import type { Vector3 } from 'three/src/math/Vector3';

import type { TMovable3dXYZ, TRotatable, TScalable, TWithObject3d } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils/index';

export function applyObject3dParams(obj: TWithObject3d, { visible, castShadow, receiveShadow, frustumCulled, renderOrder }: Partial<TObject3DParams>): void {
  if (isDefined(visible)) obj.setVisible(visible);
  if (isDefined(castShadow)) obj.setCastShadow(castShadow);
  if (isDefined(receiveShadow)) obj.setReceiveShadow(receiveShadow);
  if (isDefined(frustumCulled)) obj.setFrustumCulled(frustumCulled);
  if (isDefined(renderOrder)) obj.setRenderOrder(renderOrder);
}

export function applyPosition(obj: TMovable3dXYZ, position?: Vector3): void {
  if (isDefined(position)) obj.setPosition(position);
}

export function applyCenter(obj: CSS2DObject, center?: Vector2): void {
  if (isDefined(center)) obj.center.set(center.x, center.y);
}

export function applyRotation(obj: TRotatable, rotation?: Euler): void {
  if (isDefined(rotation)) obj.setRotation(rotation.x, rotation.y, rotation.z);
}

export function applyScale(obj: TScalable, scale?: Vector3): void {
  if (isDefined(scale)) obj.setScale(scale.x, scale.y, scale.z);
}
