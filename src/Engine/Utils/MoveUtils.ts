import type { EasingOptions } from 'animejs';
import anime from 'animejs';
import type { Subscription } from 'rxjs';

import { isDefined } from '@/Engine';
import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ILoopTimes, ILoopWrapper } from '@/Engine/Domains/Loop';

// TODO (S.Panfilov) should be a service (MoveService) that uses LoopService

let loop: ILoopWrapper;

// TODO (S.Panfilov) debug
export function setLoopForMoveUtils(loopWrapper: ILoopWrapper): void {
  loop = loopWrapper;
}

// TODO (S.Panfilov) should be configurable
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
(anime as any).suspendWhenDocumentHidden = false; // If "true" - do not pause animation when document is hidden (i.g. when user switches to another tab)

// TODO (S.Panfilov) refactor
interface Position {
  x: number;
  y: number;
  z: number;
}

// TODO (S.Panfilov)  extract
export type IAnimationParams = {
  duration: number;
  direction?: 'alternate' | 'reverse' | 'normal';
  round?: number; //i.g. animation steps (how often to update the value)
  delay?: number;
  endDelay?: number; //i.g. delay after animation
  loop?: boolean;
  easing?: EasingOptions;
};

const defaultAnimationParams: Partial<IAnimationParams> = {
  direction: 'normal',
  round: 0,
  delay: 0,
  endDelay: 0,
  easing: 'linear'
};

// TODO (S.Panfilov) CWP what about delta time?
// Now the value change depends on a frame rate
// add loop.tick$.subscribe((delta) => { ... })
// and do animation.tick(delta)

// TODO (S.Panfilov) debug
const lastElapsedTime = 0; // Для хранения времени последнего обновления

// export function goToPosition(actor: IActorWrapper, targetPosition: Position, params: IAnimationParams): Promise<void> {
//   const { promise, resolve } = createDeferredPromise<void>();
//
//   const animation = anime({
//     targets: actor.entity.position,
//     x: targetPosition.x,
//     y: targetPosition.y,
//     z: targetPosition.z,
//     ...defaultAnimationParams,
//     ...params,
//     // TODO (S.Panfilov) debug
//     direction: 'normal',
//     autoplay: false,
//     complete: (): void => resolve()
//   });
//
//   // TODO (S.Panfilov) debug
//   // Функция для обновления анимации, вызывается в цикле обновления
//   function animate(): void {
//     const elapsedTime = new Clock().getElapsedTime(); // Получаем текущее время
//     const deltaTime = elapsedTime - lastElapsedTime; // Вычисляем delta time
//     lastElapsedTime = elapsedTime; // Обновляем последнее время
//
//     animation.tick(deltaTime * 1000); // Обновляем анимацию, преобразуем в миллисекунды
//
//     requestAnimationFrame(animate); // Планируем следующий кадр
//   }
//
//   animate();
//   // function pause(): void {
//   //   animation.pause();
//   //   resolve();
//   // }
//
//   // function doTickAnimation(delta: number): void {
//   //   console.log('tick');
//   //   animation.tick(delta);
//   // }
//   //
//   // loop.tick$.subscribe((delta: number): void => {
//   //   // doTickAnimation(delta);
//   //   requestAnimationFrame(() => doTickAnimation(delta));
//   // });
//
//   return promise;
// }


export function goToPosition(actor: IActorWrapper, targetPosition: Position, params: IAnimationParams): void {
  const tickSubscription: Subscription = loop.tick$.subscribe(({ frameTime }: ILoopTimes): void => {
    // TODO (S.Panfilov) I'm not sure if this makes animation independent from frame rate. Need to test.
    animation.tick(frameTime); // frameTime, delta, elapsedTime?
  });

  const animation = anime({
    targets: actor.entity.position,
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    ...defaultAnimationParams,
    ...params,
    autoplay: false,
    complete: (): void => {
      if (isDefined(tickSubscription)) tickSubscription.unsubscribe();
    }
  });
}
