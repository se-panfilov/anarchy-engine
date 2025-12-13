import type { TKinematicData } from '@/Engine/Kinematic';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

import type { TActorProps } from './TActorProps';

export type TActorParams = TActorProps &
  TObject3DParams &
  Readonly<{
    physics?: TWithPresetNamePhysicsBodyParams;
  }> &
  Readonly<{
    kinematic?: TOptional<TKinematicData>;
    isKinematicAutoUpdate?: boolean;
  }> &
  TWithReadonlyTags;
