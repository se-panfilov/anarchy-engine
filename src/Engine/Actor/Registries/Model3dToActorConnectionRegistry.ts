import type { TAbstractSimpleRegistry } from '@/Engine/Abstract';
import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TActor, TModel3dToActorConnectionRegistry, TModel3dToActorConnectionRegistryExtension } from '@/Engine/Actor/Models';
import type { TModel3d } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';

const registry: TWriteable<TAbstractSimpleRegistry<string>> & TWriteable<TModel3dToActorConnectionRegistryExtension> = AbstractSimpleRegistry<string>(
  RegistryType.Models3dToActorConnection
) as TWriteable<TAbstractSimpleRegistry<string>> & TWriteable<TModel3dToActorConnectionRegistryExtension>;

// eslint-disable-next-line functional/immutable-data
registry.addModel3d = (model3d: TModel3d, actor: TActor): void => registry.add(model3d.id, actor.id);
// eslint-disable-next-line functional/immutable-data
registry.findByModel3d = (model3d: TModel3d): string | undefined => registry.findByKey(model3d.id);
// eslint-disable-next-line functional/immutable-data
registry.setByModel3d = (model3d: TModel3d, actor: TActor): void => registry.add(model3d.id, actor.id);
// eslint-disable-next-line functional/immutable-data
registry.removeByModel3d = (model3d: TModel3d): void => registry.remove(model3d.id);
// eslint-disable-next-line functional/immutable-data
registry.asObject = (): Record<string, string> => Object.fromEntries(registry.registry.entries());

export const Model3dToActorConnectionRegistry = (): TModel3dToActorConnectionRegistry => RegistryFacade(registry);
