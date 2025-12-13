import type { MenuEvents } from '@ShowcasesShared/constants';

export type TMenuEvent = {
  type: MenuEvents;
  payload?: Record<string, any>;
};
