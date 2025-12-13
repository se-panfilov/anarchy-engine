import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TModel3dFacade } from '@/Engine/Models3d';

import type { TActorWrapper } from './TActorWrapper';

export type TModel3dFacadeToActorConnectionRegistryExtension = Readonly<{
  addModel3dFacade: (model3dFacadeId: TModel3dFacade, actor: TActorWrapper) => void;
  findByModel3dFacade: (model3dFacadeId: TModel3dFacade) => string | undefined;
  setByModel3dFacade: (model3dFacadeId: TModel3dFacade, actor: TActorWrapper) => void;
  removeByModel3dFacade: (model3dFacadeId: TModel3dFacade) => void;
  getAll: () => Record<string, string>;
}>;

export type TModel3dFacadeToActorConnectionRegistry = Omit<TProtectedRegistry<TAbstractSimpleRegistry<string>>, 'getAll'> & TModel3dFacadeToActorConnectionRegistryExtension;
