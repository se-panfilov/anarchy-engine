import type { TMovableXYZ, TRotatable, TScaleMixin, TSerializable } from '@Engine/Mixins';
import type { Quaternion, Vector3 } from 'three';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';
import type { TSerializedTransform } from './TSerializedTransform';

export type TDefaultTransformAgent = TAbstractTransformAgent &
  Readonly<{
    setPosition: (position: Vector3) => void;
    setRotation: (rotation: Quaternion) => void;
    setScale: (scale: Vector3) => void;
  }> &
  TSerializable<TSerializedTransform> &
  TMovableXYZ &
  TScaleMixin &
  TRotatable;
