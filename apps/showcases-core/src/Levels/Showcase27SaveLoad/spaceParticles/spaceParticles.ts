import type { TParticlesWrapper, TSpace, TSpaceConfig } from '@hellpig/anarchy-engine';
import { BehaviorSubject } from 'rxjs';

import type { TSpacesData } from '../ShowcaseTypes';
import { addModel3dToScene, getContainer, getParticlesDeterministicPositions } from '../utils';
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
