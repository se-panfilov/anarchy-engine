import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TActorProps = Readonly<{
  agent?: TransformAgent;
  driveUpdateDelay?: number;
  driveCoordsThreshold?: number;
}> &
  TWithName &
  TWithReadonlyTags;
