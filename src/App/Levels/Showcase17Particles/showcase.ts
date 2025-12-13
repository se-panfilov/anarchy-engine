import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TParticlesWrapperAsync, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { particlesService } = space.services;

  async function init(): Promise<void> {
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
    const particles: TParticlesWrapperAsync | undefined = await particlesService.getRegistry().findByNameAsync(particlesName);
    if (isNotDefined(particles)) throw new Error(`Particles "${particlesName}" not found`);
    particles.setIndividualPositions(positions);
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
