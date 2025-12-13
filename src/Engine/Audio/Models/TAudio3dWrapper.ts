import type { Howl } from 'howler';
import type { BehaviorSubject } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';

export type TAudio3dWrapper = TWrapper<Howl> &
  Readonly<{
    play: () => number;
    // TODO 11.0.0: should use decibels instead of number?
    volume$: BehaviorSubject<number>;
    position$: BehaviorSubject<TReadonlyVector3>;
    listenerPosition$: BehaviorSubject<TReadonlyVector3>;
  }>;
