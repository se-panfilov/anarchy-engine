import type { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

import type { TWrapper } from '@/Engine/Abstract';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TMilliseconds } from '@/Engine/Math';
import type { TWithActiveMixin } from '@/Engine/Mixins';

import type { TFpsControlsAccessors } from './TFpsControlsAccessors';

export type TFpsControlsWrapper = TWrapper<FirstPersonControls> &
  TFpsControlsAccessors &
  Readonly<{
    enable: () => void;
    update: (delta: TMilliseconds) => void;
    isEnable: () => boolean;
    disable: () => void;
    getType: () => ControlsType;
  }> &
  TWithActiveMixin;
