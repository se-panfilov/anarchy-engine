import type { TSpace, TSpaceConfig } from '@Engine';
import { asRecord, isNotDefined, spaceService } from '@Engine';

import type { TAppSettings } from '@/Models';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`[Showcase]: Space "${spaceConfig.name}" is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  // const { scenesService, audioService } = space.services;
}
