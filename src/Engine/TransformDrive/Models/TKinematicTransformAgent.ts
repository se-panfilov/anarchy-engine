import type { Observable } from 'rxjs';

import type { TKinematicData, TKinematicMethods } from '@/Engine/Kinematic';
import type { TReadonlyQuaternion } from '@/Engine/ThreeLib';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TKinematicTransformAgent = TAbstractTransformAgent &
  Readonly<{
    data: TKinematicData;
    rotationQuaternion$: Observable<TReadonlyQuaternion>;
  }> &
  TKinematicMethods;
