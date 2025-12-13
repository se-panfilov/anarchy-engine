import GUI from 'lil-gui';
import { CameraHelper, DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, IDirectionalLightWrapper, IHemisphereLightWrapper, ISpace, ISpaceConfig, IPointLightWrapper, IRectAreaLightWrapper, ISceneWrapper, ISpotLightWrapper } from '@/Engine';
import { buildSpaceFromConfig, isNotDefined } from '@/Engine';

import spaceConfig from './showcase-12-light.json';

//Showcase 12: Light
export function showcase(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { lightRegistry, scenesRegistry } = space.entities;

  // void envMapService.load('/Showcase/hdr/urban_alley_01_4k.hdr');

  function init(): void {
    const scene: ISceneWrapper | undefined = scenesRegistry.findByTag('current');
    if (isNotDefined(scene)) throw new Error('Scene not found');

    //directional light
    const directionalLight: IDirectionalLightWrapper | undefined = lightRegistry.findByTag('directional') as IDirectionalLightWrapper | undefined;
    if (isNotDefined(directionalLight)) throw new Error('Directional light not found');
    const directionalLightHelper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight.entity, 3);
    const directionalLightCameraHelper: CameraHelper = new CameraHelper(directionalLight.entity.shadow.camera);
    // eslint-disable-next-line functional/immutable-data
    directionalLight.entity.shadow.camera.near = 1;
    // eslint-disable-next-line functional/immutable-data
    directionalLight.entity.shadow.camera.far = 6;
    scene.add(directionalLightHelper);
    scene.add(directionalLightCameraHelper);
    const directionalFolder: GUI = gui.addFolder('Directional light');
    directionalFolder.add(directionalLight.entity.position, 'x').min(-50).max(50).step(0.5);
    directionalFolder.add(directionalLight.entity.position, 'y').min(-50).max(50).step(0.5);
    directionalFolder.add(directionalLight.entity.position, 'z').min(-50).max(50).step(0.5);
    directionalFolder.addColor(directionalLight.entity, 'color');
    directionalFolder.add(directionalLight.entity, 'intensity').min(0).max(10).step(0.1);
    directionalFolder.add(directionalLight.entity.shadow.camera, 'near').min(0).max(10).step(1);
    directionalFolder.add(directionalLight.entity.shadow.camera, 'far').min(0).max(10).step(1);

    //hemisphere light
    const hemisphereLight: IHemisphereLightWrapper | undefined = lightRegistry.findByTag('hemisphere') as IHemisphereLightWrapper | undefined;
    if (isNotDefined(hemisphereLight)) throw new Error('Hemisphere light not found');
    const hemisphereLightHelper: HemisphereLightHelper = new HemisphereLightHelper(hemisphereLight.entity, 3);
    scene.add(hemisphereLightHelper);
    const hemisphereFolder: GUI = gui.addFolder('Hemisphere light');
    hemisphereFolder.addColor(hemisphereLight.entity, 'color');
    hemisphereFolder.addColor(hemisphereLight.entity, 'groundColor');
    hemisphereFolder.add(hemisphereLight.entity, 'intensity').min(0).max(10).step(0.1);

    const rectAreaLight: IRectAreaLightWrapper | undefined = lightRegistry.findByTag('rect_area') as IRectAreaLightWrapper | undefined;
    if (isNotDefined(rectAreaLight)) throw new Error('Rect area light not found');
    const rectAreaLightHelper: RectAreaLightHelper = new RectAreaLightHelper(rectAreaLight.entity, 5);
    scene.add(rectAreaLightHelper);
    const rectAreaFolder: GUI = gui.addFolder('RectArea light');
    rectAreaFolder.add(rectAreaLight.entity.position, 'x').min(-50).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity.position, 'y').min(-50).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity.position, 'z').min(-50).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity, 'width').min(0).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity, 'height').min(0).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity, 'intensity').min(0).max(10).step(0.1);

    const pointLight: IPointLightWrapper | undefined = lightRegistry.findByTag('point') as IPointLightWrapper | undefined;
    if (isNotDefined(pointLight)) throw new Error('Point light not found');
    const pointLightHelper: PointLightHelper = new PointLightHelper(pointLight.entity, 3);
    scene.add(pointLightHelper);
    const pointFolder: GUI = gui.addFolder('Point light');
    pointFolder.addColor(pointLight.entity, 'color');
    pointFolder.add(pointLight.entity.position, 'x').min(-50).max(50).step(0.5);
    pointFolder.add(pointLight.entity.position, 'y').min(-50).max(50).step(0.5);
    pointFolder.add(pointLight.entity.position, 'z').min(-50).max(50).step(0.5);
    pointFolder.add(pointLight.entity, 'intensity').min(0).max(100).step(0.1);
    pointFolder.add(pointLight.entity, 'distance').min(0).max(100).step(0.1);
    pointFolder.add(pointLight.entity, 'decay').min(0).max(100).step(0.1);

    const spotLight: ISpotLightWrapper | undefined = lightRegistry.findByTag('spot') as ISpotLightWrapper | undefined;
    if (isNotDefined(spotLight)) throw new Error('Spot light not found');
    const spotLightHelper: SpotLightHelper = new SpotLightHelper(spotLight.entity, 3);
    scene.add(spotLightHelper);
    const spotFolder: GUI = gui.addFolder('Spot light');
    spotFolder.add(spotLight.entity.position, 'x').min(-50).max(50).step(0.5);
    spotFolder.add(spotLight.entity.position, 'y').min(-50).max(50).step(0.5);
    spotFolder.add(spotLight.entity.position, 'z').min(-50).max(50).step(0.5);
    spotFolder.addColor(spotLight.entity, 'color');
    spotFolder.add(spotLight.entity, 'intensity').min(0).max(100).step(0.1);
    spotFolder.add(spotLight.entity, 'distance').min(0).max(100).step(0.1);
    spotFolder.add(spotLight.entity, 'angle').min(0).max(100).step(0.1);
    spotFolder.add(spotLight.entity, 'penumbra').min(0).max(100).step(0.1);
    spotFolder.add(spotLight.entity, 'decay').min(0).max(100).step(0.1);
  }

  function start(): void {
    space.start();
    void init();
  }

  return { start, space };
}
