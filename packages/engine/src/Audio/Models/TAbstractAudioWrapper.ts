import type { TWrapper } from '@Engine/Abstract';
import type { BehaviorSubject, Subject } from 'rxjs';
import type { AudioListener } from 'three';

import type { TAnyAudio } from './TAnyAudio';
import type { TAnyAudioConfig } from './TAnyAudioConfig';
import type { TAudioConfigToParamsDependencies } from './TAudioConfigToParamsDependencies';

export type TAbstractAudioWrapper<T extends TAnyAudio> = Omit<TWrapper<T>, 'serialize'> &
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
    serialize: (dependencies: TAudioConfigToParamsDependencies) => TAnyAudioConfig;
  }>;
