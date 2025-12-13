import type { TActorWrapperAsync, TKeyboardService } from '@/Engine';
import { KeyCode, mpsSpeed } from '@/Engine';

export function startMoveActorWithKeyboard(actor: TActorWrapperAsync, keyboardService: TKeyboardService): void {
  const speed: number = 15;
  keyboardService.onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => actor.setKinematicSpeed(mpsSpeed(speed, delta.delta)));
  // keyboardService.onKey(KeyCode.S).pressing$.subscribe(({ delta }): void => actor.setKinematicSpeed(mpsSpeed(-speed, delta.delta)));

  // keyboardService.onKey(KeyCode.A).pressing$.subscribe(({ delta }): void => void actor.addX(mpsSpeed(-10, delta.delta)));
  // keyboardService.onKey(KeyCode.S).pressing$.subscribe(({ delta }): void => void actor.addZ(mpsSpeed(10, delta.delta)));
  // keyboardService.onKey(KeyCode.D).pressing$.subscribe(({ delta }): void => void actor.addX(mpsSpeed(10, delta.delta)));

  keyboardService.onKey(KeyCode.W).released$.subscribe((): void => actor.setKinematicSpeed(mpsSpeed(0, 0)));
  keyboardService.onKey(KeyCode.A).released$.subscribe((): void => actor.setKinematicSpeed(mpsSpeed(0, 0)));
  keyboardService.onKey(KeyCode.S).released$.subscribe((): void => actor.setKinematicSpeed(mpsSpeed(0, 0)));
  keyboardService.onKey(KeyCode.D).released$.subscribe((): void => actor.setKinematicSpeed(mpsSpeed(0, 0)));
}
