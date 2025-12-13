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

export function createButtons(containerId: string | undefined, space: TSpace, isTop: boolean, isRight: boolean): void {
  const top: string | undefined = isTop ? undefined : 'calc(50% + 14px)';
  const right: string | undefined = !isRight ? 'calc(50% + 14px)' : '4px';

  addBtn(`Save`, containerId, (): void => space.serialize(), { right, top });
  // addBtn(`Load`, containerId, (): void => space.start$.next(false));
}
