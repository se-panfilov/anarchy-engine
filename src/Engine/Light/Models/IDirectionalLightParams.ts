import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { IDirectionalLightProps } from './IDirectionalLightProps';

export type IDirectionalLightParams = IDirectionalLightProps & IObject3DParams & IWithReadonlyTags;
