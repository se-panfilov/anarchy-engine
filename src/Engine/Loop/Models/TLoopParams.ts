import type { LoopType } from '@/Engine/Loop/Constants';

import type { TLoopTriggerFn } from './TLoopTriggerFn';

export type TLoopParams = Readonly<{
  name: string;
  type: LoopType;
  // You can optionally pass a "requestAnimationFrame" function you want (e.g. window.requestAnimationFrame, display.requestAnimationFrame for VR, etc.) or an amount of milliseconds (number)
  trigger: TLoopTriggerFn | number;
  showDebugInfo?: boolean;
}>;
