import type { TAbstractSimpleRegistry } from '@/Engine/Abstract';

import type { TModel3d } from './TModel3d';
import type { TRawModel3d } from './TRawModel3d';

export type TModel3dRawToModel3dConnectionRegistryExtension = Readonly<{
  addModel3d: (rawModel: TRawModel3d, model3d: TModel3d) => void;
  findByModel3d: (rawModel: TRawModel3d) => string | undefined;
  setByModel3d: (rawModel: TRawModel3d, model3d: TModel3d) => void;
  removeByModel3d: (rawModel: TRawModel3d, ignoreRemoved: boolean) => void;
}>;

export type TModel3dRawToModel3dConnectionRegistry = TAbstractSimpleRegistry<string> & TModel3dRawToModel3dConnectionRegistryExtension;
