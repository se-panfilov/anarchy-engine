import type { BehaviorSubject } from 'rxjs';
import type { PositionalAudio } from 'three';

import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TAbstractAudioWrapper } from './TAbstractAudioWrapper';
import type { TAudio3dTransformAgents } from './TAudio3dTransformAgents';

export type TAudio3dWrapper = TAbstractAudioWrapper<PositionalAudio> &
  Readonly<{
    position$: BehaviorSubject<TReadonlyVector3>;
  }> &
  TWithTransformDrive<TAudio3dTransformAgents>;
