import type { Quaternion, Vector3 } from 'three';

import type { TMovableXYZ, TRotatable, TScaleMixin } from '@/Engine/Mixins';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TDefaultTransformAgent = TAbstractTransformAgent &
  Readonly<{
    setPosition: (position: Vector3) => void;
    setRotation: (rotation: Quaternion) => void;
    setScale: (scale: Vector3) => void;
  }> &
  TMovableXYZ &
  TScaleMixin &
  TRotatable;
