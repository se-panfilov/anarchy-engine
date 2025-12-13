import type { BehaviorSubject, Subject } from 'rxjs';
import type { AudioListener, PositionalAudio } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TAudio3dTransformAgents } from './TAudio3dTransformAgents';
import type { TAudioFadeParams } from './TAudioFadeParams';

export type TAudio3dWrapper = TWrapper<PositionalAudio> &
  Readonly<{
    play: () => void;
    pause$: BehaviorSubject<boolean>;
    fade$: Subject<TAudioFadeParams>;
    speed$: BehaviorSubject<number>;
    seek$: BehaviorSubject<number>;
    loop$: BehaviorSubject<boolean>;
    isPlaying: () => boolean;
    getDuration: () => number | undefined;
    stop: () => void;
    volume$: BehaviorSubject<number>;
    position$: BehaviorSubject<TReadonlyVector3>;
    listener$: BehaviorSubject<AudioListener | undefined>;
  }> &
  TWithTransformDrive<TAudio3dTransformAgents>;
