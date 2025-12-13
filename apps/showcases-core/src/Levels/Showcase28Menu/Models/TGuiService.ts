import type { TFromGuiActionEvent, TFromGuiActionPayload } from '@Showcases/GUI/models';
import type { TFromGuiEvent } from '@Showcases/Shared';

export type TGuiService = Readonly<{
  closeGui: () => void | never;
  onGuiActionEvent: (payload: TFromGuiActionPayload) => void | never;
  onGuiEvents: (event: TFromGuiEvent | TFromGuiActionEvent) => void;
  openGui: () => void | never;
}>;
