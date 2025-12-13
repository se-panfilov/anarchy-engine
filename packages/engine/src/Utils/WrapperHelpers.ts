import type { Vector2 } from 'three';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { TAbstractWrapper } from '@/Abstract';
import type { TWithObject3d } from '@/Mixins';
import type { TObject3DParams } from '@/ThreeLib';
import { isDefined } from '@/Utils/index';

export function applyObject3dParams(obj: TWithObject3d, { visible, castShadow, receiveShadow, frustumCulled, renderOrder, layers }: Partial<TObject3DParams>): void {
  if (isDefined(visible)) obj.setVisible(visible);
  if (isDefined(castShadow)) obj.setCastShadow(castShadow);
  if (isDefined(receiveShadow)) obj.setReceiveShadow(receiveShadow);
  if (isDefined(frustumCulled)) obj.setFrustumCulled(frustumCulled);
  if (isDefined(renderOrder)) obj.setRenderOrder(renderOrder);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(layers) && isDefined(obj.layers?.mask)) obj.layers.mask = layers ?? 1;
}

export function applyCenter(obj: CSS2DObject, center?: Vector2): void {
  if (isDefined(center)) obj.center.set(center.x, center.y);
}

export function isWrapper<T extends TAbstractWrapper<E>, E>(obj: T | any): obj is T {
  return isDefined((obj as T).entity) && isDefined((obj as T).destroy$) && isDefined((obj as T).id) && isDefined((obj as T).name);
}
