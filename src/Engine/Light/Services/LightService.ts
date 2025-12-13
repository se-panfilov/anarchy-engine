import type { IAbstractLightWrapper, IAnyLightConfig, ILight, ILightFactory, ILightParams, ILightRegistry, ILightService } from '@/Engine/Light/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function LightService(factory: ILightFactory, registry: ILightRegistry, scene: TSceneWrapper): ILightService {
  registry.added$.subscribe((wrapper: IAbstractLightWrapper<ILight>) => scene.addLight(wrapper));
  factory.entityCreated$.subscribe((wrapper: IAbstractLightWrapper<ILight>): void => registry.add(wrapper));

  const create = (params: ILightParams): IAbstractLightWrapper<ILight> => factory.create(params);
  const createFromConfig = (lights: ReadonlyArray<IAnyLightConfig>): void => lights.forEach((config: IAnyLightConfig): IAbstractLightWrapper<ILight> => factory.create(factory.configToParams(config)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): ILightFactory => factory,
    getRegistry: (): ILightRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
