import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TAmbientLightProps } from './TAmbientLightProps';

export type TAmbientLightParams = TAmbientLightProps & TObject3DParams & TWithReadonlyTags;
