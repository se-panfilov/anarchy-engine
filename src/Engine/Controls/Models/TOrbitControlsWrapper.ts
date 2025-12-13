import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { TWrapper } from '@/Engine/Abstract';
import type { IWithActiveMixin, IWithTagsMixin } from '@/Engine/Mixins';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TOrbitControlsAccessors } from './TOrbitControlsAccessors';

export type TOrbitControlsWrapper = TWrapper<OrbitControls> &
  TOrbitControlsAccessors &
  Readonly<{
    update: () => boolean;
    enable: () => void;
    isEnable: () => boolean;
    disable: () => void;
    moveToTargetSmoothly: (position: TVector3Wrapper) => void;
  }> &
  IWithActiveMixin &
  IWithTagsMixin;
