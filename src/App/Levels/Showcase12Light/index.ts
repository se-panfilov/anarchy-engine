import GUI from 'lil-gui';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, IDirectionalLightWrapper, IHemisphereLightWrapper, ILevel, ILevelConfig, IPointLightWrapper, IRectAreaLightWrapper } from '@/Engine';
import { buildLevelFromConfig, isNotDefined } from '@/Engine';

import levelConfig from './showcase-12-light.json';

//Showcase 12: Light
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { lightRegistry } = level.entities;

  // void envMapService.load('/Showcase/hdr/urban_alley_01_4k.hdr');

  function init(): void {
    //directional light
    const directionalLight: IDirectionalLightWrapper | undefined = lightRegistry.getUniqByTag('directional') as IDirectionalLightWrapper | undefined;
    if (isNotDefined(directionalLight)) throw new Error('Directional light not found');
    const directionalFolder: GUI = gui.addFolder('Directional light');
    directionalFolder.add(directionalLight.entity.position, 'x').min(-50).max(50).step(0.5);
    directionalFolder.add(directionalLight.entity.position, 'y').min(-50).max(50).step(0.5);
    directionalFolder.add(directionalLight.entity.position, 'z').min(-50).max(50).step(0.5);
    directionalFolder.addColor(directionalLight.entity, 'color');
    directionalFolder.add(directionalLight.entity, 'intensity').min(0).max(10).step(0.1);

    //hemisphere light
    const hemisphereLight: IHemisphereLightWrapper | undefined = lightRegistry.getUniqByTag('hemisphere') as IHemisphereLightWrapper | undefined;
    if (isNotDefined(hemisphereLight)) throw new Error('Hemisphere light not found');
    const hemisphereFolder: GUI = gui.addFolder('Hemisphere light');
    hemisphereFolder.addColor(hemisphereLight.entity, 'color');
    hemisphereFolder.addColor(hemisphereLight.entity, 'groundColor');
    hemisphereFolder.add(hemisphereLight.entity, 'intensity').min(0).max(10).step(0.1);

    const rectAreaLight: IRectAreaLightWrapper | undefined = lightRegistry.getUniqByTag('rect_area') as IRectAreaLightWrapper | undefined;
    if (isNotDefined(rectAreaLight)) throw new Error('Rect area light not found');
    const rectAreaFolder: GUI = gui.addFolder('RectArea light');
    rectAreaFolder.add(rectAreaLight.entity.position, 'x').min(-50).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity.position, 'y').min(-50).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity.position, 'z').min(-50).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity, 'width').min(0).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity, 'height').min(0).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity, 'intensity').min(0).max(10).step(0.1);

    const pointLight: IPointLightWrapper | undefined = lightRegistry.getUniqByTag('point') as IPointLightWrapper | undefined;
    if (isNotDefined(pointLight)) throw new Error('Point light not found');
    const pointFolder: GUI = gui.addFolder('Point light');
    pointFolder.addColor(pointLight.entity, 'color');
    pointFolder.add(pointLight.entity, 'intensity').min(0).max(100).step(0.1);
    pointFolder.add(pointLight.entity, 'distance').min(0).max(100).step(0.1);
    pointFolder.add(pointLight.entity, 'decay').min(0).max(100).step(0.1);
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
