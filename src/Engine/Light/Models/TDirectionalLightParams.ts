import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TDirectionalLightProps } from './TDirectionalLightProps';

export type TDirectionalLightParams = TDirectionalLightProps & TObject3DParams & TWithReadonlyTags;
