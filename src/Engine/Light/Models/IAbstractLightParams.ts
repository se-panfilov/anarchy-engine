import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { IAbstractLightProps } from './IAbstractLightProps';

export type IAbstractLightParams = IAbstractLightProps & IObject3DParams & IWithReadonlyTags;
