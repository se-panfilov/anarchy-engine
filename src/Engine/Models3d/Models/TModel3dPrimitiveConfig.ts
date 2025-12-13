import type { TModel3dComplexConfig } from './TModel3dComplexConfig';
import type { TPrimitiveProps } from './TPrimitiveProps';

export type TModel3dPrimitiveConfig = Omit<TModel3dComplexConfig, 'url' | 'material'> &
  Required<Pick<TModel3dComplexConfig, 'material'>> &
  Readonly<{
    primitive: TPrimitiveProps;
  }>;
