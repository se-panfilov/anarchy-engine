import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TPointLightProps } from './TPointLightProps';

export type TPointLightParams = TPointLightProps & TObject3DParams & TWithReadonlyTags;
