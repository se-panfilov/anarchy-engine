import type { TWithNameOptional, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TActorModel3dSettings } from './TActorModel3dSettings';
import type { TActorStates } from './TActorStates';

export type TActorProps = Readonly<{
  driveUpdateDelay?: number;
  driveCoordsThreshold?: number;
  model3dSettings?: TActorModel3dSettings;
  states?: TActorStates;
}> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TWithReadonlyTags;
