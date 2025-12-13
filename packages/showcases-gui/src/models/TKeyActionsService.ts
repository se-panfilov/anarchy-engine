import type { TGuiActionPayload } from './TToGuiActionEvent';

export type TKeyActionsService = Readonly<{
  onAction: (payload: TGuiActionPayload) => void | never;
  performActions: (payload: TGuiActionPayload) => void;
}>;
