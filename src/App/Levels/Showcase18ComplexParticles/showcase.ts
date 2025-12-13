import { AdditiveBlending, BufferAttribute, Points, PointsMaterial } from 'three';
import { BufferGeometry, Color } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAppCanvas, TEngine, TParticlesWrapperAsync, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isDefined, isNotDefined } from '@/Engine';

import spaceConfig from './showcase.json';
import GUI from 'lil-gui';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { particlesService } = space.services;
  const scene = particlesService.getScene();

  const parameters: Record<string, string | number> = {
    count: 100000,
    size: 0.01,
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
  let points: Points | undefined;

  function createGalaxy(): void {
    // Destroy old galaxy
    if (isDefined(geometry)) geometry.dispose();
    if (isDefined(material)) material.dispose();
    // TODO (S.Panfilov) scene.remove
    if (isDefined(points)) scene.entity.remove(points);

    geometry = new BufferGeometry();
    const { positions, colors } = generateParams();

    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));

    material = new PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true
    });

    points = new Points(geometry, material);
    // TODO (S.Panfilov) replace with a proper scene.addSometing
    scene.entity.add(points);
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
    // const count: number = 50000;
    // const positions: Float32Array = new Float32Array(count * 3);
    // const colors: Float32Array = new Float32Array(count * 3);
    //
    // // eslint-disable-next-line functional/no-loop-statements
    // for (let i: number = 0; i < count * 3; i++) {
    //   // eslint-disable-next-line functional/immutable-data
    //   positions[i] = (Math.random() - 0.5) * 100;
    //   // eslint-disable-next-line functional/immutable-data
    //   colors[i] = Math.random();
    // }
    //
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
