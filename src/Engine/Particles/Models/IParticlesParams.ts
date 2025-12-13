import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { IParticlesProps } from './IParticlesProps';

export type IParticlesParams = IParticlesProps & IObject3DParams & TWithReadonlyTags;
