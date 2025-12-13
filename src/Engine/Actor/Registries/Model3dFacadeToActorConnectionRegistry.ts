import type { TAbstractSimpleRegistry } from '@/Engine/Abstract';
import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TActorWrapper, TModel3dFacadeToActorConnectionRegistry, TModel3dFacadeToActorConnectionRegistryExtension } from '@/Engine/Actor/Models';
import type { TModel3dFacade } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';

const registry: Omit<TWriteable<TAbstractSimpleRegistry<string>>, 'getAll'> & TWriteable<TModel3dFacadeToActorConnectionRegistryExtension> = AbstractSimpleRegistry<string>(
  RegistryType.Models3dFacadeToActorConnection
) as Omit<TWriteable<TAbstractSimpleRegistry<string>>, 'getAll)'> & TWriteable<TModel3dFacadeToActorConnectionRegistryExtension>;

// eslint-disable-next-line functional/immutable-data
registry.addModel3dFacade = (model3d: TModel3dFacade, actor: TActorWrapper): void => registry.add(model3d.getModel().uuid, actor.id);
// eslint-disable-next-line functional/immutable-data
registry.addModel3dFacadeId = (model3dId: string, actorId: string): void => registry.add(model3dId, actorId);
// eslint-disable-next-line functional/immutable-data
registry.findByModel3dFacadeId = (id: string): string | undefined => registry.findByKey(id);
// eslint-disable-next-line functional/immutable-data
registry.findByModel3dFacade = (model3d: TModel3dFacade): string | undefined => registry.findByKey(model3d.getModel().uuid);
// TODO I'm a bit too lazy to make sure that "find by actor" thing is working properly, so let's keep it as comments here
// eslint-disable-next-line functional/immutable-data
// registry.findByActorId = (id: string): string | undefined => registry.find((model3dId: string): boolean => model3dId === id);
// eslint-disable-next-line functional/immutable-data
// registry.findByActor = (actor: TActorWrapper): string | undefined => registry.find((model3dId: string): boolean => model3dId === actor.id);
// eslint-disable-next-line functional/immutable-data
registry.setByModel3dFacadeId = (model3dId: string, actorId: string): void => registry.add(model3dId, actorId);
// eslint-disable-next-line functional/immutable-data
registry.setByModel3dFacade = (model3d: TModel3dFacade, actor: TActorWrapper): void => registry.add(model3d.getModel().uuid, actor.id);
// eslint-disable-next-line functional/immutable-data
registry.removeByModel3dFacadeId = (model3dId: string): void => registry.remove(model3dId);
// eslint-disable-next-line functional/immutable-data
registry.removeByModel3dFacade = (model3d: TModel3dFacade): void => registry.remove(model3d.getModel().uuid);
// eslint-disable-next-line functional/immutable-data
registry.getAll = (): Record<string, string> => Object.fromEntries(registry.registry.entries());

export const Model3dFacadeToActorConnectionRegistry = (): TModel3dFacadeToActorConnectionRegistry => RegistryFacade(registry);
