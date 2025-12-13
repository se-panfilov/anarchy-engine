import type { TFromGuiActionEvent, TFromGuiActionPayload } from '@Showcases/GUI/models/TFromGuiActionEvent';
import { FromGuiEvents } from '@Showcases/Shared';

export function FromGuiActionEvent(payload?: TFromGuiActionPayload): TFromGuiActionEvent {
  return { type: FromGuiEvents.Action, payload };
}
