import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { TCameraProps } from './TCameraProps';

export type TCameraParams = TCameraProps & IObject3DParams & TWithReadonlyTags;
