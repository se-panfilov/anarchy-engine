import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { IRectAreaLightProps } from './IRectAreaLightProps';

export type IRectAreaLightParams = IRectAreaLightProps & IObject3DParams & IWithReadonlyTags;
