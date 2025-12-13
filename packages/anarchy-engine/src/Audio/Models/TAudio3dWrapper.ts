import type { TWithTransformDrive } from '@Engine/TransformDrive';
import type { BehaviorSubject } from 'rxjs';
import type { PositionalAudio, Vector3Like } from 'three';

import type { TAbstractAudioWrapper } from './TAbstractAudioWrapper';
import type { TAudio3dPerformanceOptions } from './TAudio3dPerformanceOptions';
import type { TAudio3dTransformAgents } from './TAudio3dTransformAgents';

export type TAudio3dWrapper = TAbstractAudioWrapper<PositionalAudio> &
  TWithTransformDrive<TAudio3dTransformAgents> &
  Readonly<{
    directionalCone$: BehaviorSubject<Vector3Like | undefined>;
    getPerformance: () => TAudio3dPerformanceOptions | undefined;
  }>;
