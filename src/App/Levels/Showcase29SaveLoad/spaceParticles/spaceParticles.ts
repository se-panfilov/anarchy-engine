import { BehaviorSubject } from 'rxjs';

import type { TParticlesWrapper, TSpace, TSpaceConfig } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { addModel3dToScene, getContainer } from '../utils';
import spaceConfig from './spaceParticles.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceParticlesData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    addModel3dToScene(space, 'surface_model');

    const positions: Float32Array = getParticlesDeterministicPositions(10000, 50);

    const particles: TParticlesWrapper = space.services.particlesService.getRegistry().getByName('bubbles');
    particles.setIndividualPositions(positions);
  },
  onChange: (space: TSpace): void => {
    const particles: TParticlesWrapper = space.services.particlesService.getRegistry().getByName('bubbles');
    particles.drive.default.addZ(10);
  }
};

export function getParticlesDeterministicPositions(count: number, areaSize: number): Float32Array {
  // Calculate the approximate step of the grid
  const gridSize: number = Math.ceil(Math.cbrt(count)); // Number of particles per side
  const step: number = areaSize / gridSize;

  const positions: Float32Array = new Float32Array(count * 3);

  let index: number = 0;
  // eslint-disable-next-line functional/no-loop-statements
  for (let xi: number = 0; xi < gridSize; xi++) {
    // eslint-disable-next-line functional/no-loop-statements
    for (let yi: number = 0; yi < gridSize; yi++) {
      // eslint-disable-next-line functional/no-loop-statements
      for (let zi: number = 0; zi < gridSize; zi++) {
        if (index >= count) break;

        const x: number = (xi + 0.5) * step - areaSize / 2;
        const y: number = (yi + 0.5) * step - areaSize / 2;
        const z: number = (zi + 0.5) * step - areaSize / 2;

        // eslint-disable-next-line functional/immutable-data
        positions[index * 3 + 0] = x;
        // eslint-disable-next-line functional/immutable-data
        positions[index * 3 + 1] = y;
        // eslint-disable-next-line functional/immutable-data
        positions[index * 3 + 2] = z;

        index++;
      }
    }
  }

  return positions;
}
