import type { FromGuiActionEvents, FromGuiEvents } from '@Showcases/Shared';

export type TFromGuiActionEvent = Readonly<{
  type: FromGuiEvents.Action;
  payload?: TFromGuiActionPayload;
}>;

export type TFromGuiActionPayload = Readonly<{
  type: FromGuiActionEvents;
  value?: any;
}>;
