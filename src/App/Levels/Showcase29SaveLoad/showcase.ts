import '@public/Showcase/fonts.css';
import './style.css';

import type { Subscription } from 'rxjs';
import type { HemisphereLight, PointLight, SpotLight } from 'three';
import { Color, Euler, Quaternion, Vector3 } from 'three';

import { addBtn, addDropdown } from '@/App/Levels/Utils';
import type { TCameraWrapper, THemisphereLightWrapper, TModel3d, TPointLightWrapper, TRegistryPack, TSpace, TSpaceConfig, TSpaceRegistry, TSpotLightWrapper, TWriteable } from '@/Engine';
import { isNotDefined, spaceService } from '@/Engine';

import spaceBasicConfig from './spaceBasic.json';
import spaceCameraConfig from './spaceCamera.json';
import spaceCustomModelsConfig from './spaceCustomModels.json';
import spaceLightConfig from './spaceLight.json';
import spaceTextsConfig from './spaceTexts.json';
import type { TSpacesData } from './utils';
import { changeText, createContainersDivs, setContainerVisibility } from './utils';

const basicCase: TSpaceConfig = spaceBasicConfig as TSpaceConfig;
const customModelsCase: TSpaceConfig = spaceCustomModelsConfig as TSpaceConfig;
const textsCase: TSpaceConfig = spaceTextsConfig as TSpaceConfig;
const cameraCase: TSpaceConfig = spaceCameraConfig as TSpaceConfig;
const lightCase: TSpaceConfig = spaceLightConfig as TSpaceConfig;

const getContainer = (canvasSelector: string): string => canvasSelector.split('#')[1].trim();

const subscriptions: Record<string, Subscription> = {};

// TODO 15-0-0: E2E: OrbitControls
// TODO 15-0-0: E2E: FpsControls
// TODO 15-0-0: E2E: FpsControls
// TODO 15-0-0: E2E: Materials
// TODO 15-0-0: E2E: Light
// TODO 15-0-0: E2E: Fog
// TODO 15-0-0: E2E: Intersections
// TODO 15-0-0: E2E: Particles
// TODO 15-0-0: E2E: Physics
// TODO 15-0-0: E2E: Actors with models
// TODO 15-0-0: E2E: Actors with FSM
// TODO 15-0-0: E2E: TransformDrive (default, connected, physics, kinematic)
// TODO 15-0-0: E2E: Animations (state, progress, etc)
// TODO 15-0-0: E2E: Complex scene (similar to Showcase22PhysicsShooter)
const spacesData: ReadonlyArray<TSpacesData> = [
  {
    name: basicCase.name,
    config: basicCase,
    container: getContainer(basicCase.canvasSelector),
    onCreate: (space: TSpace): void => {
      const sub$: Subscription = space.services.models3dService.getRegistry().added$.subscribe(({ value: model3dSource }: TRegistryPack<TModel3d>): void => {
        if (model3dSource.name === 'surface_model') space.services.scenesService.findActive()?.addModel3d(model3dSource);
      });
      // eslint-disable-next-line functional/immutable-data
      subscriptions[customModelsCase.name] = sub$;
    },
    onChange: (space: TSpace): void => {
      space.services.actorService.getRegistry().findByName('sphere_actor')?.drive.default.setX(10);
    },
    onUnload: (): void => {
      subscriptions[customModelsCase.name].unsubscribe();
    }
  },
  {
    name: customModelsCase.name,
    config: customModelsCase,
    container: getContainer(customModelsCase.canvasSelector),
    onCreate: (space: TSpace): void => {
      const sub$: Subscription = space.services.models3dService.getRegistry().added$.subscribe(({ value: model3dSource }: TRegistryPack<TModel3d>): void => {
        space.services.scenesService.findActive()?.addModel3d(model3dSource);
      });
      // eslint-disable-next-line functional/immutable-data
      subscriptions[customModelsCase.name] = sub$;
    },
    onChange: (space: TSpace): void => {
      const model3d: TModel3d | undefined = space.services.models3dService.getRegistry().findByName('fox_glb_config_original');
      if (isNotDefined(model3d)) throw new Error(`[Showcase]: Model3d is not found`);
      // eslint-disable-next-line functional/immutable-data
      model3d.getRawModel3d().position.x += 5;
      // eslint-disable-next-line functional/immutable-data
      model3d.getRawModel3d().rotation.y = 1.57;
    },
    onUnload: (): void => {
      subscriptions[customModelsCase.name].unsubscribe();
    }
  },
  {
    name: textsCase.name,
    config: textsCase,
    container: getContainer(textsCase.canvasSelector),
    onChange: (space: TSpace): void => {
      const { text2dRegistry, text3dRegistry, text3dTextureRegistry } = space.services.textService.getRegistries();
      changeText('text_2d', text2dRegistry);
      changeText('text_3d_1', text3dRegistry);
      changeText('text_3d_2', text3dTextureRegistry);
    }
  },
  {
    name: cameraCase.name,
    config: cameraCase,
    container: getContainer(cameraCase.canvasSelector),
    onChange: (space: TSpace): void => {
      const camera: TCameraWrapper | undefined = space.services.cameraService.findActive();
      if (isNotDefined(camera)) throw new Error(`[Showcase]: Camera is not found`);

      camera.setFov(100);

      const rotation: Euler = new Euler(-2.879975303042544, 0.8041367970357067, 2.951086186540901);
      camera.drive.rotation$.next(new Quaternion().setFromEuler(rotation));
      camera.drive.position$.next(new Vector3(28.672614163776107, 6.92408866503931, -27.63943185331239));
    }
  },
  {
    name: lightCase.name,
    config: lightCase,
    container: getContainer(lightCase.canvasSelector),
    onChange: (space: TSpace): void => {
      const hemisphere: THemisphereLightWrapper = space.services.lightService.getRegistry().findByName('hemisphere_light') as THemisphereLightWrapper;
      const pointLight: TPointLightWrapper = space.services.lightService.getRegistry().findByName('point_light') as TPointLightWrapper;
      const spotlight: TSpotLightWrapper = space.services.lightService.getRegistry().findByName('spot_light') as TSpotLightWrapper;

      // eslint-disable-next-line functional/immutable-data
      (hemisphere.entity as TWriteable<HemisphereLight>).color = new Color('#2121AB');
      // eslint-disable-next-line functional/immutable-data
      (hemisphere.entity as TWriteable<HemisphereLight>).intensity = 1.1;

      pointLight.drive.position$.next(new Vector3(4, 15.5, 2.5));
      // eslint-disable-next-line functional/immutable-data
      (pointLight.entity as TWriteable<PointLight>).intensity = 16;
      // eslint-disable-next-line functional/immutable-data
      pointLight.entity.shadow.camera.far = 25;

      spotlight.drive.position$.next(new Vector3(4, 1.5, 2.5));
      // eslint-disable-next-line functional/immutable-data
      (spotlight.entity as TWriteable<SpotLight>).intensity = 5;
      // eslint-disable-next-line functional/immutable-data
      (spotlight.entity as TWriteable<SpotLight>).angle = 28.8;
    }
  }
];

