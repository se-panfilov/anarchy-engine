import type { TAbstractSimpleRegistry } from '@/Engine/Abstract';

import type { TModel3d } from './TModel3d';
import type { TRawModel3d } from './TRawModel3d';

export type TModel3dRawToModel3dConnectionRegistryExtension = Readonly<{
  addModel3d: (model3dId: TRawModel3d, model3d: TModel3d) => void;
  findByModel3d: (model3dId: TRawModel3d) => string | undefined;
  setByModel3d: (model3dId: TRawModel3d, model3d: TModel3d) => void;
  removeByModel3d: (model3dId: TRawModel3d) => void;
  asObject: () => Record<string, string>;
}>;

export type TModel3dRawToModel3dConnectionRegistry = Omit<TAbstractSimpleRegistry<string>, 'asArray'> & TModel3dRawToModel3dConnectionRegistryExtension;
