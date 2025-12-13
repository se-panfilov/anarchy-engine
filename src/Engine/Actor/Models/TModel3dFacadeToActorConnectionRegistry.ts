import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TModel3d } from '@/Engine/Models3d';

import type { TActor } from './TActor';

export type TModel3dFacadeToActorConnectionRegistryExtension = Readonly<{
  addModel3dFacade: (model3dFacadeId: TModel3d, actor: TActor) => void;
  findByModel3dFacade: (model3dFacadeId: TModel3d) => string | undefined;
  setByModel3dFacade: (model3dFacadeId: TModel3d, actor: TActor) => void;
  removeByModel3dFacade: (model3dFacadeId: TModel3d) => void;
  getAll: () => Record<string, string>;
}>;

export type TModel3dFacadeToActorConnectionRegistry = Omit<TProtectedRegistry<TAbstractSimpleRegistry<string>>, 'getAll'> & TModel3dFacadeToActorConnectionRegistryExtension;
