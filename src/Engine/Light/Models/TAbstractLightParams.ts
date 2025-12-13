import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TAbstractLightProps } from './TAbstractLightProps';

export type TAbstractLightParams = TAbstractLightProps & TObject3DParams & TWithReadonlyTags;
