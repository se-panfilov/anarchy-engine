import '@Public/resources/fonts.css';
import './style.css';

import type { TSpace, TSpaceConfig, TSpaceRegistry } from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';

import { spaceActorData } from '@/Levels/Showcase27SaveLoad/spaceActor';
import { spaceAnimationsData } from '@/Levels/Showcase27SaveLoad/spaceAnimations';
import { spaceAudioData } from '@/Levels/Showcase27SaveLoad/spaceAudio';
import { spaceBasicData } from '@/Levels/Showcase27SaveLoad/spaceBasic';
import { spaceCameraData } from '@/Levels/Showcase27SaveLoad/spaceCamera';
import { spaceCustomModelsData } from '@/Levels/Showcase27SaveLoad/spaceCustomModels';
import { spaceFogData } from '@/Levels/Showcase27SaveLoad/spaceFog';
import { spaceFpsControlsData } from '@/Levels/Showcase27SaveLoad/spaceFpsControls';
import { spaceIntersectionsData } from '@/Levels/Showcase27SaveLoad/spaceIntersections';
import { spaceLightData } from '@/Levels/Showcase27SaveLoad/spaceLight/spaceLight';
import { spaceMaterialsData } from '@/Levels/Showcase27SaveLoad/spaceMaterials';
import { spaceOrbitControlsData } from '@/Levels/Showcase27SaveLoad/spaceOrbitControls';
import { spaceParticlesData } from '@/Levels/Showcase27SaveLoad/spaceParticles';
import { spacePhysicsData } from '@/Levels/Showcase27SaveLoad/spacePhysics';
import { spaceSpatialData } from '@/Levels/Showcase27SaveLoad/spaceSpatial';
import { spaceTextData } from '@/Levels/Showcase27SaveLoad/spaceTexts';
import { spaceTransformDriveData } from '@/Levels/Showcase27SaveLoad/spaceTransformDrive';
import type { TAppSettings } from '@/Models';
import { addBtn, addDropdown, enableFPSCounter, watchActiveRendererReady, watchResourceLoading } from '@/Utils';

import type { TSpacesData } from './ShowcaseTypes';
import { createContainersDivs, setContainerVisibility } from './utils';

let subscriptions: Record<string, Subscription> = {};

const spacesData: ReadonlyArray<TSpacesData> = [
  spaceActorData,
  spaceAnimationsData,
  spaceAudioData,
  spaceBasicData,
  spaceCameraData,
  spaceCustomModelsData,
  spaceFogData,
  spaceFpsControlsData,
  spaceIntersectionsData,
  spaceLightData,
  spaceMaterialsData,
  spaceOrbitControlsData,
  spaceParticlesData,
  spacePhysicsData,
  spaceSpatialData,
  spaceTextData,
  spaceTransformDriveData
];

const initialSpaceDataName: string = spaceBasicData.name;

const spacesInMemoryData: Array<TSpacesData> = [];

let currentSpaceName: string | undefined;

//Flags for E2E tests
// eslint-disable-next-line functional/immutable-data
(window as any)._isReady = false;
// eslint-disable-next-line functional/immutable-data
(window as any)._isRendererReady = false;

export function start(settings: TAppSettings): void {
  createContainersDivs(spacesData);

  createForm(
    undefined,
    true,
    true,
    spacesData.map((space: TSpacesData): string => space.name),
    settings
  );

  loadSpace(spacesData.find((s: TSpacesData): boolean => s.name === initialSpaceDataName)?.name, spacesData, settings);
}

function loadSpace(name: string | undefined, source: ReadonlyArray<TSpacesData>, settings: TAppSettings): void {
  setSpaceReady(false);
  // eslint-disable-next-line functional/immutable-data
  (window as any)._isRendererReady = false;
  if (isNotDefined(name)) throw new Error('[APP] Space name is not defined');
  const spaceData: TSpacesData | undefined = source.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[APP] Space data is not found for space "${name}"`);

  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceData.config], settings.spaceSettings);
  const space: TSpace = spaces.find((s: TSpace): boolean => s.name === name) as TSpace;
  if (isNotDefined(space)) throw new Error(`[APP] Cannot create the space "${name}"`);
  watchResourceLoading(space);

  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  // eslint-disable-next-line functional/immutable-data
  subscriptions[`built$_${space.name}`] = space.built$.subscribe((): void => {
    watchActiveRendererReady(space);
    spaceData.onSpaceReady?.(space, subscriptions);
    spaceData.onCreate?.(space, subscriptions);

    // eslint-disable-next-line functional/immutable-data
    subscriptions[`isRendererReady$${space.name}`] = space.services.rendererService.getActive().isRendererReady$.subscribe((value: boolean): void => {
      if (value) subscriptions[`isRendererReady$${space.name}`].unsubscribe();
      // eslint-disable-next-line functional/immutable-data
      (window as any)._isRendererReady = value;
    });
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
  if (isNotDefined(spaceData)) throw new Error(`[APP] Space data is not found for space "${name}"`);
  spaceData.onUnload?.(space, subscriptions);

  setSpaceReady(false);
  // eslint-disable-next-line functional/immutable-data
  (window as any)._isRendererReady = false;
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
  if (isNotDefined(spaceData)) throw new Error(`[APP] Space data is not found for space "${name}"`);
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

export function createForm(containerId: string | undefined, isTop: boolean, isRight: boolean, options: ReadonlyArray<string>, settings: TAppSettings): void {
  const top: string | undefined = isTop ? undefined : 'calc(50% + 14px)';
  const right: string | undefined = !isRight ? 'calc(50% + 14px)' : '4px';
  const spaceRegistry: TSpaceRegistry = spaceService.getRegistry();

  addDropdown(
    'Spaces',
    containerId,
    (name: string): void => {
      unloadSpace(currentSpaceName, spaceRegistry);
      loadSpace(name, spacesData, settings);
    },
    options,
    initialSpaceDataName,
    { right, top }
  );

  addBtn(`Change`, containerId, (): void => {
    if (isNotDefined(currentSpaceName)) return;

    const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === currentSpaceName);
    if (isNotDefined(spaceData)) throw new Error(`[APP] Space data is not found for space "${currentSpaceName}"`);

    const space: TSpace = spaceRegistry.getByName(currentSpaceName);

    setSpaceReady(false);
    spaceData.onChange?.(space, subscriptions);
    setSpaceReady(true);
  });
  addBtn(`Save`, containerId, (): void => saveSpaceConfigInMemory(currentSpaceName, spaceRegistry));
  addBtn(`Drop`, containerId, (): void => unloadSpace(currentSpaceName, spaceRegistry));

  // TODO: enable to check false positive screenshot compare
  // addBtn(`Load`, containerId, (): void => loadSpace(currentSpaceName));
  addBtn(`Load`, containerId, (): void => loadSpace(currentSpaceName, spacesInMemoryData, settings));
}

function setSpaceReady(isReady: boolean): void | never {
  toggleClass(isReady, 'ready');
}

function toggleClass(isSet: boolean, className: string, selector: string = 'body'): void | never {
  const elem: Element | null = document.querySelector(selector);
  if (!elem) throw new Error(`[APP] Element "body" is not found`);

  if (isSet && !elem.classList.contains(className)) elem.classList.add(className);
  if (!isSet && elem.classList.contains(className)) elem.classList.remove(className);
}
