import './style.css';

import type { Subscription } from 'rxjs';

import { addBtn, addDropdown } from '@/App/Levels/Utils';
import type { TModel3d, TRegistryPack, TSpace, TSpaceConfig, TSpaceRegistry } from '@/Engine';
import { isNotDefined, spaceService } from '@/Engine';

import space from './spaceBasic.json';
import spaceCustomModels from './spaceCustomModels.json';
import spaceTexts from './spaceTexts.json';
import type { TSpacesData } from './utils';
import { createContainersDivs, setContainerVisibility } from './utils';

const spaceBasicConfig: TSpaceConfig = space as TSpaceConfig;
const spaceCustomModelsConfig: TSpaceConfig = spaceCustomModels as TSpaceConfig;
const spaceTextsConfig: TSpaceConfig = spaceTexts as TSpaceConfig;

const getContainer = (canvasSelector: string): string => canvasSelector.split('#')[1].trim();

const subscriptions: Record<string, Subscription> = {};

const spacesData: ReadonlyArray<TSpacesData> = [
  {
    name: spaceBasicConfig.name,
    config: spaceBasicConfig,
    container: getContainer(spaceBasicConfig.canvasSelector),
    onCreate: (space: TSpace): void => {
      const sub$: Subscription = space.services.models3dService.getRegistry().added$.subscribe(({ value: model3dSource }: TRegistryPack<TModel3d>): void => {
        if (model3dSource.name === 'surface_model') space.services.scenesService.findActive()?.addModel3d(model3dSource);
      });
      // eslint-disable-next-line functional/immutable-data
      subscriptions[spaceCustomModelsConfig.name] = sub$;
    },
    onChange: (space: TSpace): void => {
      space.services.actorService.getRegistry().findByName('sphere_actor')?.drive.default.setX(10);
    },
    onUnload: (): void => {
      subscriptions[spaceCustomModelsConfig.name].unsubscribe();
    }
  },
  {
    name: spaceCustomModelsConfig.name,
    config: spaceCustomModelsConfig,
    container: getContainer(spaceCustomModelsConfig.canvasSelector),
    onCreate: (space: TSpace): void => {
      const sub$: Subscription = space.services.models3dService.getRegistry().added$.subscribe(({ value: model3dSource }: TRegistryPack<TModel3d>): void => {
        space.services.scenesService.findActive()?.addModel3d(model3dSource);
      });
      // eslint-disable-next-line functional/immutable-data
      subscriptions[spaceCustomModelsConfig.name] = sub$;
    },
    onChange: (space: TSpace): void => {
      const model3d: TModel3d | undefined = space.services.models3dService.getRegistry().findByName('fox_glb_config_original');
      if (isNotDefined(model3d)) throw new Error(`[Showcase]: Model3d is not found`);
      // eslint-disable-next-line functional/immutable-data
      model3d.getRawModel3d().position.x += 10;
      // eslint-disable-next-line functional/immutable-data
      model3d.getRawModel3d().rotation.y = 1.57;
    },
    onUnload: (): void => {
      subscriptions[spaceCustomModelsConfig.name].unsubscribe();
    }
  },
  { name: spaceTextsConfig.name, config: spaceTextsConfig, container: getContainer(spaceTextsConfig.canvasSelector) }
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

  loadSpace(spaceBasicConfig.name);
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
  if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot destroy the space "${name}"`);
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

  // eslint-disable-next-line functional/immutable-data
  spacesInMemoryData[index > -1 ? index : 0] = {
    name: space.name,
    config,
    container: config.canvasSelector,
    onCreate: spacesData.find((s: TSpacesData): boolean => s.name === name)?.onCreate,
    onChange: spacesData.find((s: TSpacesData): boolean => s.name === name)?.onChange,
    onUnload: spacesData.find((s: TSpacesData): boolean => s.name === name)?.onUnload
  };
}

function loadSpaceConfigFromMemory(name: string | undefined, spaceRegistry: TSpaceRegistry): void {
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
  addBtn(`Save`, containerId, (): void => {
    saveSpaceConfigInMemory(currentSpaceName, spaceRegistry);
  });
  addBtn(`Drop`, containerId, (): void => unloadSpace(currentSpaceName, spaceRegistry));
  addBtn(`Load`, containerId, (): void => {
    loadSpaceConfigFromMemory(currentSpaceName, spaceRegistry);
  });
}
