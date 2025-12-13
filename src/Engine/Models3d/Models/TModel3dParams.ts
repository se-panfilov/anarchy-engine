import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TModel3dProps } from './TModel3dProps';

export type TModel3dParams = TModel3dProps & Pick<TObject3DParams, 'position' | 'scale' | 'rotation'> & TWithReadonlyTags;
