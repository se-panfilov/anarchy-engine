import type { AnimationClip, Layers } from 'three';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type IObject3DProps = Readonly<{
  position: TWithCoordsXYZ;
  rotation: TWithCoordsXYZ;
  scale?: TWithCoordsXYZ;
  visible?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  layers?: Layers;
  frustumCulled?: boolean;
  renderOrder?: number;
  animations?: ReadonlyArray<AnimationClip>;
}>;
