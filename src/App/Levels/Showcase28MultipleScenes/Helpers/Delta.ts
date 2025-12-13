import { Clock } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TSpace } from '@/Engine';

export function runDelta(space: TSpace): void {
  moveByCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  space.start$.next(true);
}
