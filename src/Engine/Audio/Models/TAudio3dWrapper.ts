import type { PositionalAudio } from 'three';

import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TAbstractAudioWrapper } from './TAbstractAudioWrapper';
import type { TAudio3dTransformAgents } from './TAudio3dTransformAgents';

export type TAudio3dWrapper = TAbstractAudioWrapper<PositionalAudio> & TWithTransformDrive<TAudio3dTransformAgents>;
