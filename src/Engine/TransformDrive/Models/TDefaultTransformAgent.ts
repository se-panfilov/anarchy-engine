import type { Euler, Vector3 } from 'three';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TDefaultTransformAgent = TAbstractTransformAgent &
  Readonly<{
    setPosition: (position: Vector3) => void;
    setRotation: (rotation: Euler) => void;
    setScale: (scale: Vector3) => void;
  }>;
