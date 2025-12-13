import type { MenuEvents } from '@ShowcasesShared/Constants';

export type TMenuEvent = {
  type: MenuEvents;
  payload?: Record<string, any>;
};
