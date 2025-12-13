import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { IWrapper } from '@/Engine/Domains/Abstract';

export type IOrbitControlsWrapper = IWrapper<OrbitControls> &
  Readonly<{
    update: () => void;
    setDamping: (isEnabled: boolean) => void;
    getDampingState: () => boolean;
    enable: () => void;
    disable: () => void;
  }>;
