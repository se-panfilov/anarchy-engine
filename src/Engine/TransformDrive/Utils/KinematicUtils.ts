import { KinematicSpeed } from '@/Engine/TransformDrive/Constants';
import type { TKinematicSpeed } from '@/Engine/TransformDrive/Models';

export function isInstant(speed: TKinematicSpeed): speed is KinematicSpeed.Instant {
  return speed === KinematicSpeed.Instant;
}
