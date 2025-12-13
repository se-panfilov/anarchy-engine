import type { Events } from '@Menu/constants';

export type TMenuEvent = {
  type: Events;
  payload?: Record<string, any>;
};
