import { addBtn } from '@/App/Levels/Utils';
import type { TSpace, TSpaceConfig } from '@/Engine';
import { asRecord, isNotDefined, spaceService } from '@/Engine';

import space from './space.json';

const spaceAlphaConfig: TSpaceConfig = space as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceAlphaConfig]));
  const space: TSpace = spaces[spaceAlphaConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase: Space "${spaceAlphaConfig.name}" is not defined`);

  createButtons(undefined, space, true, true);

  space.built$.subscribe((space: TSpace): void => {
    runSpace(space);
  });
}

export function runSpace(space: TSpace): void {
  space.start$.next(true);
}

function save(space: TSpace): void {
  const serialized: TSpaceConfig = space.serialize() as TSpaceConfig;

  const blob: Blob = new Blob([JSON.stringify(serialized, undefined, 2)], { type: 'application/json' }, 2);
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

export function createButtons(containerId: string | undefined, space: TSpace, isTop: boolean, isRight: boolean): void {
  const top: string | undefined = isTop ? undefined : 'calc(50% + 14px)';
  const right: string | undefined = !isRight ? 'calc(50% + 14px)' : '4px';

  addBtn(`Save`, containerId, (): void => save(space), { right, top });
  // addBtn(`Load`, containerId, (): void => space.start$.next(false));
}
