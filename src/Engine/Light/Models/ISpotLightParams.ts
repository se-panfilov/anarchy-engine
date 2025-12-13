import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { ISpotLightProps } from './ISpotLightProps';

export type ISpotLightParams = ISpotLightProps & IObject3DParams & IWithReadonlyTags<string>;
