import type { TKeyboardService } from '@/Engine/Keyboard';
import type { TLoopService } from '@/Engine/Loop';

export type TEngineServices = Readonly<{
  loopService: TLoopService;
  keyboardService: TKeyboardService;
}>;
