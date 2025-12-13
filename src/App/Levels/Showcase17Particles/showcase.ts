import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TEngine, TParticlesWrapper, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfigJson from './showcase.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function showcase(): TShowcase {
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceConfig]);
  // TODO 14-0-0: implement spaceService.findActive()
  const space: TSpace = spaces[0];

  const { particlesService } = space.services;

  function init(): void {
    const count: number = 50000;
    const positions: Float32Array = new Float32Array(count * 3);
    const colors: Float32Array = new Float32Array(count * 3);

    addGizmo(space.services, ambientContext.screenSizeWatcher, space.loops, { placement: 'bottom-left' });

    // eslint-disable-next-line functional/no-loop-statements
    for (let i: number = 0; i < count * 3; i++) {
      // eslint-disable-next-line functional/immutable-data
      positions[i] = (Math.random() - 0.5) * 100;
      // eslint-disable-next-line functional/immutable-data
      colors[i] = Math.random();
    }

    const particlesName: string = 'bubbles';
    const particles: TParticlesWrapper | undefined = particlesService.getRegistry().findByName(particlesName);
    if (isNotDefined(particles)) throw new Error(`Particles "${particlesName}" not found`);
    particles.setIndividualPositions(positions);
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
