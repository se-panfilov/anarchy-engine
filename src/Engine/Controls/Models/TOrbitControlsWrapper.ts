import type { Vector3 } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { TWrapper } from '@/Engine/Abstract';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TMilliseconds } from '@/Engine/Math';
import type { TWithActiveMixin } from '@/Engine/Mixins';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TControlsServiceDependencies } from './TControlsServiceDependencies';
import type { TOrbitControlsAccessors } from './TOrbitControlsAccessors';
import type { TOrbitControlsConfig } from './TOrbitControlsConfig';

export type TOrbitControlsWrapper = Omit<TWrapper<OrbitControls>, 'serialize'> &
  Readonly<{
    serialize: (dependencies: TControlsServiceDependencies) => TOrbitControlsConfig;
  }> &
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
