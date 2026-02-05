import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { TAnyCameraWrapper } from '@hellpig/anarchy-engine/Camera';
import type { ControlsType } from '@hellpig/anarchy-engine/Controls/Constants';
import type { TMilliseconds } from '@hellpig/anarchy-engine/Math';
import type { TWithActiveMixin } from '@hellpig/anarchy-engine/Mixins';
import type { TReadonlyVector3 } from '@hellpig/anarchy-engine/ThreeLib';
import type { Euler, Quaternion, Vector3 } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
    rotateCameraBy: (rotation: Quaternion | Euler) => void;
    rotateCameraTo: (rotation: Quaternion | Euler) => void;
    getCamera: () => TAnyCameraWrapper;
    getType: () => ControlsType;
  }> &
  TWithActiveMixin;
