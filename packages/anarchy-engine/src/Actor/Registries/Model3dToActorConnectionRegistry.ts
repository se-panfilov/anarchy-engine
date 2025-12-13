import type { TAbstractSimpleRegistry } from '@Anarchy/Engine/Abstract';
import { AbstractSimpleRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TActor, TModel3dToActorConnectionRegistry, TModel3dToActorConnectionRegistryExtension } from '@Anarchy/Engine/Actor/Models';
import type { TModel3d } from '@Anarchy/Engine/Models3d';
import type { TWriteable } from '@Shared/Utils';
import { isNotDefined } from '@Shared/Utils';

export function Model3dToActorConnectionRegistry(): TModel3dToActorConnectionRegistry {
  const registry: TWriteable<TAbstractSimpleRegistry<string>> & TWriteable<TModel3dToActorConnectionRegistryExtension> = AbstractSimpleRegistry<string>(
    RegistryType.Models3dToActorConnection
  ) as TWriteable<TAbstractSimpleRegistry<string>> & TWriteable<TModel3dToActorConnectionRegistryExtension>;

  // eslint-disable-next-line functional/immutable-data
  registry.addModel3d = (model3d: TModel3d, actor: TActor): void => registry.add(model3d.id, actor.id);
  // eslint-disable-next-line functional/immutable-data
  registry.findByModel3d = (model3d: TModel3d): string | undefined => registry.findByKey(model3d.id);
  // eslint-disable-next-line functional/immutable-data
  registry.getByModel3d = (model3d: TModel3d): string | never => {
    const id: string | undefined = registry.findByModel3d(model3d);
    if (isNotDefined(id)) throw new Error(`[REGISTRY] Cannot find id by model3d with name "${model3d.name}" (id: "${model3d.id}")`);
    return id;
  };
  // eslint-disable-next-line functional/immutable-data
  registry.setByModel3d = (model3d: TModel3d, actor: TActor): void => registry.add(model3d.id, actor.id);
  // eslint-disable-next-line functional/immutable-data
  registry.removeByModel3d = (model3d: TModel3d): void => registry.remove(model3d.id);

  return registry;
}
