import type { TWithNameOptional, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

export type TActorProps = Readonly<{
  driveUpdateDelay?: number;
  driveCoordsThreshold?: number;
}> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TWithReadonlyTags;
