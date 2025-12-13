import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { IAmbientLightProps } from './IAmbientLightProps';

export type IAmbientLightParams = IAmbientLightProps & IObject3DParams & TWithReadonlyTags;
