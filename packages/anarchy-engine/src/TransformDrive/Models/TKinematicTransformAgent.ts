import type { TKinematicConfig, TKinematicData, TKinematicMethods } from '@Anarchy/Engine/Kinematic';
import type { TSerializable } from '@Anarchy/Engine/Mixins';
import type { BehaviorSubject } from 'rxjs';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TKinematicTransformAgent = TAbstractTransformAgent &
  Readonly<{
    data: TKinematicData;
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TSerializable<TKinematicConfig> &
  TKinematicMethods;
