import type { Subscription } from 'rxjs';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';
import type { AudioListener } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAbstractAudioWrapper, TAnyAudio, TAnyAudioParams, TAudioCreateFn } from '@/Engine/Audio/Models';
import { disposeAudio, seekAudio } from '@/Engine/Audio/Utils';
import { destroyAudio } from '@/Engine/Utils';

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

  const wrapper: TWrapper<T> = AbstractWrapper(entity, WrapperType.Audio, params);

  play$.pipe(takeUntil(wrapper.destroy$)).subscribe((shouldPlay: boolean): void => {
    if (shouldPlay && !entity.isPlaying) return void entity.play();
    else return void entity.stop();
  });

  volume$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((volume: number, index: number): boolean => index === 0 && volume === 1),
      takeUntil(wrapper.destroy$)
    )
    .subscribe((volume: number): void => void entity.setVolume(volume));

  let lastPausedPosition: number = 0;
  pause$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((shouldPause: boolean, index: number): boolean => index === 0 && !shouldPause),
      takeUntil(wrapper.destroy$)
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

  speed$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((speed: number, index: number): boolean => index === 0 && speed === 1),
      takeUntil(wrapper.destroy$)
    )
    .subscribe((speed: number): void => void entity.setPlaybackRate(speed));

  seek$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((seek: number, index: number): boolean => index === 0 && seek === 0),
      takeUntil(wrapper.destroy$)
    )
    .subscribe((seek: number): void => {
      seekAudio(entity, seek, entity.isPlaying);
      lastPausedPosition = seek;
    });

  loop$
    .pipe(
      // to avoid initial value (only if it's a default one)
      skipWhile((shouldLoop: boolean, index: number): boolean => index === 0 && !shouldLoop),
      takeUntil(wrapper.destroy$)
    )
    .subscribe((shouldLoop: boolean): void => void entity.setLoop(shouldLoop));

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    wrapper.entity.stop();
    destroyAudio(wrapper.entity as TAnyAudio);

    destroySub$.unsubscribe();

    play$.complete();
    listener$.complete();
    pause$.complete();
    speed$.complete();
    seek$.complete();
    loop$.complete();
    volume$.complete();
    disposeAudio(entity);
    // TODO DESTROY: Important: all wrappers/entities should be removed from the registry (and disposed) when destroyed. Perhaps we should add an event bus to send the message to remove a certain wrapper/entity from a certain registry
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(wrapper, {
    play$,
    pause$,
    speed$,
    seek$,
    loop$,
    isPlaying: (): boolean => entity.isPlaying,
    getDuration: (): number | undefined => entity.buffer?.duration,
    volume$,
    listener$
  });
}
