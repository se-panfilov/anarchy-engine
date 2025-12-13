import type { TModel3dParams } from './TModel3dParams';
import type { TPrimitiveProps } from './TPrimitiveProps';

export type TModel3dPrimitiveParams = Omit<TModel3dParams, 'url'> &
  Required<Pick<TModel3dParams, 'material'>> &
  Readonly<{
    primitive: TPrimitiveProps;
  }>;
