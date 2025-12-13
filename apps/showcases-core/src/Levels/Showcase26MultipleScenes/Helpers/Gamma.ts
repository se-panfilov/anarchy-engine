import type { TFsmStates, TFsmWrapper, TKeysEvent, TSpace } from '@Anarchy/Engine';
import { KeyCode } from '@Anarchy/Engine';
import { hasKey } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import { distinctUntilChanged } from 'rxjs';
import { Clock } from 'three';

import { initSolder1, initSolder2 } from '@/Levels/Showcase22ActorsWithModels/Utils';
import { moveByCircle } from '@/Utils/MoveUtils';

import { addParticles } from './Utils';

export function runGamma(space: TSpace): void {
  addActors(space);
  addParticles(space);

  space.start$.next(true);
}

function addActors(space: TSpace): void {
  const { keyboardService } = space.services;
  const { keys$ } = keyboardService;

  const walk = 'Walk' as const;
  const run = 'Run' as const;
  const idle = 'Idle' as const;
  const dance = 'Dance' as const;

  moveByCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());

  const fadeDuration: number = 0.3;

  const solder1AnimFsm: TFsmWrapper = initSolder1('solder_actor_1', fadeDuration, space.services);
  const solder2AnimFsm: TFsmWrapper = initSolder2('solder_actor_2', fadeDuration, space.services);

  solder1AnimFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
    if (state === idle) {
      solder2AnimFsm.send$.next(idle);
    } else {
      solder2AnimFsm.send$.next(dance);
    }
  });

  keys$.subscribe(({ keys }: TKeysEvent): void => {
    const isWalk: boolean = hasKey(KeyCode.W, keys);
    const isRun: boolean = isWalk && hasKey(KeyCode.ShiftLeft, keys);
    const action = isRun ? run : isWalk ? walk : idle;
    if (solder1AnimFsm.getState() !== action) solder1AnimFsm.send$.next(action);
  });

  space.start$.next(true);
}
