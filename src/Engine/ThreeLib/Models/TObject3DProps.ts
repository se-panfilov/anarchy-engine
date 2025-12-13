import type { Layers } from 'three';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TObject3DProps = Readonly<{
  position: TWithCoordsXYZ;
  rotation: TWithCoordsXYZ;
  scale?: TWithCoordsXYZ;
  visible?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  layers?: Layers;
  frustumCulled?: boolean;
  renderOrder?: number;
  // TODO ANIMATIONS: animations are not supported at the moment
  // animations?: ReadonlyArray<AnimationClip>;
}>;
