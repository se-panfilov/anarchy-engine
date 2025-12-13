import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { IHemisphereLightProps } from './IHemisphereLightProps';

export type IHemisphereLightParams = IHemisphereLightProps & IObject3DParams & TWithReadonlyTags;
