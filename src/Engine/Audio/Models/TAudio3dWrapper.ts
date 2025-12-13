import type { Howl } from 'howler';
import type { BehaviorSubject } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TAudio3dTransformAgents } from './TAudio3dTransformAgents';

export type TAudio3dWrapper = TWrapper<Howl> &
  Readonly<{
    play: () => number;
    volume$: BehaviorSubject<number>;
    position$: BehaviorSubject<TReadonlyVector3>;
    listenerPosition$: BehaviorSubject<TReadonlyVector3>;
  }> &
  TWithTransformDrive<TAudio3dTransformAgents>;
