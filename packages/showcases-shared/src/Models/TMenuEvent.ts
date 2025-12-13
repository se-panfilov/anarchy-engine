import type { FromMenuEvents, ToMenuEvents } from '@ShowcasesShared/Constants';

export type TFromMenuEvent = {
  type: FromMenuEvents;
  payload?: Record<string, any>;
};

export type TToMenuEvent = {
  type: ToMenuEvents;
  payload?: Record<string, any>;
};
