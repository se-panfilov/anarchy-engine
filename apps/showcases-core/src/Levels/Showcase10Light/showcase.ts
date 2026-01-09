import type {
  TDirectionalLightWrapper,
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
} from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import GUI from 'lil-gui';
import { CameraHelper, DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter, watchActiveRendererReady, watchResourceLoading } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  watchResourceLoading(space);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  watchActiveRendererReady(space);
  const gui: GUI = new GUI();

  const { lightService, scenesService, models3dService } = space.services;

  const lightRegistry: TLightRegistry = lightService.getRegistry();
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const planeModel3d: TModel3d = models3dRegistry.getByName('surface_model');
  const sceneW: TSceneWrapper = scenesService.getActive();
  sceneW.addModel3d(planeModel3d);

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  //directional light
  const directionalLight: TDirectionalLightWrapper = lightRegistry.getByTag('directional') as TDirectionalLightWrapper;
  const directionalLightHelper: DirectionalLightHelper = new DirectionalLightHelper(directionalLight.entity, 3);
  const directionalLightCameraHelper: CameraHelper = new CameraHelper(directionalLight.entity.shadow.camera);
  // eslint-disable-next-line functional/immutable-data
  directionalLight.entity.shadow.camera.near = 1;
  // eslint-disable-next-line functional/immutable-data
  directionalLight.entity.shadow.camera.far = 6;
  sceneW.entity.add(directionalLightHelper);
  sceneW.entity.add(directionalLightCameraHelper);
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
  const hemisphereLight: THemisphereLightWrapper = lightRegistry.getByTag('hemisphere') as THemisphereLightWrapper;
  const hemisphereLightHelper: HemisphereLightHelper = new HemisphereLightHelper(hemisphereLight.entity, 3);
  sceneW.entity.add(hemisphereLightHelper);
  const hemisphereFolder: GUI = gui.addFolder('Hemisphere light');
  hemisphereFolder.addColor(hemisphereLight.entity, 'color');
  hemisphereFolder.addColor(hemisphereLight.entity, 'groundColor');
  hemisphereFolder.add(hemisphereLight.entity, 'intensity').min(0).max(10).step(0.1);

  const rectAreaLight: TRectAreaLightWrapper = lightRegistry.getByTag('rect_area') as TRectAreaLightWrapper;
  const rectAreaLightHelper: RectAreaLightHelper = new RectAreaLightHelper(rectAreaLight.entity, 5);
  sceneW.entity.add(rectAreaLightHelper);
  const rectAreaFolder: GUI = gui.addFolder('RectArea light');
  rectAreaFolder.add(rectAreaLight.entity.position, 'x').min(-50).max(50).step(0.5);
  rectAreaFolder.add(rectAreaLight.entity.position, 'y').min(-50).max(50).step(0.5);
  rectAreaFolder.add(rectAreaLight.entity.position, 'z').min(-50).max(50).step(0.5);
  rectAreaFolder.add(rectAreaLight.entity, 'width').min(0).max(50).step(0.5);
  rectAreaFolder.add(rectAreaLight.entity, 'height').min(0).max(50).step(0.5);
  rectAreaFolder.add(rectAreaLight.entity, 'intensity').min(0).max(10).step(0.1);

  const pointLight: TPointLightWrapper = lightRegistry.getByTag('point') as TPointLightWrapper;
  const pointLightHelper: PointLightHelper = new PointLightHelper(pointLight.entity, 3);
  sceneW.entity.add(pointLightHelper);
  const pointFolder: GUI = gui.addFolder('Point light');
  pointFolder.addColor(pointLight.entity, 'color');
  pointFolder.add(pointLight.entity.position, 'x').min(-50).max(50).step(0.5);
  pointFolder.add(pointLight.entity.position, 'y').min(-50).max(50).step(0.5);
  pointFolder.add(pointLight.entity.position, 'z').min(-50).max(50).step(0.5);
  pointFolder.add(pointLight.entity, 'intensity').min(0).max(100).step(0.1);
  pointFolder.add(pointLight.entity, 'distance').min(0).max(100).step(0.1);
  pointFolder.add(pointLight.entity, 'decay').min(0).max(100).step(0.1);
  pointFolder.add(pointLight.entity, 'castShadow');

  const spotLight: TSpotLightWrapper = lightRegistry.getByTag('spot') as TSpotLightWrapper;
  const spotLightHelper: SpotLightHelper = new SpotLightHelper(spotLight.entity, 3);
  sceneW.entity.add(spotLightHelper);
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

  space.start$.next(true);
}
