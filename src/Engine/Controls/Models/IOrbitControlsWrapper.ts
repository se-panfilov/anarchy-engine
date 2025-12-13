import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { IWrapper } from '@/Engine/Abstract';
import type { IWithActiveMixin, IWithTagsMixin } from '@/Engine/Mixins';
import type { IVector3Wrapper } from '@/Engine/Vector';

import type { IOrbitControlsAccessors } from './IOrbitControlsAccessors';

export type IOrbitControlsWrapper = IWrapper<OrbitControls> &
  IOrbitControlsAccessors &
  Readonly<{
    update: () => boolean;
    enable: () => void;
    isEnable: () => boolean;
    disable: () => void;
    moveToTargetSmoothly: (position: IVector3Wrapper) => void;
  }> &
  IWithActiveMixin &
  IWithTagsMixin;
