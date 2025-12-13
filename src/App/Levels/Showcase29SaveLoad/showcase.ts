import '@public/Showcase/fonts.css';
import './style.css';

import type { Subscription } from 'rxjs';

import { spaceActorData } from '@/App/Levels/Showcase29SaveLoad/spaceActor';
import { spaceAnimationsData } from '@/App/Levels/Showcase29SaveLoad/spaceAnimations';
import { spaceBasicData } from '@/App/Levels/Showcase29SaveLoad/spaceBasic';
import { spaceCameraData } from '@/App/Levels/Showcase29SaveLoad/spaceCamera';
import { spaceCustomModelsData } from '@/App/Levels/Showcase29SaveLoad/spaceCustomModels';
import { spaceFpsControlsData } from '@/App/Levels/Showcase29SaveLoad/spaceFpsControls';
import { spaceLightData } from '@/App/Levels/Showcase29SaveLoad/spaceLight/spaceLight';
import { spaceMaterialsData } from '@/App/Levels/Showcase29SaveLoad/spaceMaterials';
import { spaceOrbitControlsData } from '@/App/Levels/Showcase29SaveLoad/spaceOrbitControls';
import { spaceParticlesData } from '@/App/Levels/Showcase29SaveLoad/spaceParticles';
import { spaceTextData } from '@/App/Levels/Showcase29SaveLoad/spaceTexts';
import { spaceTransformDriveData } from '@/App/Levels/Showcase29SaveLoad/spaceTransformDrive';
import { addBtn, addDropdown } from '@/App/Levels/Utils';
import type { TSpace, TSpaceConfig, TSpaceRegistry } from '@/Engine';
import { isNotDefined, spaceService } from '@/Engine';

import type { TSpacesData } from './ShowcaseTypes';
import { createContainersDivs, setContainerVisibility } from './utils';

let subscriptions: Record<string, Subscription> = {};

// TODO 15-0-0: E2E: Fog
// TODO 15-0-0: E2E: Audio3d (with debug renderer)
// TODO 15-0-0: E2E: Physics
// TODO 15-0-0: E2E: Spatial
// TODO 15-0-0: E2E: Intersections
// TODO 15-0-0: E2E: Complex scene (similar to Showcase22PhysicsShooter)
// TODO 15-0-0: Physics sync test has an issue: camera doesn't follow an actor (perhaps related to TransformDrive)

// TODO 15-0-0: E2E: Perhaps serialization should return promise (cause it feels kinda async)
const spacesData: ReadonlyArray<TSpacesData> = [
  spaceActorData,
  spaceAnimationsData,
  spaceBasicData,
  spaceCameraData,
  spaceCustomModelsData,
  spaceFpsControlsData,
  spaceLightData,
  spaceMaterialsData,
  spaceOrbitControlsData,
  spaceParticlesData,
  spaceTextData,
  spaceTransformDriveData
];

// const initialSpaceDataName: string = spaceBasicData.name;
const initialSpaceDataName: string = spaceParticlesData.name;

const spacesInMemoryData: Array<TSpacesData> = [];

let currentSpaceName: string | undefined;

//Flags for E2E tests
// eslint-disable-next-line functional/immutable-data
(window as any)._isReady = false;

export function start(): void {
  createContainersDivs(spacesData);

  createForm(
    undefined,
    true,
    true,
    spacesData.map((space: TSpacesData): string => space.name)
  );

  loadSpace(spacesData.find((s: TSpacesData): boolean => s.name === initialSpaceDataName)?.name, spacesData);
}

