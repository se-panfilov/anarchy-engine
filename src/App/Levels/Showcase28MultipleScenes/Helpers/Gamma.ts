import { distinctUntilChanged } from 'rxjs';
import { Clock } from 'three';

import { initSolder1, initSolder2 } from '@/App/Levels/Showcase24ActorsWithModels/Utils';
import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TFsmStates, TFsmWrapper, TParticlesWrapper, TSpace } from '@/Engine';
import { isNotDefined, KeyCode, KeysExtra } from '@/Engine';

export function runGamma(space: TSpace): void {
  addActors(space);
  addParticles(space);

  space.start$.next(true);
}

function addActors(space: TSpace): void {
  const { keyboardService } = space.services;
  const { onKey, isKeyPressed } = keyboardService;

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

  onKey(KeyCode.W).pressing$.subscribe((): void => {
    const action: 'Run' | 'Walk' = isKeyPressed(KeysExtra.Shift) ? 'Run' : 'Walk';
    if (solder1AnimFsm.getState() !== action) solder1AnimFsm.send$.next(action);
  });

  onKey(KeyCode.W).released$.subscribe((): void => {
    solder1AnimFsm.send$.next('Idle');
  });
}

function addParticles(space: TSpace): void {
  const count: number = 50000;
  const positions: Float32Array = new Float32Array(count * 3);
  const colors: Float32Array = new Float32Array(count * 3);

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < count * 3; i++) {
    // eslint-disable-next-line functional/immutable-data
    positions[i] = (Math.random() - 0.5) * 100;
    // eslint-disable-next-line functional/immutable-data
    colors[i] = Math.random();
  }

  const { particlesService } = space.services;

  const particlesName: string = 'bubbles';
  const particles: TParticlesWrapper | undefined = particlesService.getRegistry().findByName(particlesName);
  if (isNotDefined(particles)) throw new Error(`Particles "${particlesName}" not found`);
  particles.setIndividualPositions(positions);
}
