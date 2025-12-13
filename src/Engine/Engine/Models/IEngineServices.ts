import type { IKeyboardService } from '@/Engine/Keyboard';
import type { ILoopService } from '@/Engine/Loop';

export type IEngineServices = Readonly<{
  loopService: ILoopService;
  keyboardService: IKeyboardService;
}>;
