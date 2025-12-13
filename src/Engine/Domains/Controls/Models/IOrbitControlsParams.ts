import type { IVector3 } from '@/Engine/Wrappers';

import type { IControlsParams } from './IControlsParams';

export type IOrbitControlsParams = IControlsParams &
  Readonly<{
    target?: IVector3;
    damping?: boolean;
  }>;
