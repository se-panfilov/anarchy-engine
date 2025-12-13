import { Clock } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TSpace } from '@/Engine';

import { driveByKeyboard } from './Utils';

export function runAlpha(space: TSpace): void {
  moveByCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  driveByKeyboard('move_actor_left', space.services);
  space.start$.next(true);
}
