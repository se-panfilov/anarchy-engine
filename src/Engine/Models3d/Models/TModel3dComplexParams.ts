import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TModel3dComplexProps } from './TModel3dComplexProps';

export type TModel3dComplexParams = TModel3dComplexProps & Pick<TObject3DParams, 'position' | 'scale' | 'rotation'> & TWithName & TWithReadonlyTags;
