import type { BehaviorSubject, Subject } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TAudio3dTransformAgents } from './TAudio3dTransformAgents';

export type TAudio3dWrapper = TWrapper<AudioBuffer> &
  Readonly<{
    play: () => void;
    pause$: BehaviorSubject<boolean>;
    fade$: Subject<Readonly<{ from: number; to: number; duration: number }>>;
    speed$: BehaviorSubject<number>;
    seek$: BehaviorSubject<number>;
    loop$: BehaviorSubject<boolean>;
    isPlaying: () => boolean;
    getDuration: () => number;
    getState: () => 'unloaded' | 'loading' | 'loaded';
    load: () => void;
    unload: () => void;
    stop: () => void;
    volume$: BehaviorSubject<number>;
    position$: BehaviorSubject<TReadonlyVector3>;
    listenerPosition$: BehaviorSubject<TReadonlyVector3>;
  }> &
  TWithTransformDrive<TAudio3dTransformAgents>;
