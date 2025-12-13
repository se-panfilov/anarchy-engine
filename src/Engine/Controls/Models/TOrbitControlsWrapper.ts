import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { Vector3 } from 'three/src/math/Vector3';

import type { TWrapper } from '@/Engine/Abstract';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TMilliseconds } from '@/Engine/Math';
import type { TWithActiveMixin } from '@/Engine/Mixins';

import type { TOrbitControlsAccessors } from './TOrbitControlsAccessors';

export type TOrbitControlsWrapper = TWrapper<OrbitControls> &
  TOrbitControlsAccessors &
  Readonly<{
    update: (delta: TMilliseconds) => boolean;
    enable: () => void;
    isEnable: () => boolean;
    disable: () => void;
    moveToTargetSmoothly: (position: Vector3) => void;
    getType: () => ControlsType;
  }> &
  TWithActiveMixin;
