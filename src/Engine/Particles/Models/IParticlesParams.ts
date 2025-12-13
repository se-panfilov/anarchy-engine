import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { IParticlesProps } from './IParticlesProps';

export type IParticlesParams = IParticlesProps & TObject3DParams & TWithReadonlyTags;
