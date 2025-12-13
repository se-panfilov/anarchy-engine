import type { BehaviorSubject, Subject } from 'rxjs';
import type { AudioListener } from 'three';

import type { TWrapper } from '@/Engine/Abstract';

import type { TAnyAudio } from './TAnyAudio';

export type TAbstractAudioWrapper<T extends TAnyAudio> = TWrapper<T> &
  Readonly<{
    play$: Subject<boolean>;
    pause$: BehaviorSubject<boolean>;
    speed$: BehaviorSubject<number>;
    seek$: BehaviorSubject<number>;
    loop$: BehaviorSubject<boolean>;
    isPlaying: () => boolean;
    getDuration: () => number | undefined;
    volume$: BehaviorSubject<number>;
    listener$: BehaviorSubject<AudioListener | undefined>;
  }>;
