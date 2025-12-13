import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TModel3d } from '@/Engine/Models3d';

import type { TActor } from './TActor';

export type TModel3dToActorConnectionRegistryExtension = Readonly<{
  addModel3d: (model3dId: TModel3d, actor: TActor) => void;
  findByModel3d: (model3dId: TModel3d) => string | undefined;
  setByModel3d: (model3dId: TModel3d, actor: TActor) => void;
  removeByModel3d: (model3dId: TModel3d) => void;
  asObject: () => Record<string, string>;
}>;

export type TModel3dToActorConnectionRegistry = TProtectedRegistry<TAbstractSimpleRegistry<string>> & TModel3dToActorConnectionRegistryExtension;
