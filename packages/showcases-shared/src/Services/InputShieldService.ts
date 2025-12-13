import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TInputShieldService } from '@Showcases/Shared/Models';

const eventTypes = [
  'pointerdown',
  'pointerup',
  'pointermove',
  'pointercancel',
  'click',
  'dblclick',
  'contextmenu',
  'mousedown',
  'mouseup',
  'mousemove',
  'wheel',
  'touchstart',
  'touchmove',
  'touchend',
  'keydown',
  'keyup'
] as const;

export function InputShieldService(rootGetter: () => HTMLElement | null): TInputShieldService {
  if (isNotDefined(rootGetter)) throw new Error('[InputShieldService]: rootGetter is not defined');

  const preventEvents = (e: Event): boolean => {
    // e.stopImmediatePropagation?.();
    // e.stopPropagation();
    if (e.cancelable) e.preventDefault();
    // (e as any).cancelBubble = true;
    return false;
  };

  const optsCapture = { capture: true } as const;
  const optsActive = { capture: true, passive: false } as const;

  function start(): void {
    const element: HTMLElement | null = rootGetter();
    if (isNotDefined(element)) return;
    eventTypes.forEach((eventType): void => {
      const opts = eventType === 'wheel' || eventType === 'touchmove' ? optsActive : optsCapture;
      element.addEventListener(eventType, preventEvents, opts);
    });
  }

  function stop(): void {
    const element: HTMLElement | null = rootGetter();
    if (isNotDefined(element)) return;
    eventTypes.forEach((eventType): void => {
      element.removeEventListener(eventType, preventEvents, true);
    });
  }

  return { start, stop };
}
