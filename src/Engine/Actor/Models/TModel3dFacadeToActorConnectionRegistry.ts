import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TModel3dFacade } from '@/Engine/Models3d';

import type { TActorWrapper } from './TActorWrapper';

export type TModel3dFacadeToActorConnectionRegistryExtension = Readonly<{
  addModel3dFacade: (model3dFacadeId: TModel3dFacade, actor: TActorWrapper) => void;
  addModel3dFacadeId: (model3dFacadeId: string, actorId: string) => void;
  findByModel3dFacadeId: (id: string) => string | undefined;
  findByModel3dFacade: (model3dFacadeId: TModel3dFacade) => string | undefined;
  // findByActorId: (id: string) => string | undefined;
  // findByActor: (actor: TActorWrapper) => string | undefined;
  setByModel3dFacadeId: (model3dFacadeId: string, actorId: string) => void;
  setByModel3dFacade: (model3dFacadeId: TModel3dFacade, actor: TActorWrapper) => void;
  removeByModel3dFacadeId: (id: string) => void;
  removeByModel3dFacade: (model3dFacadeId: TModel3dFacade) => void;
  getAll: () => Record<string, string>;
}>;

export type TModel3dFacadeToActorConnectionRegistry = Omit<TProtectedRegistry<TAbstractSimpleRegistry<string>>, 'getAll'> & TModel3dFacadeToActorConnectionRegistryExtension;
