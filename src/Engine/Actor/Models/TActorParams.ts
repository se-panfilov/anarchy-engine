import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithPhysicsPresetParams } from '@/Engine/Physics';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TActorProps } from './TActorProps';

export type TActorParams = TActorProps &
  TObject3DParams &
  Readonly<{
    physics: TWithPhysicsPresetParams;
  }> &
  TWithReadonlyTags;
