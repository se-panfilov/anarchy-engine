import type { TAbstractLightWrapper, TAnyLightConfig, TLight, TLightFactory, TLightParams, TLightRegistry, TLightService } from '@/Engine/Light/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function LightService(factory: TLightFactory, registry: TLightRegistry, scene: TSceneWrapper): TLightService {
  registry.added$.subscribe((wrapper: TAbstractLightWrapper<TLight>) => scene.addLight(wrapper));
  factory.entityCreated$.subscribe((wrapper: TAbstractLightWrapper<TLight>): void => registry.add(wrapper));

  const create = (params: TLightParams): TAbstractLightWrapper<TLight> => factory.create(params);
  const createFromConfig = (lights: ReadonlyArray<TAnyLightConfig>): ReadonlyArray<TAbstractLightWrapper<TLight>> =>
    lights.map((config: TAnyLightConfig): TAbstractLightWrapper<TLight> => factory.create(factory.configToParams(config)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TLightFactory => factory,
    getRegistry: (): TLightRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
