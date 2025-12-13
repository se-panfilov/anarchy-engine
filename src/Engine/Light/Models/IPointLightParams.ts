import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { IPointLightProps } from './IPointLightProps';

export type IPointLightParams = IPointLightProps & IObject3DParams & IWithReadonlyTags<string>;
