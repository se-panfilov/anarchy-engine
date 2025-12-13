import type { TModel3dComplexParams } from './TModel3dComplexParams';
import type { TPrimitiveProps } from './TPrimitiveProps';

export type TModel3dPrimitiveParams = Omit<TModel3dComplexParams, 'url'> &
  Required<Pick<TModel3dComplexParams, 'material'>> &
  Readonly<{
    primitive: TPrimitiveProps;
  }>;
