import type { LightTag } from '@/Engine/Light/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { ILightProps } from './ILightProps';

export type ILightParams = ILightProps & IObject3DParams & IWithReadonlyTags<LightTag>;
