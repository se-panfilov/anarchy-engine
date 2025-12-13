import type { Observable } from 'rxjs';

import type { TKinematicData, TKinematicMethods } from '@/Engine/Kinematic';
import type { TReadonlyQuaternion } from '@/Engine/ThreeLib';

import type { TAbstractTransformDriver } from './TAbstractTransformDriver';

export type TKinematicTransformDriver = TAbstractTransformDriver &
  Readonly<{
    data: TKinematicData;
    rotationQuaternion$: Observable<TReadonlyQuaternion>;
  }> &
  TKinematicMethods;
