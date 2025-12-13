import type { Observable } from 'rxjs';
import type { Quaternion } from 'three';

import type { TAbstractDriver } from '@/Engine/Abstract';

import type { TKinematicData } from './TKinematicData';
import type { TKinematicMethods } from './TKinematicMethods';

export type TKinematicActorDriver = TAbstractDriver &
  Readonly<{
    data: TKinematicData;
    rotationQuaternion$: Observable<Quaternion>;
  }> &
  TKinematicMethods;
