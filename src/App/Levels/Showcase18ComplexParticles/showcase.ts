import GUI from 'lil-gui';
import { AdditiveBlending, BufferGeometry, Color, PointsMaterial } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TParticlesConfig, TParticlesParams, TParticlesWrapperAsync, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isDefined, isNotDefined } from '@/Engine';

import spaceConfig from './showcase.json';
import { configToParams as particlesConfigToParams } from '@/Engine/Particles/Adapters';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { particlesService } = space.services;

  const particlesName: string = 'bubbles';

  const particlesConfig: TParticlesConfig | undefined = (spaceConfig.particles as ReadonlyArray<TParticlesConfig>).find((p: TParticlesConfig): boolean => p.name === particlesName);
  if (isNotDefined(particlesConfig)) throw new Error(`Particles "${particlesName}" not found`);
  const particlesDefaultParams: TParticlesParams = particlesConfigToParams(particlesConfig);

  const parameters: Record<string, string | number> = {
    count: 100000,
    size: particlesDefaultParams.material.params?.size ?? 0.01,
    radius: 5,
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
    // TODO (S.Panfilov) scene.remove
    // if (isDefined(particles)) scene.entity.remove(points);

    geometry = new BufferGeometry();
    const { positions, colors } = generateParams();

    material = new PointsMaterial({
      ...particlesDefaultParams.material.params,
      size: parameters.size as number
    });
    const particles: TParticlesWrapperAsync | undefined = await particlesService.getRegistry().findByNameAsync(particlesName);
    if (isNotDefined(particles)) throw new Error(`Particles "${particlesName}" not found`);
    particles.setIndividualPositions(positions);
    particles.setIndividualMaterialColors(colors);
  }

  function generateParams(): { positions: Float32Array; colors: Float32Array; colorInside: Color; colorOutside: Color } {
    const positions: Float32Array = new Float32Array(parameters.count * 3);
    const colors: Float32Array = new Float32Array(parameters.count * 3);

    const colorInside: Color = new Color(parameters.insideColor);
    const colorOutside: Color = new Color(parameters.outsideColor);

    for (let i: number = 0; i < parameters.count; i++) {
      // Position
      const i3: number = i * 3;

      const radius: number = Math.random() * parameters.radius;

      const spinAngle: number = radius * parameters.spin;
      const branchAngle: number = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX: number = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY: number = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomZ: number = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color
      const mixedColor: Color = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors, colorInside, colorOutside };
  }

  async function init(): Promise<void> {
    const gui: GUI = new GUI();
    gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(createGalaxy);
    gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(createGalaxy);
    gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(createGalaxy);
    gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(createGalaxy);
    gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(createGalaxy);
    gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(createGalaxy);
    gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(createGalaxy);
    gui.addColor(parameters, 'insideColor').onFinishChange(createGalaxy);
    gui.addColor(parameters, 'outsideColor').onFinishChange(createGalaxy);

    createGalaxy();
    // const particlesName: string = 'bubbles';
    // const particles: TParticlesWrapperAsync | undefined = await particlesService.getRegistry().findByNameAsync(particlesName);
    // if (isNotDefined(particles)) throw new Error(`Particles "${particlesName}" not found`);
    // particles.setIndividualPositions(positions);
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
