import { addGizmo } from '@/App/Levels/Utils';
import type { TParticlesWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { asRecord, isNotDefined, spaceService } from '@/Engine';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { particlesService } = space.services;

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

  const particlesName: string = 'bubbles';
  const particles: TParticlesWrapper = particlesService.getRegistry().getByName(particlesName);
  particles.setIndividualPositions(positions);

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  space.start$.next(true);
}
