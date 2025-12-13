import type { Layers } from 'three';
import type { Euler } from 'three/src/math/Euler';
import type { Vector3 } from 'three/src/math/Vector3';

export type TObject3DProps = Readonly<{
  position: Vector3;
  rotation: Euler;
  scale?: Vector3;
  visible?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  layers?: Layers;
  frustumCulled?: boolean;
  renderOrder?: number;
  // TODO ANIMATIONS: animations are not supported at the moment
  // animations?: ReadonlyArray<AnimationClip>;
}>;
