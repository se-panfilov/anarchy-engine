import type { LightTag } from '@/Engine/Domains/Light/Constants';
import type { IObject3DParams } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ILightProps } from './ILightProps';

export type ILightParams = ILightProps & IObject3DParams & IWithReadonlyTags<LightTag>;
