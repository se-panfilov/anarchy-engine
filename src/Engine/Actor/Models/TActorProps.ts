import type { TWithNameOptional, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TActorModel3dSettings } from './TActorModel3dSettings';

export type TActorProps = Readonly<{
  driveUpdateDelay?: number;
  driveCoordsThreshold?: number;
  model3dSettings?: TActorModel3dSettings;
}> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TWithReadonlyTags;
