import type { FromGuiEvents, ToGuiEvents } from '@Showcases/Shared/Constants';

import type { TFromEvent, TToEvent } from './TEvent';

export type TFromGuiEvent = Omit<TFromEvent, 'type'> &
  Readonly<{
    type: FromGuiEvents;
    payload?: Record<string, any>;
  }>;

export type TToGuiEvent = Omit<TToEvent, 'type'> &
  Readonly<{
    type: ToGuiEvents;
    payload?: Record<string, any>;
  }>;
