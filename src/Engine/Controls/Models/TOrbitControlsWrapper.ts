import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { Vector3 } from 'three/src/math/Vector3';

import type { TWrapper } from '@/Engine/Abstract';
import type { TWithActiveMixin } from '@/Engine/Mixins';

import type { TOrbitControlsAccessors } from './TOrbitControlsAccessors';

export type TOrbitControlsWrapper = TWrapper<OrbitControls> &
  TOrbitControlsAccessors &
  Readonly<{
    update: () => boolean;
    enable: () => void;
    isEnable: () => boolean;
    disable: () => void;
    moveToTargetSmoothly: (position: Vector3) => void;
  }> &
  TWithActiveMixin;
