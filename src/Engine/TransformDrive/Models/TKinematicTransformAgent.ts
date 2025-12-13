import type { BehaviorSubject } from 'rxjs';

import type { TKinematicData, TKinematicMethods } from '@/Engine/Kinematic';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TKinematicTransformAgent = TAbstractTransformAgent &
  Readonly<{
    data: TKinematicData;
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TKinematicMethods;