const spacesInMemoryData: Array<TSpacesData> = [];

let currentSpaceName: string | undefined;

export function start(): void {
  createContainersDivs(spacesData);

  createForm(
    undefined,
    true,
    true,
    spacesData.map((space: TSpacesData): string => space.name)
  );

  //Initial space
  // loadSpace(basicCase.name);
  loadSpace(lightCase.name);
}

function loadSpace(name: string): void {
  const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);

  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceData.config]);
  const space: TSpace = spaces.find((s: TSpace): boolean => s.name === name) as TSpace;
  if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot create the space "${name}"`);

  currentSpaceName = space.name;
  spaceData.onCreate?.(space);
  space.start$.next(true);
  setContainerVisibility(name, true, spacesData);
}

function unloadSpace(name: string | undefined, spaceRegistry: TSpaceRegistry): void {
  if (isNotDefined(name)) return;
  const space: TSpace | undefined = spaceRegistry.findByName(name);
  if (isNotDefined(space)) return;
  setContainerVisibility(name, false, spacesData);

  const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);
  spaceData.onUnload?.(space);
  space.drop();
}

function saveSpaceConfigInMemory(name: string | undefined, spaceRegistry: TSpaceRegistry): void {
  if (isNotDefined(name)) return;
  const space: TSpace | undefined = spaceRegistry.findByName(name);
  if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot save the space "${name}"`);

  const index: number = spacesInMemoryData.findIndex((s: TSpacesData): boolean => s.name === name);
  const config: TSpaceConfig = space.serialize();

  console.log('XXXconfig', config);

  const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);
  const { onCreate, onChange, onUnload } = spaceData;

  // eslint-disable-next-line functional/immutable-data
  spacesInMemoryData[index > -1 ? index : 0] = {
    name: space.name,
    config,
    container: config.canvasSelector,
    onCreate,
    onChange,
    onUnload
  };
}

function loadSpaceConfigFromMemory(name: string | undefined): void {
  if (isNotDefined(name)) return;
  const spaceData: TSpacesData | undefined = spacesInMemoryData.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);

  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceData.config]);
  const space: TSpace = spaces.find((s: TSpace): boolean => s.name === name) as TSpace;
  if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot create the space "${name}"`);

  currentSpaceName = space.name;
  spaceData.onCreate?.(space);
  space.start$.next(true);
  setContainerVisibility(name, true, spacesData);
}

export function createForm(containerId: string | undefined, isTop: boolean, isRight: boolean, options: ReadonlyArray<string>): void {
  const top: string | undefined = isTop ? undefined : 'calc(50% + 14px)';
  const right: string | undefined = !isRight ? 'calc(50% + 14px)' : '4px';
  const spaceRegistry: TSpaceRegistry = spaceService.getRegistry();

  addDropdown(
    'Spaces',
    containerId,
    (name: string): void => {
      unloadSpace(currentSpaceName, spaceRegistry);
      loadSpace(name);
    },
    options,
    { right, top }
  );

  addBtn(`Change`, containerId, (): void => {
    if (isNotDefined(currentSpaceName)) return;

    const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === currentSpaceName);
    if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${currentSpaceName}"`);

    const space: TSpace | undefined = spaceRegistry.findByName(currentSpaceName);
    if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot find the space "${currentSpaceName}"`);

    spaceData.onChange?.(space);
  });
  addBtn(`Save`, containerId, (): void => saveSpaceConfigInMemory(currentSpaceName, spaceRegistry));
  addBtn(`Drop`, containerId, (): void => unloadSpace(currentSpaceName, spaceRegistry));

  // TODO: enable to check false positive screenshot compare
  // addBtn(`Load`, containerId, (): void => loadSpace(currentSpaceName));
  addBtn(`Load`, containerId, (): void => loadSpaceConfigFromMemory(currentSpaceName));
}
