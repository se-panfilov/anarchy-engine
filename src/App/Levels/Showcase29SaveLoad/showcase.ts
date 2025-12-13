import { addBtn, addDropdown } from '@/App/Levels/Utils';
import type { TSpace, TSpaceConfig, TSpaceRegistry } from '@/Engine';
import { asRecord, isNotDefined, spaceService } from '@/Engine';

import space from './space.json';
import spaceCustomModels from './spaceCustomModels.json';
import spaceTexts from './spaceTexts.json';

const spaceBasicConfig: TSpaceConfig = space as TSpaceConfig;
const spaceCustomModelsConfig: TSpaceConfig = spaceCustomModels as TSpaceConfig;
const spaceTextsConfig: TSpaceConfig = spaceTexts as TSpaceConfig;

let currentSpaceName: string | undefined;

export function start(): void {
  const list: ReadonlyArray<TSpace> = spaceService.createFromConfig([spaceBasicConfig, spaceCustomModelsConfig, spaceTextsConfig]);
  const spaces: Record<string, TSpace> = asRecord('name', list);
  const space: TSpace = spaces[spaceBasicConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase: Space "${spaceBasicConfig.name}" is not defined`);

  createForm(undefined, space, true, true, list);

  space.built$.subscribe(runSpace);
}

function runSpace(space: TSpace): void {
  currentSpaceName = space.name;
  space.start$.next(true);
}

function runSpaceByName(name: string, spaceRegistry: TSpaceRegistry): void {
  const nextSpace: TSpace | undefined = spaceRegistry.findByName(name);
  if (isNotDefined(nextSpace)) throw new Error(`[Showcase]: Cannot launch the next space "${name}"`);
  runSpace(nextSpace);
}

function destroySpaceByName(name: string | undefined, spaceRegistry: TSpaceRegistry): void {
  if (isNotDefined(name)) return;

  const space: TSpace | undefined = spaceRegistry.findByName(name);
  if (isNotDefined(space)) throw new Error(`[Showcase]: Cannot destroy the space "${name}"`);
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

export function createForm(containerId: string | undefined, space: TSpace, isTop: boolean, isRight: boolean, options: ReadonlyArray<TSpace>): void {
  const top: string | undefined = isTop ? undefined : 'calc(50% + 14px)';
  const right: string | undefined = !isRight ? 'calc(50% + 14px)' : '4px';
  const spaceRegistry: TSpaceRegistry = spaceService.getRegistry();

  addDropdown(
    'Spaces',
    containerId,
    (name: string): void => {
      destroySpaceByName(currentSpaceName, spaceRegistry);
      runSpaceByName(name, spaceRegistry);
    },
    options.map((space: TSpace): string => space.name),
    { right, top }
  );
  addBtn(`Download`, containerId, (): void => download(space), { right, top });
  // addBtn(`Load`, containerId, (): void => space.start$.next(false));
}
