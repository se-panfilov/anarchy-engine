import type { TAbstractSimpleRegistry } from '@/Engine/Abstract';
import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TActorToModel3dConnectionRegistry, TActorToModel3dConnectionRegistryExtension, TActorWrapper } from '@/Engine/Actor/Models';
import type { TModel3dFacade } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';

const registry: TWriteable<TAbstractSimpleRegistry<string>> & TWriteable<TActorToModel3dConnectionRegistryExtension> = AbstractSimpleRegistry<string>(RegistryType.ActorsModels3d) as TWriteable<
  TAbstractSimpleRegistry<string>
> &
  TWriteable<TActorToModel3dConnectionRegistryExtension>;

// eslint-disable-next-line functional/immutable-data
registry.addModel3d = (model3d: TModel3dFacade, actor: TActorWrapper): void => registry.add(model3d.getModel().uuid, actor.id);
// eslint-disable-next-line functional/immutable-data
registry.addModel3dId = (model3dId: string, actorId: string): void => registry.add(model3dId, actorId);
// eslint-disable-next-line functional/immutable-data
registry.findByModel3dId = (id: string): string | undefined => registry.findByKey(id);
// eslint-disable-next-line functional/immutable-data
registry.findByModel3d = (model3d: TModel3dFacade): string | undefined => registry.findByKey(model3d.getModel().uuid);
// TODO I'm a bit too lazy to make sure that "find by actor" thing is working properly, so let's keep it as comments here
// eslint-disable-next-line functional/immutable-data
// registry.findByActorId = (id: string): string | undefined => registry.find((model3dId: string): boolean => model3dId === id);
// eslint-disable-next-line functional/immutable-data
// registry.findByActor = (actor: TActorWrapper): string | undefined => registry.find((model3dId: string): boolean => model3dId === actor.id);
// eslint-disable-next-line functional/immutable-data
registry.setByModel3dId = (model3dId: string, actorId: string): void => registry.add(model3dId, actorId);
// eslint-disable-next-line functional/immutable-data
registry.setByModel3d = (model3d: TModel3dFacade, actor: TActorWrapper): void => registry.add(model3d.getModel().uuid, actor.id);
// eslint-disable-next-line functional/immutable-data
registry.removeByModel3dId = (model3dId: string): void => registry.remove(model3dId);
// eslint-disable-next-line functional/immutable-data
registry.removeByModel3d = (model3d: TModel3dFacade): void => registry.remove(model3d.getModel().uuid);

export const ActorToModel3dConnectionRegistry = (): TActorToModel3dConnectionRegistry => RegistryFacade(registry);
