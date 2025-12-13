import '@public/Showcase/fonts.css';
import './style.css';

import type { Subscription } from 'rxjs';

import { spaceBasicData } from '@/App/Levels/Showcase29SaveLoad/spaceBasic/spaceBasic';
import { spaceCameraData } from '@/App/Levels/Showcase29SaveLoad/spaceCamera';
import { spaceCustomModelsData } from '@/App/Levels/Showcase29SaveLoad/spaceCustomModels';
import { spaceLightData } from '@/App/Levels/Showcase29SaveLoad/spaceLight/spaceLight';
import { spaceMaterialsData } from '@/App/Levels/Showcase29SaveLoad/spaceMaterials';
import { spaceTextData } from '@/App/Levels/Showcase29SaveLoad/spaceTexts';
import { addBtn, addDropdown } from '@/App/Levels/Utils';
import type { TSpace, TSpaceConfig, TSpaceRegistry } from '@/Engine';
import { isNotDefined, spaceService } from '@/Engine';

import type { TSpacesData } from './ShowcaseTypes';
import { createContainersDivs, setContainerVisibility } from './utils';

const subscriptions: Record<string, Subscription> = {};

// TODO 15-0-0: E2E: OrbitControls
// TODO 15-0-0: E2E: FpsControls
// TODO 15-0-0: E2E: FpsControls
// TODO 15-0-0: E2E: Fog
// TODO 15-0-0: E2E: Intersections
// TODO 15-0-0: E2E: Particles
// TODO 15-0-0: E2E: Physics
// TODO 15-0-0: E2E: Actors with models
// TODO 15-0-0: E2E: Actors with FSM
// TODO 15-0-0: E2E: TransformDrive (default, connected, physics, kinematic)
// TODO 15-0-0: E2E: Animations (state, progress, etc)
// TODO 15-0-0: E2E: Complex scene (similar to Showcase22PhysicsShooter)

// TODO 15-0-0: E2E: Perhaps serialization should return promise (cause it feels kinda async)
const spacesData: ReadonlyArray<TSpacesData> = [spaceBasicData, spaceCustomModelsData, spaceTextData, spaceCameraData, spaceLightData, spaceMaterialsData];

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
  loadSpace(spacesData.find((s: TSpacesData): boolean => s.name === spaceBasicData.name)?.name);
}

function loadSpace(name: string | undefined): void {
  if (isNotDefined(name)) return;
  const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);

  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceData.config]);
  const space: TSpace = spaces.find((s: TSpace): boolean => s.name === name) as TSpace;
  if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot create the space "${name}"`);

  currentSpaceName = space.name;
  spaceData.onCreate?.(space, subscriptions);
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
  spaceData.onUnload?.(space, subscriptions);
  space.drop();
}

function saveSpaceConfigInMemory(name: string | undefined, spaceRegistry: TSpaceRegistry): void {
  if (isNotDefined(name)) return;
  const space: TSpace | undefined = spaceRegistry.findByName(name);
  if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot save the space "${name}"`);

  const index: number = spacesInMemoryData.findIndex((s: TSpacesData): boolean => s.name === name);
  const config: TSpaceConfig = space.serialize();

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
  spaceData.onCreate?.(space, subscriptions);
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

    spaceData.onChange?.(space, subscriptions);
  });
  addBtn(`Save`, containerId, (): void => saveSpaceConfigInMemory(currentSpaceName, spaceRegistry));
  addBtn(`Drop`, containerId, (): void => unloadSpace(currentSpaceName, spaceRegistry));

  // TODO: enable to check false positive screenshot compare
  // addBtn(`Load`, containerId, (): void => loadSpace(currentSpaceName));
  addBtn(`Load`, containerId, (): void => loadSpaceConfigFromMemory(currentSpaceName));
}
