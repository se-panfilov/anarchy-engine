import type { TModel3dConfig } from './TModel3dConfig';
import type { TPrimitiveProps } from './TPrimitiveProps';

export type TModel3dPrimitiveConfig = Omit<TModel3dConfig, 'url' | 'material'> &
  Required<Pick<TModel3dConfig, 'material'>> &
  Readonly<{
    primitive: TPrimitiveProps;
  }>;
