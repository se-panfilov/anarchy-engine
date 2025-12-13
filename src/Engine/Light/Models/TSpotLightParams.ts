import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TSpotLightProps } from './TSpotLightProps';

export type TSpotLightParams = TSpotLightProps & TObject3DParams & TWithReadonlyTags;
