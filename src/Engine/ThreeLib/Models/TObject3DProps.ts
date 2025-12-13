import type { Layers, Quaternion } from 'three';
import type { Euler } from 'three/src/math/Euler';
import type { Vector3 } from 'three/src/math/Vector3';

export type TObject3DProps = Readonly<{
  position: Vector3;
  rotation: Euler | Quaternion;
  scale?: Vector3;
  visible?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  layers?: Layers;
  frustumCulled?: boolean;
  renderOrder?: number;
  // Animations is a  responsibilities of Model3d and Animations domains, here we do nothing with that
  // animations?: ReadonlyArray<AnimationClip>;
}>;
