import './style.css';

import { addDropdown } from '@/App/Levels/Utils';
import type { TModel3d, TRegistryPack, TSpace, TSpaceConfig, TSpaceRegistry } from '@/Engine';
import { createDomElement, isNotDefined, spaceService } from '@/Engine';

import space from './space.json';
import spaceCustomModels from './spaceCustomModels.json';
import spaceTexts from './spaceTexts.json';

const spaceBasicConfig: TSpaceConfig = space as TSpaceConfig;
const spaceCustomModelsConfig: TSpaceConfig = spaceCustomModels as TSpaceConfig;
const spaceTextsConfig: TSpaceConfig = spaceTexts as TSpaceConfig;

const getContainer = (canvasSelector: string): string => canvasSelector.split('#')[1].trim();

type TSpacesData = Readonly<{ name: string; config: TSpaceConfig; container: string; init?: (space: TSpace) => void }>;

const spacesData: ReadonlyArray<TSpacesData> = [
  { name: spaceBasicConfig.name, config: spaceBasicConfig, container: getContainer(spaceBasicConfig.canvasSelector) },
  {
    name: spaceCustomModelsConfig.name,
    config: spaceCustomModelsConfig,
    container: getContainer(spaceCustomModelsConfig.canvasSelector),
    init: (space: TSpace): void => {
      space.services.models3dService.getRegistry().added$.subscribe(({ key, value: model3dSource }: TRegistryPack<TModel3d>): void => {
        console.log(`Model "${model3dSource.name}" is created (${key})`);
        space.services.scenesService.findActive()?.addModel3d(model3dSource);
      });
    }
  },
  { name: spaceTextsConfig.name, config: spaceTextsConfig, container: getContainer(spaceTextsConfig.canvasSelector) }
];

let currentSpaceName: string | undefined;

function createContainersDivs(): void {
  spacesData.forEach(({ container }): HTMLElement => createDomElement('div', undefined, ['container'], container));
}

function setContainerVisibility(name: string, isVisible: boolean): void {
  const spaceData: TSpacesData | undefined = spacesData.find((s: TSpacesData): boolean => s.name === name);
  if (isNotDefined(spaceData)) throw new Error(`[Showcase]: Space data is not found for space "${name}"`);
  const containerElement: HTMLElement | null = document.querySelector(`#${spaceData.container}`);
  if (isNotDefined(containerElement)) throw new Error(`[Showcase]: Cannot find the container element for showcase "${name}"`);
  // eslint-disable-next-line functional/immutable-data
  containerElement.style.display = isVisible ? 'block' : 'none';
}

export function start(): void {
  createContainersDivs();

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
  spaceData.init?.(space);
  space.start$.next(true);
  setContainerVisibility(name, true);
}

function unloadSpace(name: string | undefined, spaceRegistry: TSpaceRegistry): void {
  if (isNotDefined(name)) return;
  const space: TSpace | undefined = spaceRegistry.findByName(name);
  if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot destroy the space "${name}"`);
  setContainerVisibility(name, false);
  space.drop();
}

function download(space: TSpace): void {
  const serialized: TSpaceConfig = space.serialize() as TSpaceConfig;

  const blob: Blob = new Blob([JSON.stringify(serialized, undefined, 2)], { type: 'application/json' });
  const url: string = URL.createObjectURL(blob);
  const a: HTMLAnchorElement = document.createElement('a');
  // eslint-disable-next-line functional/immutable-data
  a.href = url;
  const date = new Date();
  const dateStr: string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  // eslint-disable-next-line functional/immutable-data
  a.download = `${space.name}_${dateStr}.json`;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
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
  // addBtn(`Download`, containerId, (): void => download(space), { right, top });
  // addBtn(`Load`, containerId, (): void => space.start$.next(false));
}
