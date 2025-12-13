import type { Euler, Quaternion, Vector3 } from 'three';

export type TObject3DParams = Readonly<{
  position: Vector3;
  rotation: Euler | Quaternion;
  scale?: Vector3;
  visible?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  layers?: number;
  frustumCulled?: boolean;
  renderOrder?: number;
  // Animations is a  responsibilities of Model3d and Animations domains, here we do nothing with that
  // animations?: ReadonlyArray<AnimationClip>;
}>;
