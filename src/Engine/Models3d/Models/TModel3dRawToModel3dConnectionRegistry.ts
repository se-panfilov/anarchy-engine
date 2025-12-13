import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TModel3d } from './TModel3d';
import type { TRawModel } from './TRawModel';

export type TModel3dRawToModel3dConnectionRegistryExtension = Readonly<{
  addModel3d: (model3dId: TRawModel, model3d: TModel3d) => void;
  findByModel3d: (model3dId: TRawModel) => string | undefined;
  setByModel3d: (model3dId: TRawModel, model3d: TModel3d) => void;
  removeByModel3d: (model3dId: TRawModel) => void;
  getAll: () => Record<string, string>;
}>;

export type TModel3dRawToModel3dConnectionRegistry = Omit<TProtectedRegistry<TAbstractSimpleRegistry<string>>, 'getAll'> & TModel3dRawToModel3dConnectionRegistryExtension;
