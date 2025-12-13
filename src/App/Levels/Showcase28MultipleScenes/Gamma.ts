import { Clock } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TFsmWrapper, TSpace } from '@/Engine';

export function runGamma(space: TSpace): void {
  moveByCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());

  // const solder1AnimFsm: TFsmWrapper = initSolder1('solder_actor_1', fadeDuration, space.services);
  // const solder2AnimFsm: TFsmWrapper = initSolder2('solder_actor_2', fadeDuration, space.services);

  space.start$.next(true);
}
