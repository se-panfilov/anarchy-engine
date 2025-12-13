import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TModel3dProps } from './TModel3dProps';

export type TModel3dParams = TModel3dProps &
  Pick<TObject3DParams, 'position' | 'scale' | 'rotation'> &
  Readonly<{
    primitiveType?: PrimitiveModel3dType;
  }> &
  TWithName &
  TWithReadonlyTags;
