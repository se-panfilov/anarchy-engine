import type { TFsmStates, TFsmWrapper, TKeysPressingEvent, TSpace } from '@Anarchy/Engine';
import { KeyCode } from '@Anarchy/Engine';
import { isKeyInEvent, isKeyPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
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
  const { pressing$, released$ } = keyboardService;

  moveByCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());

  const fadeDuration = 0.3;

  const solder1AnimFsm: TFsmWrapper = initSolder1('solder_actor_1', fadeDuration, space.services);
  const solder2AnimFsm: TFsmWrapper = initSolder2('solder_actor_2', fadeDuration, space.services);

  solder1AnimFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
    if (state === 'Idle') {
      solder2AnimFsm.send$.next('Idle');
    } else {
      solder2AnimFsm.send$.next('Dance');
    }
  });

  pressing$.subscribe(({ keys }: TKeysPressingEvent): void => {
    const action: 'Run' | 'Walk' = isKeyPressed(KeyCode.ShiftLeft, keys) ? 'Run' : 'Walk';
    if (solder1AnimFsm.getState() !== action) solder1AnimFsm.send$.next(action);
  });

  released$.subscribe((event: KeyboardEvent): void => {
    if (isKeyInEvent(KeyCode.W, event)) solder1AnimFsm.send$.next('Idle');
  });
}
