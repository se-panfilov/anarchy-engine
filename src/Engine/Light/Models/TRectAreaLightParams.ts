import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TRectAreaLightProps } from './TRectAreaLightProps';

export type TRectAreaLightParams = TRectAreaLightProps & TObject3DParams & TWithReadonlyTags;
