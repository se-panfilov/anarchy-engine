import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TModel3dFacade } from '@/Engine/Models3d';

import type { TActorWrapper } from './TActorWrapper';

export type TModel3dToActorConnectionRegistryExtension = Readonly<{
  addModel3d: (model3d: TModel3dFacade, actor: TActorWrapper) => void;
  addModel3dId: (model3dId: string, actorId: string) => void;
  findByModel3dId: (id: string) => string | undefined;
  findByModel3d: (model3d: TModel3dFacade) => string | undefined;
  // findByActorId: (id: string) => string | undefined;
  // findByActor: (actor: TActorWrapper) => string | undefined;
  setByModel3dId: (model3dId: string, actorId: string) => void;
  setByModel3d: (model3d: TModel3dFacade, actor: TActorWrapper) => void;
  removeByModel3dId: (id: string) => void;
  removeByModel3d: (model3d: TModel3dFacade) => void;
  getAll: () => Record<string, string>;
}>;

export type TModel3dToActorConnectionRegistry = Omit<TProtectedRegistry<TAbstractSimpleRegistry<string>>, 'getAll'> & TModel3dToActorConnectionRegistryExtension;
