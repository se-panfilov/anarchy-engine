import type { BehaviorSubject } from 'rxjs';

import type { TKinematicConfig, TKinematicData, TKinematicMethods } from '@/Kinematic';
import type { TSerializable } from '@/Mixins';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TKinematicTransformAgent = TAbstractTransformAgent &
  Readonly<{
    data: TKinematicData;
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TSerializable<TKinematicConfig> &
  TKinematicMethods;
