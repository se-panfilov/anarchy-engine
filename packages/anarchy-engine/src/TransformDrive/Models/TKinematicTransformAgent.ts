import type { TKinematicConfig, TKinematicData, TKinematicMethods } from '@hellpig/anarchy-engine/Kinematic';
import type { TSerializable } from '@hellpig/anarchy-engine/Mixins';
import type { BehaviorSubject } from 'rxjs';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TKinematicTransformAgent = TAbstractTransformAgent &
  Readonly<{
    data: TKinematicData;
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TSerializable<TKinematicConfig> &
  TKinematicMethods;
