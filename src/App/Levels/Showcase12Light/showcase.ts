import GUI from 'lil-gui';
import { CameraHelper, DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type {
  TAppCanvas,
  TDirectionalLightWrapper,
  TEngine,
  THemisphereLightWrapper,
  TLightRegistry,
  TModel3d,
  TModels3dRegistry,
  TPointLightWrapper,
  TRectAreaLightWrapper,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpotLightWrapper
} from '@/Engine';
import { ambientContext, Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const gui: GUI = new GUI();
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { lightService, scenesService, models3dService } = space.services;

  const lightRegistry: TLightRegistry = lightService.getRegistry();
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();

  const planeModel3d: TModel3d | undefined = models3dRegistry.findByName('surface_model');
  if (isNotDefined(planeModel3d)) throw new Error('Plane model is not defined');

  const sceneW: TSceneWrapper | undefined = scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error('Scene is not defined');
  sceneW.addModel3d(planeModel3d);

  function init(): void {
    const scene: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(scene)) throw new Error('Scene not found');

    addGizmo(space.services, ambientContext.screenSizeWatcher, { placement: 'bottom-left' });

    //directional light
    const directionalLight: TDirectionalLightWrapper | undefined = lightRegistry.findByTag('directional') as TDirectionalLightWrapper | undefined;
    if (isNotDefined(directionalLight)) throw new Error('Directional light not found');
    const directionalLightHelper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight.entity, 3);
    const directionalLightCameraHelper: CameraHelper = new CameraHelper(directionalLight.entity.shadow.camera);
    // eslint-disable-next-line functional/immutable-data
    directionalLight.entity.shadow.camera.near = 1;
    // eslint-disable-next-line functional/immutable-data
    directionalLight.entity.shadow.camera.far = 6;
    scene.entity.add(directionalLightHelper);
    scene.entity.add(directionalLightCameraHelper);
    const directionalFolder: GUI = gui.addFolder('Directional light');
    directionalFolder.add(directionalLight.entity.position, 'x').min(-50).max(50).step(0.5);
    directionalFolder.add(directionalLight.entity.position, 'y').min(-50).max(50).step(0.5);
    directionalFolder.add(directionalLight.entity.position, 'z').min(-50).max(50).step(0.5);
    directionalFolder.addColor(directionalLight.entity, 'color');
    directionalFolder.add(directionalLight.entity, 'intensity').min(0).max(10).step(0.1);
    directionalFolder.add(directionalLight.entity.shadow.camera, 'near').min(0).max(10).step(1);
    directionalFolder.add(directionalLight.entity.shadow.camera, 'far').min(0).max(10).step(1);
    directionalFolder.add(directionalLight.entity, 'castShadow');

    //hemisphere light
    const hemisphereLight: THemisphereLightWrapper | undefined = lightRegistry.findByTag('hemisphere') as THemisphereLightWrapper | undefined;
    if (isNotDefined(hemisphereLight)) throw new Error('Hemisphere light not found');
    const hemisphereLightHelper: HemisphereLightHelper = new HemisphereLightHelper(hemisphereLight.entity, 3);
    scene.entity.add(hemisphereLightHelper);
    const hemisphereFolder: GUI = gui.addFolder('Hemisphere light');
    hemisphereFolder.addColor(hemisphereLight.entity, 'color');
    hemisphereFolder.addColor(hemisphereLight.entity, 'groundColor');
    hemisphereFolder.add(hemisphereLight.entity, 'intensity').min(0).max(10).step(0.1);

    const rectAreaLight: TRectAreaLightWrapper | undefined = lightRegistry.findByTag('rect_area') as TRectAreaLightWrapper | undefined;
    if (isNotDefined(rectAreaLight)) throw new Error('Rect area light not found');
    const rectAreaLightHelper: RectAreaLightHelper = new RectAreaLightHelper(rectAreaLight.entity, 5);
    scene.entity.add(rectAreaLightHelper);
    const rectAreaFolder: GUI = gui.addFolder('RectArea light');
    rectAreaFolder.add(rectAreaLight.entity.position, 'x').min(-50).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity.position, 'y').min(-50).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity.position, 'z').min(-50).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity, 'width').min(0).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity, 'height').min(0).max(50).step(0.5);
    rectAreaFolder.add(rectAreaLight.entity, 'intensity').min(0).max(10).step(0.1);

    const pointLight: TPointLightWrapper | undefined = lightRegistry.findByTag('point') as TPointLightWrapper | undefined;
    if (isNotDefined(pointLight)) throw new Error('Point light not found');
    const pointLightHelper: PointLightHelper = new PointLightHelper(pointLight.entity, 3);
    scene.entity.add(pointLightHelper);
    const pointFolder: GUI = gui.addFolder('Point light');
    pointFolder.addColor(pointLight.entity, 'color');
    pointFolder.add(pointLight.entity.position, 'x').min(-50).max(50).step(0.5);
    pointFolder.add(pointLight.entity.position, 'y').min(-50).max(50).step(0.5);
    pointFolder.add(pointLight.entity.position, 'z').min(-50).max(50).step(0.5);
    pointFolder.add(pointLight.entity, 'intensity').min(0).max(100).step(0.1);
    pointFolder.add(pointLight.entity, 'distance').min(0).max(100).step(0.1);
    pointFolder.add(pointLight.entity, 'decay').min(0).max(100).step(0.1);
    pointFolder.add(pointLight.entity, 'castShadow');

    const spotLight: TSpotLightWrapper | undefined = lightRegistry.findByTag('spot') as TSpotLightWrapper | undefined;
    if (isNotDefined(spotLight)) throw new Error('Spot light not found');
    const spotLightHelper: SpotLightHelper = new SpotLightHelper(spotLight.entity, 3);
    scene.entity.add(spotLightHelper);
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
    engine.start();
    void init();
  }

  return { start, space };
}
