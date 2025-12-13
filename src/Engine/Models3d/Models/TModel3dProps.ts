import type { Model3dType } from '@/Engine/Models3d/Constants';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TModel3dProps = Readonly<{
  url: string | Model3dType;
  options: TModel3dLoadOptions;
}>;
