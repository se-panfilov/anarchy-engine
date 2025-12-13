import type { TActorWrapperAsync, TKeyboardService } from '@/Engine';
import { KeyCode, mpsSpeed } from '@/Engine';

export function startMoveActorWithKeyboard(actor: TActorWrapperAsync, keyboardService: TKeyboardService): void {
  keyboardService.onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => void actor.addZ(mpsSpeed(-10, delta.delta)));
  keyboardService.onKey(KeyCode.A).pressing$.subscribe(({ delta }): void => void actor.addX(mpsSpeed(-10, delta.delta)));
  keyboardService.onKey(KeyCode.S).pressing$.subscribe(({ delta }): void => void actor.addZ(mpsSpeed(10, delta.delta)));
  keyboardService.onKey(KeyCode.D).pressing$.subscribe(({ delta }): void => void actor.addX(mpsSpeed(10, delta.delta)));
}
