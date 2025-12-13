import type { FromMenuEvents, ToMenuEvents } from '@Showcases/Shared/Constants';

import type { TFromEvent, TToEvent } from './TEvent';

export type TFromMenuEvent = Omit<TFromEvent, 'type'> &
  Readonly<{
    type: FromMenuEvents;
    payload?: Record<string, any>;
  }>;

export type TToMenuEvent = Omit<TToEvent, 'type'> &
  Readonly<{
    type: ToMenuEvents;
    payload?: Record<string, any>;
  }>;
