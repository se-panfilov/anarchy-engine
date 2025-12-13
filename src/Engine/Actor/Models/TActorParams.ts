import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TKinematicInfo, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TActorProps } from './TActorProps';

export type TActorParams = TActorProps &
  TObject3DParams &
  Readonly<{
    physics?: TWithPresetNamePhysicsBodyParams;
  }> &
  Readonly<{
    kinematic?: TKinematicInfo;
    isKinematicAutoUpdate?: boolean;
  }> &
  TWithReadonlyTags;
