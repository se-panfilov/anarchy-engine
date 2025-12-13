import type { Vector3 } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { TWrapper } from '@/Engine/Abstract';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TMilliseconds } from '@/Engine/Math';
import type { TWithActiveMixin } from '@/Engine/Mixins';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TOrbitControlsAccessors } from './TOrbitControlsAccessors';

export type TOrbitControlsWrapper = TWrapper<OrbitControls> &
  TOrbitControlsAccessors &
  Readonly<{
    update: (delta: TMilliseconds) => boolean;
    enable: () => void;
    isEnable: () => boolean;
    disable: () => void;
    moveToTargetSmoothly: (position: TReadonlyVector3 | Vector3) => void;
    getType: () => ControlsType;
  }> &
  TWithActiveMixin;
