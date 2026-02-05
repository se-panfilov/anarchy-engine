import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { TAnyCameraWrapper } from '@hellpig/anarchy-engine/Camera';
import type { ControlsType } from '@hellpig/anarchy-engine/Controls/Constants';
import type { TMilliseconds } from '@hellpig/anarchy-engine/Math';
import type { TWithActiveMixin } from '@hellpig/anarchy-engine/Mixins';
import type { Euler, EventDispatcher, Quaternion } from 'three';
import type { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

import type { TControlsServiceDependencies } from './TControlsServiceDependencies';
import type { TFpsControlsAccessors } from './TFpsControlsAccessors';
import type { TFpsControlsConfig } from './TFpsControlsConfig';

export type TFpsControlsWrapper = Omit<TWrapper<FirstPersonControls & EventDispatcher>, 'serialize'> &
  Readonly<{
    serialize: (dependencies: TControlsServiceDependencies) => TFpsControlsConfig;
  }> &
  TFpsControlsAccessors &
  Readonly<{
    enable: () => void;
    update: (delta: TMilliseconds) => void;
    isEnable: () => boolean;
    disable: () => void;
    getType: () => ControlsType;
    rotateCameraBy: (rotation: Quaternion | Euler) => void;
    rotateCameraTo: (rotation: Quaternion | Euler) => void;
    getCamera: () => TAnyCameraWrapper;
  }> &
  TWithActiveMixin;
