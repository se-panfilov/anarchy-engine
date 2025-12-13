import type { AnimationClip, Layers } from 'three';

import type { IWithCoordsXYZ } from '@/Engine/Mixins';

export type IObject3DProps = Readonly<{
  position: IWithCoordsXYZ;
  rotation: IWithCoordsXYZ;
  scale?: IWithCoordsXYZ;
  visible?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  layers?: Layers;
  frustumCulled?: boolean;
  renderOrder?: number;
  animations?: ReadonlyArray<AnimationClip>;
}>;
