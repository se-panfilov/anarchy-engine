import GUI from 'lil-gui';

import type { IShowcase } from '@/App/Levels/Models';
import { buildLevelFromConfig, envMapService, IAppCanvas, IDirectionalLightWrapper, ILevel, ILevelConfig, isNotDefined } from '@/Engine';

import levelConfig from './showcase-12-light.json';

//Showcase 12: Light
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { lightRegistry } = level.entities;

  // void envMapService.load('/Showcase/hdr/urban_alley_01_4k.hdr');

  function init(): void {
    const directionalLight: IDirectionalLightWrapper | undefined = lightRegistry.getUniqByTag('directional') as IDirectionalLightWrapper | undefined;
    if (isNotDefined(directionalLight)) throw new Error('Directional light not found');
    const directionalFolder: GUI = gui.addFolder('Directional light');
    directionalFolder.add(directionalLight.entity.position, 'x').min(-50).max(50).step(0.5);
    directionalFolder.add(directionalLight.entity.position, 'y').min(-50).max(50).step(0.5);
    directionalFolder.add(directionalLight.entity.position, 'z').min(-50).max(50).step(0.5);
    directionalFolder.addColor(directionalLight.entity, 'color');
    directionalFolder.add(directionalLight.entity, 'intensity').min(0).max(10).step(0.1);
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
