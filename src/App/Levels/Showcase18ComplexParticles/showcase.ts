import GUI from 'lil-gui';
import { BufferGeometry, Color, PointsMaterial } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TParticlesConfig, TParticlesParams, TParticlesWrapper, TPointsMaterialPropsOptions, TSpace, TSpaceConfig } from '@/Engine';
import { Engine, isDefined, isNotDefined, spaceService } from '@/Engine';
import { configToParams as particlesConfigToParams } from '@/Engine/Particles/Adapters';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { particlesService, loopService } = space.services;

  const particlesName: string = 'stars';

  const particlesConfig: TParticlesConfig | undefined = (spaceConfig.particles as ReadonlyArray<TParticlesConfig>).find((p: TParticlesConfig): boolean => p.name === particlesName);
  if (isNotDefined(particlesConfig)) throw new Error(`Particles "${particlesName}" not found`);
  const particlesDefaultParams: TParticlesParams = particlesConfigToParams(particlesConfig);

  let particles: TParticlesWrapper | undefined;

  type TGalaxyParams = { count: number; size: number; radius: number; branches: number; spin: number; randomness: number; randomnessPower: number; insideColor: string; outsideColor: string };

  const parameters: TGalaxyParams = {
    count: 42000,
    size: (particlesDefaultParams.material.params as TPointsMaterialPropsOptions).size ?? 0.01,
    radius: 7.2,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
  };

  let geometry: BufferGeometry | undefined;
  let material: PointsMaterial | undefined;

  async function createGalaxy(): Promise<void> {
    // Destroy old galaxy
    if (isDefined(geometry)) geometry.dispose();
    if (isDefined(material)) material.dispose();
    if (isDefined(particles)) {
      // TODO DESTROY: implement scene remove
      // particlesService.getScene().entity.remove(particles.entity);
      // TODO DESTROY: destroy doesn't work atm
      //particles.destroy();
      // particles = undefined;
    }

    geometry = new BufferGeometry();
    const { positions, colors } = generateParams(parameters);

    material = new PointsMaterial({
      ...particlesDefaultParams.material.params,
      size: parameters.size
    });

    particles = particlesService.getRegistry().findByName(particlesName);
    if (isNotDefined(particles)) throw new Error(`Particles "${particlesName}" not found`);

    particles.setIndividualPositions(positions);
    particles.setIndividualMaterialColors(colors);
  }

  function generateParams(parameters: TGalaxyParams): { positions: Float32Array; colors: Float32Array } {
    const positions: Float32Array = new Float32Array(parameters.count * 3);
    const colors: Float32Array = new Float32Array(parameters.count * 3);

    const colorInside: Color = new Color(parameters.insideColor);
    const colorOutside: Color = new Color(parameters.outsideColor);

    // eslint-disable-next-line functional/no-loop-statements
    for (let i: number = 0; i < parameters.count; i++) {
      // Position
      const i3: number = i * 3;

      const radius: number = Math.random() * parameters.radius;

      const spinAngle: number = radius * parameters.spin;
      const branchAngle: number = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX: number = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY: number = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomZ: number = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      // eslint-disable-next-line functional/immutable-data
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      // eslint-disable-next-line functional/immutable-data
      positions[i3 + 1] = randomY;
      // eslint-disable-next-line functional/immutable-data
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color
      const mixedColor: Color = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      // eslint-disable-next-line functional/immutable-data
      colors[i3] = mixedColor.r;
      // eslint-disable-next-line functional/immutable-data
      colors[i3 + 1] = mixedColor.g;
      // eslint-disable-next-line functional/immutable-data
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }

  loopService.tick$.subscribe(({ delta }) => {
    if (isDefined(particles)) {
      particles.adjustRotationByY(delta * 0.018);
    }
  });

  async function init(): Promise<void> {
    gui.add(parameters, 'count').min(1000).max(1000000).step(1000).onFinishChange(createGalaxy);
    gui.add(parameters, 'size').min(0.001).max(1).step(0.001).onFinishChange(createGalaxy);
    gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(createGalaxy);
    gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(createGalaxy);
    gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(createGalaxy);
    gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(createGalaxy);
    gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(createGalaxy);
    gui.addColor(parameters, 'insideColor').onChange(createGalaxy);
    gui.addColor(parameters, 'outsideColor').onChange(createGalaxy);

    await createGalaxy();
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
