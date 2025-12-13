import type { Subscription } from 'rxjs';
import { BehaviorSubject, skipWhile, Subject } from 'rxjs';
import type { AudioListener } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAbstractAudioWrapper, TAnyAudio, TAnyAudioParams, TAudioCreateFn } from '@/Engine/Audio/Models';
import { disposeAudio, seekAudio } from '@/Engine/Audio/Utils';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

// TODO 11.0.0: pause/resume/seek/stop/play doesn't work perfectly in showcase, fix
export function AbstractAudioWrapper<T extends TAnyAudio>(params: TAnyAudioParams, createFn: TAudioCreateFn<T>): TAbstractAudioWrapper<T> {
  const { audioSource, volume } = params;
  const entity: T = createFn(audioSource, params);
  const listener$: BehaviorSubject<AudioListener | undefined> = new BehaviorSubject<AudioListener | undefined>(params.listener);

  const play$: Subject<boolean> = new Subject<boolean>();
  const pause$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.pause ?? false);
  const speed$: BehaviorSubject<number> = new BehaviorSubject<number>(params.speed ?? 1);
  const seek$: BehaviorSubject<number> = new BehaviorSubject<number>(params.seek ?? 0);
  const loop$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.loop ?? false);
  const volume$: BehaviorSubject<number> = new BehaviorSubject<number>(volume ?? 1);

  const playSub$: Subscription = play$.pipe().subscribe((shouldPlay: boolean): void => {
    if (shouldPlay && !entity.isPlaying) return void entity.play();
    else return void entity.stop();
  });

  const volumeSub$: Subscription = volume$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((volume: number, index: number): boolean => index === 0 && volume === 1)
    )
    .subscribe((volume: number): void => void entity.setVolume(volume));

  let lastPausedPosition: number = 0;
  const pauseSub$: Subscription = pause$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((shouldPause: boolean, index: number): boolean => index === 0 && !shouldPause)
    )
    .subscribe((shouldPause: boolean): void => {
      if (shouldPause && entity.isPlaying) {
        lastPausedPosition = entity.context.currentTime;
        play$.next(false);
      } else {
        seek$.next(lastPausedPosition);
        play$.next(true);
      }
    });

  const speedSub$: Subscription = speed$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((speed: number, index: number): boolean => index === 0 && speed === 1)
    )
    .subscribe((speed: number): void => void entity.setPlaybackRate(speed));

  const seekSub$: Subscription = seek$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((seek: number, index: number): boolean => index === 0 && seek === 0)
    )
    .subscribe((seek: number): void => {
      seekAudio(entity, seek);
      lastPausedPosition = seek;
    });

  const loopSub$: Subscription = loop$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((shouldLoop: boolean, index: number): boolean => index === 0 && !shouldLoop)
    )
    .subscribe((shouldLoop: boolean): void => void entity.setLoop(shouldLoop));

  const wrapper: TWrapper<T> = AbstractWrapper(entity, WrapperType.Audio, params);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    playSub$.unsubscribe();
    pauseSub$.unsubscribe();
    volumeSub$.unsubscribe();
    speedSub$.unsubscribe();
    seekSub$.unsubscribe();
    loopSub$.unsubscribe();

    play$.complete();
    play$.unsubscribe();
    listener$.complete();
    listener$.unsubscribe();
    pause$.complete();
    pause$.unsubscribe();
    speed$.complete();
    speed$.unsubscribe();
    seek$.complete();
    seek$.unsubscribe();
    loop$.complete();
    loop$.unsubscribe();
    volume$.complete();
    volume$.unsubscribe();
    disposeAudio(entity);
    // TODO DESTROY: Important: all wrappers/entities should be removed from the registry (and disposed) when destroyed. Perhaps we should add an event bus to send the message to remove a certain wrapper/entity from a certain registry
  });

  return {
    ...wrapper,
    play$,
    pause$,
    speed$,
    seek$,
    loop$,
    isPlaying: (): boolean => entity.isPlaying,
    getDuration: (): number | undefined => entity.buffer?.duration,
    volume$,
    listener$,
    ...destroyable
  };
}
