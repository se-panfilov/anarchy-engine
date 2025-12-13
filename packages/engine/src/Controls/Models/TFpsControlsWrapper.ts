import type { Euler, EventDispatcher, Quaternion } from 'three';
import type { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

import type { TWrapper } from '@/Engine/Abstract';
import type { TAnyCameraWrapper } from '@/Engine/Camera';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TMilliseconds } from '@/Engine/Math';
import type { TWithActiveMixin } from '@/Engine/Mixins';

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
