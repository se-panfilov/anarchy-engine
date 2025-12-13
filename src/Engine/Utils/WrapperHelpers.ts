import type { Vector2 } from 'three';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { TWithObject3d } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils/index';

export function applyObject3dParams(obj: TWithObject3d, { visible, castShadow, receiveShadow, frustumCulled, renderOrder }: Partial<TObject3DParams>): void {
  if (isDefined(visible)) obj.setVisible(visible);
  if (isDefined(castShadow)) obj.setCastShadow(castShadow);
  if (isDefined(receiveShadow)) obj.setReceiveShadow(receiveShadow);
  if (isDefined(frustumCulled)) obj.setFrustumCulled(frustumCulled);
  if (isDefined(renderOrder)) obj.setRenderOrder(renderOrder);
}

export function applyCenter(obj: CSS2DObject, center?: Vector2): void {
  if (isDefined(center)) obj.center.set(center.x, center.y);
}
