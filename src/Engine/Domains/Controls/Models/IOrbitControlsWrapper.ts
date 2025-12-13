import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { CameraTag } from '@/Engine/Domains/Camera/Constants';
import type { IVector3Wrapper } from '@/Engine/Domains/Vector';
import type { IWithTags } from '@/Engine/Mixins';

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
  IWithTags<CameraTag>;
