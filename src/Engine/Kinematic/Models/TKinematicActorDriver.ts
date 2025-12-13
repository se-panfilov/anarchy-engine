import type { Observable } from 'rxjs';

import type { TAbstractDriver } from '@/Engine/Abstract';
import type { TReadonlyQuaternion } from '@/Engine/ThreeLib';

import type { TKinematicData } from './TKinematicData';
import type { TKinematicMethods } from './TKinematicMethods';

export type TKinematicActorDriver = TAbstractDriver &
  Readonly<{
    data: TKinematicData;
    rotationQuaternion$: Observable<TReadonlyQuaternion>;
  }> &
  TKinematicMethods;