function loadSpace(name: string | undefined, source: ReadonlyArray<TSpacesData>): void {
  setSpaceReady(false);
  if (isNotDefined(name)) throw new Error('[Showcase]: Space name is not defined');
  const spaceData: TSpacesData | undefined = source.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);

  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceData.config]);
  const space: TSpace = spaces.find((s: TSpace): boolean => s.name === name) as TSpace;
  if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot create the space "${name}"`);

  // eslint-disable-next-line functional/immutable-data
  subscriptions[`built$_${space.name}`] = space.built$.subscribe((): void => {
    spaceData.onSpaceReady?.(space, subscriptions);
    spaceData.onCreate?.(space, subscriptions);
  });

  // eslint-disable-next-line functional/immutable-data
  subscriptions[`serializationInProgress$_${space.name}`] = space.serializationInProgress$.subscribe((isInProgress: boolean): void => setSpaceReady(!isInProgress));

  // eslint-disable-next-line functional/immutable-data, functional/prefer-tacit
  subscriptions[`start$_${space.name}`] = space.start$.subscribe((isStarted: boolean): void => setSpaceReady(isStarted));

  // eslint-disable-next-line functional/immutable-data
  subscriptions[`awaits$_${space.name}`] = spaceData.awaits$.subscribe((awaitsSet: ReadonlySet<string>): void => {
    // eslint-disable-next-line functional/immutable-data
    (window as any)._isReady = awaitsSet.size === 0;
  });

  currentSpaceName = space.name;
  space.start$.next(true);
  setContainerVisibility(name, true, spacesData);
}

function unloadSpace(name: string | undefined, spaceRegistry: TSpaceRegistry): void {
  if (isNotDefined(name)) return;
  const space: TSpace | undefined = spaceRegistry.findByName(name);
  if (isNotDefined(space)) return;
  setContainerVisibility(name, false, spacesData);

  const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === name);
  Object.values(subscriptions).forEach((sub: Subscription): void => sub.unsubscribe());
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);
  spaceData.onUnload?.(space, subscriptions);

  setSpaceReady(false);
  subscriptions = {};
  space.drop();
}

function saveSpaceConfigInMemory(name: string | undefined, spaceRegistry: TSpaceRegistry): void {
  if (isNotDefined(name)) return;
  const space: TSpace = spaceRegistry.getByName(name);

  const index: number = spacesInMemoryData.findIndex((s: TSpacesData): boolean => s.name === name);
  const config: TSpaceConfig = space.serialize();

  console.log('[Serialized data]:', config);

  const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);
  const { onSpaceReady, onChange, onUnload, onCreate, awaits$ } = spaceData;

  // eslint-disable-next-line functional/immutable-data
  spacesInMemoryData[index > -1 ? index : 0] = {
    name: space.name,
    config,
    container: config.canvasSelector,
    awaits$,
    onCreate,
    onSpaceReady,
    onChange,
    onUnload
  };
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
      loadSpace(name, spacesData);
    },
    options,
    initialSpaceDataName,
    { right, top }
  );

  addBtn(`Change`, containerId, (): void => {
    if (isNotDefined(currentSpaceName)) return;

    const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === currentSpaceName);
    if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${currentSpaceName}"`);

    const space: TSpace = spaceRegistry.getByName(currentSpaceName);

    setSpaceReady(false);
    spaceData.onChange?.(space, subscriptions);
    setSpaceReady(true);
  });
  addBtn(`Save`, containerId, (): void => saveSpaceConfigInMemory(currentSpaceName, spaceRegistry));
  addBtn(`Drop`, containerId, (): void => unloadSpace(currentSpaceName, spaceRegistry));

  // TODO: enable to check false positive screenshot compare
  // addBtn(`Load`, containerId, (): void => loadSpace(currentSpaceName));
  addBtn(`Load`, containerId, (): void => loadSpace(currentSpaceName, spacesInMemoryData));
}

function setSpaceReady(isReady: boolean): void | never {
  toggleClass(isReady, 'ready');
}

function toggleClass(isSet: boolean, className: string, selector: string = 'body'): void | never {
  const elem: Element | null = document.querySelector(selector);
  if (!elem) throw new Error(`[Showcase]: Element "body" is not found`);

  if (isSet && !elem.classList.contains(className)) elem.classList.add(className);
  if (!isSet && elem.classList.contains(className)) elem.classList.remove(className);
}
