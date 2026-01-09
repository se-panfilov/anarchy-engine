import type { TSpace } from '@Anarchy/Engine';
import { Clock } from 'three';

import { watchActiveRendererReady } from '@/Utils';
import { moveByCircle } from '@/Utils/MoveUtils';

import { addParticles, driveByKeyboard } from './Utils';

export function runAlpha(space: TSpace): void {
  watchActiveRendererReady(space);
  moveByCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  driveByKeyboard('move_actor_left', space.services, space.loops);
  addParticles(space);
  space.start$.next(true);
}
