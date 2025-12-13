import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TCameraProps } from './TCameraProps';

export type TCameraParams = TCameraProps & TObject3DParams & TWithReadonlyTags;
