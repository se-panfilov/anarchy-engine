import { ambientContext } from '@/Engine/Context';
import type { IMouseClickWatcher, IMousePositionWatcher, IMouseService } from '@/Engine/Mouse/Models';

export function MouseService(mousePositionWatcher: IMousePositionWatcher, mouseClickWatcher: IMouseClickWatcher): IMouseService {
  return {
    click$: mouseClickWatcher.value$,
    position$: mousePositionWatcher.value$
    // doubleClick$: mouseClickWatcher.doubleClick$,
    // wheel$: mouseClickWatcher.wheel$,
    // pressed$: mouseClickWatcher.pressed$,
    // drag$: mouseClickWatcher.drag$,
  };
}

export const mouseService: IMouseService = MouseService(ambientContext.mousePositionWatcher, ambientContext.mouseClickWatcher);
