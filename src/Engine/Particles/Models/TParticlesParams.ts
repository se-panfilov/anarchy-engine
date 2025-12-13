import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TParticlesProps } from './TParticlesProps';

export type TParticlesParams = TParticlesProps & TObject3DParams & TWithReadonlyTags;
